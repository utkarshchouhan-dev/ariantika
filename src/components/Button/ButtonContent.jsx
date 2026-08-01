export default function ButtonContent({
  icon,
  iconPosition = "left",
  isIconOnly = false,
  hasLabel = false,
  loading = false,
  children,
}) {
  const showLeftIcon = Boolean(icon) && (isIconOnly || iconPosition === "left");
  const showRightIcon =
    Boolean(icon) && !isIconOnly && iconPosition === "right";

  const iconNode = (
    <span className="button__icon" aria-hidden="true">
      {icon}
    </span>
  );

  return (
    <>
      {loading ? (
        <span className="button__loading" aria-hidden="true">
          <span className="button__spinner" />
        </span>
      ) : null}

      <span className={`button__content${loading ? " is-hidden" : ""}`}>
        {showLeftIcon ? iconNode : null}

        {hasLabel ? <span className="button__label">{children}</span> : null}

        {showRightIcon ? iconNode : null}
      </span>
    </>
  );
}
