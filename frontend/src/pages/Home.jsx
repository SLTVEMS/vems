import { useState } from "react";
import sltLogo from "../assets/b24e1db742652cedfa3963ac425d96473536a487.png";

const HERO_IMAGE_SRC = sltLogo;

// ── Icon components ──────────────────────────────────────────
const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconMS = () => (
  <svg width="22" height="22" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
    <rect x="1"  y="1"  width="9" height="9" fill="#f25022" />
    <rect x="11" y="1"  width="9" height="9" fill="#7fba00" />
    <rect x="1"  y="11" width="9" height="9" fill="#00a4ef" />
    <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
  </svg>
);

// ── Feature data ─────────────────────────────────────────────
const FEATURES = [
  { icon: <IconBolt />, text: "Quick and efficient visitor approval workflow." },
  { icon: <IconLock />, text: "Enhanced security with QR-based visitor verification." },
  { icon: <IconCheck />, text: "Monitor visitor entry and exit activities in real time." },
];

// ── Styles ───────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hp-root {
    min-height: 100vh;
    width: 100%;
    background: #EEF2F8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    padding: 40px 48px;
    gap: 20px;
  }

  /* ── Hero card ── */
  .hp-hero {
    width: 100%;
    max-width: 1100px;
    background: #0F2042;
    border-radius: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 320px;
  }

  /* ── Hero left ── */
  .hp-hero-left {
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .hp-title-top {
    font-family: 'Sora', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #38BDF8;
    line-height: 1.1;
    text-align: left;
  }

  .hp-title-bottom {
    font-family: 'Sora', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #4ADE80;
    line-height: 1.1;
    text-align: left;
  }

  .hp-subtitle {
    font-size: 0.9rem;
    color: #CBD5E1;
    line-height: 1.65;
    max-width: 340px;
    text-align: left;
  }

  /* ── Microsoft Sign-in button — moved to left panel ── */
  .hp-ms-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: #ffffff;
    color: #1a1a2e;
    border: none;
    border-radius: 10px;
    padding: 13px 28px;
    font-family: 'Inter', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    width: fit-content;
    box-shadow:
      0 6px 28px rgba(0, 0, 0, 0.35),
      0 2px 8px rgba(0, 0, 0, 0.20);
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    white-space: nowrap;
    letter-spacing: 0.02em;
    margin-top: 4px;
  }
  .hp-ms-btn:hover {
    background: #f0f4ff;
    box-shadow:
      0 10px 36px rgba(0, 0, 0, 0.45),
      0 4px 12px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }
  .hp-ms-btn:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  /* ── Hero right (image panel) ── */
  .hp-hero-right {
    position: relative;
    overflow: hidden;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .hp-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* ── Feature strip ── */
  .hp-features {
    width: 100%;
    max-width: 1100px;
    background: #0F2042;
    border-radius: 16px;
    padding: 24px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 24px;
  }

  .hp-feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
  }

  .hp-feature-icon {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    background: #1E3A6E;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hp-feature-text {
    font-size: 0.82rem;
    color: #ffffff;
    text-align: left;
    line-height: 1.55;
    font-weight: 500;
  }

  .hp-feature-divider {
    width: 1px;
    height: 48px;
    background: #1E3A6E;
    flex-shrink: 0;
  }

  /* ── Footer ── */
  .hp-footer {
    width: 100%;
    max-width: 1100px;
    margin-top: 40px;
  }

  .hp-footer-bar {
    background: #0F2042;
    border-radius: 12px;
    text-align: center;
    padding: 15px 24px;
    font-size: 0.8rem;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.02em;
  }

  /* ── Tablet ── */
  @media (max-width: 900px) {
    .hp-root { padding: 24px; }
    .hp-features { flex-wrap: wrap; }
    .hp-feature-divider { display: none; }
    .hp-feature-item { min-width: 200px; }
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .hp-root { padding: 16px; }
    .hp-hero { grid-template-columns: 1fr; height: auto; }
    .hp-hero-right { height: 200px; }
    .hp-hero-left { padding: 28px 22px; gap: 16px; }
    .hp-title-top, .hp-title-bottom { font-size: 1.5rem; }
    .hp-ms-btn { padding: 11px 22px; font-size: 0.85rem; }
    .hp-features { flex-direction: column; padding: 20px 18px; gap: 16px; }
    .hp-feature-divider { display: none; }
  }
`;

// ── Component ────────────────────────────────────────────────
export default function HomePage() {
  useState(() => {
    if (typeof document !== "undefined" && !document.getElementById("hp-styles")) {
      const tag = document.createElement("style");
      tag.id = "hp-styles";
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
  });

  const handleMicrosoftLogin = () => console.log("Trigger Microsoft SSO flow");

  return (
    <div className="hp-root">

      {/* ── Hero Card ── */}
      <section className="hp-hero" aria-label="Visitor Pass Hero">

        {/* Left — title, subtitle, MS login button */}
        <div className="hp-hero-left">
          <div>
            <p className="hp-title-top">Request a</p>
            <p className="hp-title-bottom">Visitor Pass</p>
          </div>
          <p className="hp-subtitle">
            Easy and secure visitor registration for employees and visitors.
          </p>

          {/* ── MICROSOFT SIGN-IN — now in the left panel ── */}
          <button
            className="hp-ms-btn"
            onClick={handleMicrosoftLogin}
            aria-label="Sign in with Microsoft"
          >
            <IconMS />
            Sign in with Microsoft
          </button>
        </div>

        {/* Right — hero image only */}
        <div className="hp-hero-right">
          {/*
           * ── HERO IMAGE ────────────────────────────────────────
           * Replace with your lobby photo when ready:
           *   import heroImage from "../assets/slt-lobby.jpg";
           *   const HERO_IMAGE_SRC = heroImage;
           */}
          <img
            src={HERO_IMAGE_SRC}
            alt="SLTMobitel office lobby"
            className="hp-hero-img"
          />
        </div>
      </section>

      {/* ── Feature Strip ── */}
      <section className="hp-features" aria-label="Key features">
        {FEATURES.map((feat, i) => (
          <div key={i} style={{ display: "contents" }}>
            {i > 0 && <div className="hp-feature-divider" aria-hidden="true" />}
            <div className="hp-feature-item">
              <div className="hp-feature-icon" aria-hidden="true">
                {feat.icon}
              </div>
              <p className="hp-feature-text">{feat.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Footer ── */}
      <footer className="hp-footer">
        <div className="hp-footer-bar">
          © 2026 SLTMobitel. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}