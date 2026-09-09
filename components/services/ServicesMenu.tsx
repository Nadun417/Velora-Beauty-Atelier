"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { ServiceFilter, type FilterValue } from "@/components/services/ServiceFilter";
import { ServiceAccordion } from "@/components/services/ServiceAccordion";

interface ServicesMenuProps {
  initialCategory: FilterValue;
}

export function ServicesMenu({ initialCategory }: ServicesMenuProps) {
  const [category, setCategory] = useState<FilterValue>(initialCategory);
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = { all: services.length, hair: 0, colour: 0, care: 0, beauty: 0 };
    for (const service of services) base[service.category] += 1;
    return base;
  }, []);

  const visible = useMemo(
    () => (category === "all" ? services : services.filter((service) => service.category === category)),
    [category],
  );

  // Deep links such as /services#balayage open the matching row.
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const match = services.find((service) => service.slug === slug);
    if (!match) return;
    const frame = requestAnimationFrame(() => {
      setCategory("all");
      setOpenId(match.id);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const changeCategory = (value: FilterValue) => {
    setCategory(value);
    setOpenId(null);
  };

  return (
    <section className="pb-section">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <ServiceFilter value={category} onChange={changeCategory} counts={counts} />
        </motion.div>
        <div className="mt-10 md:mt-14">
          <ServiceAccordion services={visible} openId={openId} onToggle={setOpenId} />
        </div>
        <p className="mt-10 max-w-md text-[0.9rem] text-ink/50">
          Prices are starting points and confirmed after consultation, depending on length, density and the
          condition of your hair. Every appointment includes a conversation first.
        </p>
      </Container>
    </section>
  );
}
