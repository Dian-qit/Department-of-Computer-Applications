import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ReactLenis } from 'lenis/react'

createRoot(document.getElementById("root")!).render(
  <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
    <App />
  </ReactLenis>,
);
