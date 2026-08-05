import { TransitionOverlay } from "@/components";

export default function Template({ children }) {
  return (
    <>
      {children}
      <TransitionOverlay />
    </>
  );
}
