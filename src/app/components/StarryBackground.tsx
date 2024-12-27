'use client';

import { useEffect, useRef } from 'react';

class Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2;
    this.brightness = Math.random();
    this.speed = Math.random() * 0.02;
  }

  update() {
    this.brightness += this.speed;
    if (this.brightness >= 1 || this.brightness <= 0) {
      this.speed = -this.speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight / 2;
    this.length = 80 + Math.random() * 50;
    this.speed = 5 + Math.random() * 10;
    this.opacity = 1;
  }

  update() {
    this.x -= this.speed;
    this.y += this.speed;
    this.opacity -= 0.01;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y + this.length);
    ctx.stroke();
  }

  isFaded() {
    return this.opacity <= 0;
  }
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const STAR_COUNT = 200;
    const SHOOTING_STAR_COUNT = 3;

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      stars = Array.from({ length: STAR_COUNT }, () => new Star(canvas.width, canvas.height));
      shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, () => new ShootingStar(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw(ctx);
      });

      shootingStars.forEach((shootingStar, index) => {
        shootingStar.update();
        shootingStar.draw(ctx);

        if (shootingStar.isFaded()) {
          shootingStars[index] = new ShootingStar(canvas.width, canvas.height);
        }
      });

      requestAnimationFrame(animate);
    };

    initializeCanvas();
    animate();

    const handleResize = () => {
      initializeCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-black" />;
}
