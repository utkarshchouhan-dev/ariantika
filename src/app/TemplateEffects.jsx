"use client";

import { useState } from "react";
import { RevealObserver, TransitionOverlay } from "@/components";

export default function TemplateEffects() {
  const [revealsReady, setRevealsReady] = useState(false);

  return (
    <>
      <RevealObserver enabled={revealsReady} />
      <TransitionOverlay onComplete={() => setRevealsReady(true)} />
    </>
  );
}
