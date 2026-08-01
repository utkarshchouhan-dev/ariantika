import "./SkipLink.scss";

export default function SkipLink({ href, children }) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  );
}
