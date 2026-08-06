"use client";

import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { SectionHeader } from "@/components";
import { servicesFaq } from "@/data";

import "./FAQ.scss";

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
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        subtitle={subtitle}
      />

      {/* ---- FAQ list ---- */}
      <DisclosureGroup
        className="services__faq-list"
        defaultExpandedKeys={
          defaultExpandedKey ? [defaultExpandedKey] : undefined
        }
      >
        {items.map(({ question, answer }) => (
          <Disclosure
            key={question}
            id={question}
            className="services__faq-item"
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
          </Disclosure>
        ))}
      </DisclosureGroup>
    </section>
  );
}
