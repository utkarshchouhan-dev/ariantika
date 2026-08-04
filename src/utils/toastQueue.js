import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components";

const TOAST_DURATION_MS = 60_000;

export const appToastQueue = new ToastQueue({
  maxVisibleToasts: 1,
});

export function addToast(message, variant = "success") {
  appToastQueue.add(
    { message, variant },
    {
      timeout: TOAST_DURATION_MS,
    },
  );
}
