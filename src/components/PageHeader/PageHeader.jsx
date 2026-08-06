import "./PageHeader.scss";

export default function PageHeader({ header, className = "" }) {
  const { eyebrow, title, subtitle } = header;

  return (
    <header className={`page__header ${className}`.trim()}>
      {/* ---- inner ---- */}
      <div className="page__header-inner">
        {/* ---- eyebrow ---- */}
        <span className="page__header-eyebrow">{eyebrow}</span>
        {/* ---- title ---- */}
        <h1 className="page__header-title">
          {title.prefix ? `${title.prefix} ` : null}
          {title.accent ? (
            <span className="page__header-title-accent">{title.accent}</span>
          ) : null}
          {title.suffix ? ` ${title.suffix}` : null}
        </h1>
        {/* ---- subtitle ---- */}
        <p className="page__header-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
