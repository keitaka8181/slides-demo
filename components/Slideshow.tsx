"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STAGE_W = 1280;
const STAGE_H = 720;
const SWIPE_THRESHOLD = 50; // px

export default function Slideshow({ slides }: { slides: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const swiped = useRef(false); // suppress the click that follows a swipe

  const count = slides.length;
  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, count - 1)),
    [count]
  );
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Contain-fit: scale the fixed 1280x720 stage to the largest size that fits.
  useEffect(() => {
    const fit = () =>
      setScale(
        Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
      );
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  // Keyboard: ← → (plus Space / PageUp/Down, Home/End).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          setIndex(0);
          break;
        case "End":
          setIndex(count - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, count]);

  // Click: left half = previous, right half = next.
  const onClick = (e: React.MouseEvent) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (e.clientX < window.innerWidth / 2) prev();
    else next();
  };

  // Swipe (touch).
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      swiped.current = true;
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="viewport"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {slides.map((node, i) => (
          <section
            key={i}
            className={`slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            {node}
          </section>
        ))}
      </div>
    </div>
  );
}
