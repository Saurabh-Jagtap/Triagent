export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <svg
          width="16"
          height="20"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="8"
            y="16"
            width="28"
            height="24"
            rx="8"
            fill="#4A7FA0"
          />

          <circle cx="17" cy="27" r="3.5" fill="white" />

          <circle cx="27" cy="27" r="3.5" fill="white" />
        </svg>

        Triagent
      </div>

      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>

      <span className="footer-copy">
        © 2026 Triagent
      </span>
    </footer>
  );
}