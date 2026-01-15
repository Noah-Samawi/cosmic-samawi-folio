import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Developer Console Signature
console.log(
  '%c👋 Hello, Developer!',
  'font-size: 24px; font-weight: bold; color: #06b6d4; text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);'
);
console.log(
  '%c🚀 Built by Noah Al-Samawi',
  'font-size: 16px; font-weight: bold; color: #a855f7;'
);
console.log(
  '%c💼 Full-Stack Developer & Security Specialist',
  'font-size: 14px; color: #8b5cf6;'
);
console.log(
  '%c📧 Interested in my code? Get in touch: noah.al-samawi@gmx.de',
  'font-size: 12px; color: #06b6d4;'
);
console.log(
  '%c🔗 GitHub: https://github.com/Noah-Samawi',
  'font-size: 12px; color: #22d3ee;'
);

createRoot(document.getElementById("root")!).render(<App />);
