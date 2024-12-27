"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const VisualEffects = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Confetti
      width={windowDimensions.width}
      height={windowDimensions.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.05}
    />
  );
};

export default VisualEffects;
