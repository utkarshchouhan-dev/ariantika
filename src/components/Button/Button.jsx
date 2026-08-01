"use client";

import NextLink from "next/link";
import { Button as RACButton, Link as RACLink } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/components";

import ButtonContent from "./ButtonContent";
import {
  getDownloadAttr,
  isInternalHref,
  resolveButtonColor,
} from "./button.utils";

import "./Button.scss";

function Button({
  ref,
  children,
  variant = "primary",
  color = "primary",
  size = "default",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  type = "button",
  href,
  download,
  target,
  rel,
  onPress,
  className = "",
  style,
  label,
  tooltipPlacement = "top",
  ...rest
}) {
  const hasLabel = children != null && children !== false && children !== "";
  const isIconOnly = Boolean(icon) && !hasLabel;
  const tooltipText = rest["aria-label"] ?? label;

  const { colorClass, colorStyle } = resolveButtonColor(color);

  const classNames = [
    "button",
    `button--variant-${variant}`,
    colorClass,
    `button--size-${size}`,
    isIconOnly ? "button--icon-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sharedProps = {
    ref,
    onPress,
    className: classNames,
    style: colorStyle ? { ...colorStyle, ...style } : style,
    ...(isIconOnly && label && rest["aria-label"] == null
      ? { "aria-label": label }
      : null),
    ...rest,
  };

  const content = (
    <ButtonContent
      icon={icon}
      iconPosition={iconPosition}
      isIconOnly={isIconOnly}
      hasLabel={hasLabel}
      loading={loading}
    >
      {children}
    </ButtonContent>
  );

  let trigger;

  if (href == null) {
    trigger = (
      <RACButton
        type={type}
        isDisabled={disabled}
        isPending={loading}
        {...sharedProps}
      >
        {content}
      </RACButton>
    );
  } else {
    const downloadAttr = getDownloadAttr(download);
    const useNextLink = isInternalHref(href) && downloadAttr === undefined;

    trigger = (
      <RACLink
        href={href}
        download={downloadAttr}
        target={target}
        rel={rel}
        isDisabled={disabled || loading}
        {...(useNextLink
          ? {
              render: (props) =>
                "href" in props ? <NextLink {...props} /> : <span {...props} />,
            }
          : null)}
        {...sharedProps}
      >
        {content}
      </RACLink>
    );
  }

  if (isIconOnly && tooltipText) {
    return (
      <TooltipTrigger>
        {trigger}
        <Tooltip placement={tooltipPlacement}>{tooltipText}</Tooltip>
      </TooltipTrigger>
    );
  }

  return trigger;
}

export default Button;
