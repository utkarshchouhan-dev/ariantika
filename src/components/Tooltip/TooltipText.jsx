"use client";

import { useState } from "react";
import { Focusable, Tooltip, TooltipTrigger } from "./Tooltip";

export function TooltipText({
  as: Component = "span",
  children,
  content,
  className = "",
  placement = "top",
  ...triggerProps
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <TooltipTrigger
      isOpen={isOpen}
      onOpenChange={setOpen}
      shouldCloseOnPress={false}
      {...triggerProps}
    >
      <Focusable>
        <Component className={className} onClick={() => setOpen(true)}>
          {children}
        </Component>
      </Focusable>
      <Tooltip placement={placement}>{content}</Tooltip>
    </TooltipTrigger>
  );
}
