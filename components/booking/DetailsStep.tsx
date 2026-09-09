"use client";

import { useState, type FormEvent } from "react";
import { EMAIL_PATTERN, PHONE_PATTERN } from "@/lib/booking";
import { Field } from "@/components/booking/Field";
import { StepHeading } from "@/components/booking/StepHeading";

export interface DetailsValues {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

type DetailsErrors = Partial<Record<keyof DetailsValues, string>>;

interface DetailsStepProps {
  values: DetailsValues;
  onChange: (field: keyof DetailsValues, value: string) => void;
  onValid: () => void;
  formId: string;
}

export function validateDetails(values: DetailsValues): DetailsErrors {
  const errors: DetailsErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address so we can confirm.";
  if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = "Enter a phone number we can reach you on.";
  return errors;
}

export function DetailsStep({ values, onChange, onValid, formId }: DetailsStepProps) {
  const [errors, setErrors] = useState<DetailsErrors>({});
  const [touched, setTouched] = useState(false);

  const update = (field: keyof DetailsValues) => (value: string) => {
    onChange(field, value);
    if (touched) {
      setErrors(validateDetails({ ...values, [field]: value }));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateDetails(values);
    setErrors(nextErrors);
    setTouched(true);
    if (Object.keys(nextErrors).length === 0) {
      onValid();
      return;
    }
    const firstInvalid = Object.keys(nextErrors)[0];
    document.getElementById(firstInvalid)?.focus();
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div>
      <StepHeading step={4} question={["A FEW", "DETAILS."]} hint="So we can confirm the appointment and prepare for you." />

      <form id={formId} onSubmit={onSubmit} noValidate className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-10">
        {errorCount > 0 ? (
          <p className="sr-only" role="status">
            {errorCount} field{errorCount > 1 ? "s need" : " needs"} attention.
          </p>
        ) : null}
        <Field
          id="name"
          label="Full name"
          value={values.name}
          onChange={update("name")}
          required
          autoComplete="name"
          error={errors.name}
          className="md:col-span-2"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          required
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
          hint="Include the country code if you are outside Sri Lanka."
        />
        <Field
          id="notes"
          label="Notes"
          value={values.notes}
          onChange={update("notes")}
          multiline
          hint="Allergies, references, or anything you would like us to know beforehand."
          className="md:col-span-2"
        />
      </form>
    </div>
  );
}
