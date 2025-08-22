// App.js
import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import {
  FaHeart,
  FaRing,
  FaGlassCheers,
  FaMapMarkerAlt,
  FaCameraRetro,
} from "react-icons/fa";

function App() {
  // === Date & Countdown ===
  const weddingDate = useMemo(() => new Date("2025-09-04T07:30:00"), []);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) return {};
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // === Scroll Reveal ===
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // === Floating Hearts ===
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        size: 16 + Math.random() * 14,
      })),
    []
  );

  const gallery = [
    "/images/couple-2.jpg",
    "/images/couple-3.jpg",
    "/images/couple-4.jpg",
    "/images/couple-6.jpg",
    "/images/couple-9.jpg",
    "/images/couple-10.jpg",
    "/images/couple-11.jpg",
  ];

  return (
    <div className="App">
      <div className="sparkles"></div>

      {/* Floating Hearts */}
      <div className="hearts">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Section divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 100" width="100%" height="100">
          <path
            fill="#ff4d6d"
            fillOpacity="0.18"
            d="M0,80 C400,0 1040,120 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* Welcome */}
      <section className="welcome">
        <h1 className="glow slide-in-left">
          <FaRing /> Hari Weds Vino <FaRing />
        </h1>
        <p className="intro slide-in-right delay-1">
          Join us as we celebrate the marriage of <br />
          <strong>Hari & Vino</strong>
        </p>
        <p className="slide-in-left delay-2">
          ✨ <FaGlassCheers /> Reception ✨ <br /> 03rd Sept. 2025 from 7:00 p.m
        </p>
        <p className="slide-in-right delay-3">
          💒 <FaHeart /> Marriage 💒 <br /> 04th Sept. 2025 • 7:30 a.m – 9:00 a.m
        </p>
        <p className="slide-in-left delay-4">
          <FaMapMarkerAlt /> Venue:{" "}
          <strong>
            P. Ramasamy Seethalakshmi Palace A/c Thirumana Mandapam, Mailam
          </strong>
        </p>
        <p className="tagline slide-in-right delay-5">
          🌸 Make the moment special with us 🌸
        </p>
      </section>

      {/* Countdown */}
      <section className="countdown reveal">
        <h2 className="animate-heading">⏳ Countdown to Our Big Day</h2>
        {timeLeft.days !== undefined ? (
          <div className="timer">
            <div>
              <span>{timeLeft.days}</span>Days
            </div>
            <div>
              <span>{timeLeft.hours}</span>Hours
            </div>
            <div>
              <span>{timeLeft.minutes}</span>Minutes
            </div>
            <div>
              <span>{timeLeft.seconds}</span>Seconds
            </div>
          </div>
        ) : (
          <p>🎉 It's our wedding day! 🎉</p>
        )}
      </section>

      {/* Couple */}
      <section className="couple reveal">
        <div className="left">
          <img
            src="/images/couple-1.jpg"
            alt="Couple"
            className="couple-img"
          />
        </div>
        <div className="right">
          <h2>
            Hari <FaHeart /> Vino
          </h2>
          <p>
            Two souls, one heart. Join us as we begin this beautiful journey
            together, surrounded by love, laughter, and blessings.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery reveal">
        <h2 className="animate-heading">
          <FaCameraRetro /> Photo Shoot Moments
        </h2>
        <div className="images">
          {gallery.map((src, idx) => (
            <div className="heart-frame" key={idx}>
              <img src={src} alt={`pic${idx + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Venue */}
      <section className="venue reveal">
        <div className="left">
          <h2 className="animate-heading">
            <FaMapMarkerAlt /> Wedding Venue
          </h2>
          <p>
            P. Ramasamy Seethalakshmi Palace A/c <br />
            Thirumana Mandapam, Mailam
          </p>
          <p>📅 03rd & 04th Sept. 2025</p>
        </div>
        <div className="right">
          <iframe
            title="venue-map"
            src={
              "https://www.google.com/maps?q=" +
              encodeURIComponent(
                "P. Ramasamy Seethalakshmi Palace A/c Thirumana Mandapam, Mailam"
              ) +
              "&output=embed"
            }
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default App;
