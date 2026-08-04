"use client";

import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { motion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib";
import { SectionHeader } from "@/components";
import { servicesFaq } from "@/data";

import "./FAQ.scss";

const MotionDisclosureGroup = motion.create(DisclosureGroup);
const MotionDisclosure = motion.create(Disclosure);

export default function FAQ() {
  const {
    headingId,
    header: { prefix, accent, subtitle },
    icons: { plus: PlusIcon, minus: MinusIcon },
    items,
  } = servicesFaq;

  const defaultExpandedKey = items[0]?.question;

  return (
    <section className="services__faq" aria-labelledby={headingId}>
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        subtitle={subtitle}
      />

      <MotionDisclosureGroup
        className="services__faq-list"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        defaultExpandedKeys={
          defaultExpandedKey ? [defaultExpandedKey] : undefined
        }
      >
        {items.map(({ question, answer }) => (
          <MotionDisclosure
            key={question}
            id={question}
            className="services__faq-item"
            variants={reveal}
          >
            <Heading className="services__faq-heading">
              <Button slot="trigger" className="services__faq-trigger">
                <span className="services__faq-question">{question}</span>
                <span className="services__faq-icon" aria-hidden="true">
                  <PlusIcon className="services__faq-icon-plus" />
                  <MinusIcon className="services__faq-icon-minus" />
                </span>
              </Button>
            </Heading>
            <DisclosurePanel className="services__faq-panel">
              <p>{answer}</p>
            </DisclosurePanel>
          </MotionDisclosure>
        ))}
      </MotionDisclosureGroup>
    </section>
  );
}
