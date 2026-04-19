import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('%c🚀 Service Worker registered', 'color: #22d3ee;', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Console signature
console.log('%c⬢ Noavio IT Solutions', 'font-size: 22px; font-weight: 800; color: #22d3ee; text-shadow: 0 0 12px rgba(34,211,238,0.4);');
console.log('%cIhr IT-Partner in Frankfurt am Main', 'font-size: 13px; color: #94a3b8;');
console.log('%c→ kontakt@noahsamawi.de · +49 152 1515 8667', 'font-size: 12px; color: #22d3ee;');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
