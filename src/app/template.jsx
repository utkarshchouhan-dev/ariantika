import TemplateEffects from "./TemplateEffects";

// ---- template ----
export default function Template({ children }) {
  return (
    <>
      {children}
      <TemplateEffects />
    </>
  );
}
