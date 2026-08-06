import "./SectionHeader.scss";

// ---- section header component ----
export default function SectionHeader({
  accentTag = "span",
  headingId,
  prefix,
  accent,
  suffix,
  subtitle,
  className = "",
  ariaLabel,
}) {
  // ---- accent tag ----
  const Accent = accentTag === "small" ? "small" : "span";

  return (
    // ---- section header ----
    <header className={`section__header ${className}`.trim()}>
      {/* ---- title ---- */}
      <h2
        className="section__header-title"
        id={headingId}
        aria-label={ariaLabel}
      >
        {prefix}
        {accent ? (
          <Accent className="section__header-title-accent">{accent}</Accent>
        ) : null}
        {suffix ? ` ${suffix}` : null}
        <span className="sr-only">.</span>
      </h2>

      {/* ---- subtitle ---- */}
      {subtitle ? (
        <p className="section__header-subtitle">{subtitle}</p>
      ) : null}
    </header>
  );
}
