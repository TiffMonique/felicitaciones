"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return; // Validación adicional por seguridad
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    interface Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      brightness: number;
    }

    interface Firework {
      x: number;
      y: number;
      size: number;
      color: string;
      exploded: boolean;
      particles: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        alpha: number;
      }[];
    }

    const stars: Star[] = [];
    const fireworks: Firework[] = [];

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1,
        brightness: Math.random(),
      });
    }

    function createFirework() {
      if (!canvas) return; // Validación explícita
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const size = Math.random() * 2 + 1;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      fireworks.push({ x, y, size, color, exploded: false, particles: [] });
    }

    function explodeFirework(firework: Firework) {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        firework.particles.push({
          x: 0,
          y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return; // Validación explícita
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;
        star.brightness += 0.01;
        if (star.brightness > 1) star.brightness = 0;

        if (star.x < 0 || star.x > canvas.width) star.speedX = -star.speedX;
        if (star.y < 0 || star.y > canvas.height) star.speedY = -star.speedY;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
      });

      fireworks.forEach((firework, index) => {
        if (!firework.exploded) {
          firework.y -= 3;
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
          ctx.fillStyle = firework.color;
          ctx.fill();

          if (firework.y <= Math.random() * canvas.height * 0.6) {
            firework.exploded = true;
            explodeFirework(firework);
          }
        } else {
          firework.particles.forEach((particle, pIndex) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05; // gravity
            particle.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(
              firework.x + particle.x,
              firework.y + particle.y,
              1,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `${firework.color}${Math.floor(particle.alpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.fill();

            if (particle.alpha <= 0) {
              firework.particles.splice(pIndex, 1);
            }
          });

          if (firework.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });

      if (Math.random() < 0.05) {
        createFirework();
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[#000000] z-0" />
      <motion.canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </>
  );
};
