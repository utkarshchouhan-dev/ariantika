"use client";

import {
  Button,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastRegion as ToastRegionRoot,
} from "react-aria-components";
import { LuX } from "react-icons/lu";
import { appToastQueue } from "@/utils";

import "./ToastRegion.scss";

export default function ToastRegion() {
  return (
    <ToastRegionRoot queue={appToastQueue} className="toast-region">
      {({ toast }) => (
        <Toast
          toast={toast}
          className={`toast toast--${toast.content.variant}`}
        >
          <ToastContent className="toast__content">
            {toast.content.message}
          </ToastContent>
          <Button slot="close" className="toast__close" aria-label="Dismiss notification">
            <LuX aria-hidden="true" />
          </Button>
        </Toast>
      )}
    </ToastRegionRoot>
  );
}
