"use client";

import { useEffect, useReducer, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BookingCategory, BookingData } from "@/types";
import { formatDuration, formatPrice } from "@/lib/utils";
import { stepVariants } from "@/lib/animations";
import { formatLongDate, formatTime12 } from "@/lib/booking";
import { getArtistById, getArtistBySlug } from "@/data/artists";
import { getServiceById, getServiceBySlug } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProgressIndicator } from "@/components/booking/ProgressIndicator";
import { ServiceStep } from "@/components/booking/ServiceStep";
import { ArtistStep, NO_PREFERENCE } from "@/components/booking/ArtistStep";
import { DateStep } from "@/components/booking/DateStep";
import { DetailsStep, type DetailsValues } from "@/components/booking/DetailsStep";
import { ConfirmationStep } from "@/components/booking/ConfirmationStep";

const DETAILS_FORM_ID = "booking-details";
const TOTAL_STEPS = 5;

interface WizardState {
  step: number;
  direction: 1 | -1;
  data: BookingData;
}

type Action =
  | { type: "category"; category: BookingCategory }
  | { type: "service"; id: string }
  | { type: "artist"; id: string }
  | { type: "date"; iso: string }
  | { type: "time"; time: string }
  | { type: "field"; field: keyof DetailsValues; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "reset" };

const emptyData: BookingData = {
  category: null,
  serviceId: null,
  artistId: null,
  date: null,
  time: null,
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "category":
      if (state.data.category === action.category) return state;
      return { ...state, data: { ...state.data, category: action.category, serviceId: null, artistId: null } };
    case "service": {
      // Derive the category from the service so the two can never disagree.
      const service = getServiceById(action.id);
      return {
        ...state,
        data: {
          ...state.data,
          category: service?.bookingCategory ?? state.data.category,
          serviceId: action.id,
          artistId: null,
        },
      };
    }
    case "artist":
      return { ...state, data: { ...state.data, artistId: action.id, date: null, time: null } };
    case "date":
      return { ...state, data: { ...state.data, date: action.iso, time: null } };
    case "time":
      return { ...state, data: { ...state.data, time: action.time } };
    case "field":
      return { ...state, data: { ...state.data, [action.field]: action.value } };
    case "next":
      return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS), direction: 1 };
    case "back":
      return { ...state, step: Math.max(state.step - 1, 1), direction: -1 };
    case "reset":
      return { step: 1, direction: -1, data: emptyData };
    default:
      return state;
  }
}

interface BookingWizardProps {
  initialServiceSlug?: string;
  initialArtistSlug?: string;
}

function createInitialState({ initialServiceSlug, initialArtistSlug }: BookingWizardProps): WizardState {
  const service = initialServiceSlug ? getServiceBySlug(initialServiceSlug) : undefined;
  const artist = initialArtistSlug ? getArtistBySlug(initialArtistSlug) : undefined;
  const artistFitsService = artist && (!service || artist.availableServices.includes(service.slug));
  return {
    step: 1,
    direction: 1,
    data: {
      ...emptyData,
      category: service?.bookingCategory ?? null,
      serviceId: service?.id ?? null,
      artistId: artistFitsService ? artist.id : null,
    },
  };
}

export function BookingWizard(props: BookingWizardProps) {
  const [state, dispatch] = useReducer(reducer, props, createInitialState);
  const { step, direction, data } = state;
  const topRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(step);

  // Bring the new step into view when moving between steps (not on first paint).
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  const service = data.serviceId ? getServiceById(data.serviceId) : undefined;
  const artist = data.artistId && data.artistId !== NO_PREFERENCE ? getArtistById(data.artistId) : undefined;

  const canContinue =
    (step === 1 && data.serviceId !== null) ||
    (step === 2 && data.artistId !== null) ||
    (step === 3 && data.date !== null && data.time !== null);

  const summary = [
    service ? { label: "Service", value: `${service.name} · ${formatDuration(service.duration)}` } : null,
    data.artistId ? { label: "Artist", value: artist ? artist.name : "No preference" } : null,
    data.date ? { label: "Date", value: formatLongDate(data.date) } : null,
    data.time ? { label: "Time", value: formatTime12(data.time) } : null,
  ].filter((item) => item !== null);

  return (
    <section className="pb-section">
      <Container>
        <div ref={topRef} className="scroll-mt-28" />
        <ProgressIndicator current={step} />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="min-h-[28rem] overflow-hidden lg:col-span-8">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {step === 1 ? (
                  <ServiceStep
                    category={data.category}
                    serviceId={data.serviceId}
                    onCategory={(category) => dispatch({ type: "category", category })}
                    onService={(id) => dispatch({ type: "service", id })}
                  />
                ) : null}
                {step === 2 ? (
                  <ArtistStep
                    serviceSlug={service?.slug ?? null}
                    artistId={data.artistId}
                    onSelect={(id) => dispatch({ type: "artist", id })}
                  />
                ) : null}
                {step === 3 ? (
                  <DateStep
                    date={data.date}
                    time={data.time}
                    artistId={data.artistId}
                    onDate={(iso) => dispatch({ type: "date", iso })}
                    onTime={(time) => dispatch({ type: "time", time })}
                  />
                ) : null}
                {step === 4 ? (
                  <DetailsStep
                    formId={DETAILS_FORM_ID}
                    values={{ name: data.name, email: data.email, phone: data.phone, notes: data.notes }}
                    onChange={(field, value) => dispatch({ type: "field", field, value })}
                    onValid={() => dispatch({ type: "next" })}
                  />
                ) : null}
                {step === 5 && service && data.date && data.time ? (
                  <ConfirmationStep
                    service={service}
                    artist={artist ?? null}
                    date={data.date}
                    time={data.time}
                    name={data.name}
                    email={data.email}
                    onReset={() => dispatch({ type: "reset" })}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            {step < 5 ? (
              <div className="mt-14 flex items-center justify-between border-t border-line pt-8">
                <Button
                  type="button"
                  variant="text"
                  arrow="none"
                  onClick={() => dispatch({ type: "back" })}
                  disabled={step === 1}
                  magnetic={false}
                >
                  ← Back
                </Button>
                {step === 4 ? (
                  <Button type="submit" form={DETAILS_FORM_ID} cursorLabel="BOOK">
                    Confirm Booking
                  </Button>
                ) : (
                  <Button type="button" onClick={() => dispatch({ type: "next" })} disabled={!canContinue}>
                    Continue
                  </Button>
                )}
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4 lg:pl-6" aria-label="Your selection">
            <div className="border-t border-line pt-6 lg:sticky lg:top-32">
              <p className="eyebrow text-ink/50">Your visit</p>
              {summary.length === 0 ? (
                <p className="mt-6 max-w-xs font-display text-2xl italic leading-tight text-ink/50">
                  Your choices will appear here as you go.
                </p>
              ) : (
                <dl className="mt-6 flex flex-col divide-y divide-line">
                  {summary.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="eyebrow text-ink/45">{item.label}</dt>
                      <dd className="text-right text-[0.95rem]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {service ? (
                <p className="mt-6 border-t border-line pt-4 text-[0.85rem] text-ink/50">
                  Starting from {formatPrice(service.price)}. Final pricing is confirmed after consultation.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
