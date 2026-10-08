// Full-screen route loader. It reuses the `.prime-loader` classes defined inline
// in index.html, so the pre-React boot splash and this in-app fallback look
// identical and swap without any blank flash between them.
export default function AppLoader({ label = "Loading" }) {
  return (
    <div
      className="prime-loader"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <img
        className="prime-loader__logo"
        src="/Prime%20Softech%20logo.png"
        alt="Prime Softech"
      />
      <div className="prime-loader__spinner" />
      <div className="prime-loader__text">Prime Softech</div>
      <div className="prime-loader__skeleton">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
