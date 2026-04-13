import React, { useEffect, useRef, useState } from "react";
import "./app-loader.scss";

const COMPANY_NAMES = [
  "Amazon",
  "Microsoft",
  "Google",
  "Meta",
  "Adobe",
  "Uber",
  "Goldman",
  "Atlassian",
  "Salesforce",
  "Flipkart",
  "Sprinklr"
];

const MAX_BUBBLES = 18;

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const getFontSize = (size) => {
  if (size < 78) return "0.62rem";
  if (size < 90) return "0.7rem";
  if (size < 105) return "0.8rem";
  return "0.9rem";
};

const createBubble = () => {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const size = randomBetween(78, 122);
  const left = randomBetween(4, 92);
  const duration = randomBetween(6, 11);
  const delay = randomBetween(0, 1.8);
  const drift = randomBetween(-30, 30);
  const company =
    COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];

  return {
    id,
    company,
    size,
    left,
    duration,
    delay,
    drift,
    popped: false
  };
};

const resetBubble = (id) => {
  const fresh = createBubble();
  return {
    ...fresh,
    id
  };
};

const AppLoader = ({ text = "Loading your Experience" }) => {
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: 10 }, () => createBubble())
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBubbles((prev) => {
        const active = prev.filter((bubble) => !bubble.popped);
        const next = [...active];

        if (next.length < MAX_BUBBLES) {
          next.push(createBubble());
        }

        return next;
      });
    }, 700);

    return () => clearInterval(intervalRef.current);
  }, []);

  const popBubble = (id) => {
    setBubbles((prev) =>
      prev.map((bubble) =>
        bubble.id === id && !bubble.popped
          ? { ...bubble, popped: true }
          : bubble
      )
    );
  };

  const handleBubbleAnimationEnd = (bubble) => {
    if (bubble.popped) {
      setBubbles((prev) => prev.filter((item) => item.id !== bubble.id));
      return;
    }

    setBubbles((prev) =>
      prev.map((item) =>
        item.id === bubble.id ? resetBubble(bubble.id) : item
      )
    );
  };

  return (
    <main className="app-loader-screen">
      <div className="app-loader-bubble-field">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            type="button"
            className={`company-bubble ${bubble.popped ? "is-popped" : ""}`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              "--bubble-drift": `${bubble.drift}px`,
              "--bubble-font-size": getFontSize(bubble.size)
            }}
            onClick={() => popBubble(bubble.id)}
            onAnimationEnd={() => handleBubbleAnimationEnd(bubble)}
            aria-label={`Pop ${bubble.company} bubble`}
          >
            <span>{bubble.company}</span>
          </button>
        ))}
      </div>

      <div className="app-loader-content">
        <h1 className="app-loader__title">
          <span className="app-loader__white">Resum</span>
          <span className="app-loader__red">O</span>
        </h1>
        <p className="app-loader__subtitle">{text}</p>
      </div>
    </main>
  );
};

export default AppLoader;