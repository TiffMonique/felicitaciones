'use client';

import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };

  constructor(canvasWidth: number, canvasHeight: number) {
    this.radius = Math.random() * 2 + 1;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
    this.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    };
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce off edges
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]); // Store particles

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 100 }, () => new Particle(canvas.width, canvas.height));
    };

    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}
