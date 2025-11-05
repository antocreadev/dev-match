"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  emoji: string;
}

interface ParticleSystemProps {
  type: "heart" | "cross";
  x: number;
  y: number;
  onComplete?: () => void;
}

export function ParticleSystem({
  type,
  x,
  y,
  onComplete,
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    console.log("🎉 ParticleSystem mounted:", type, "at position:", x, y);
    // Créer les particules initiales
    const newParticles: Particle[] = [];
    const particleCount = 30; // Plus de particules pour un effet plus spectaculaire
    const emoji = type === "heart" ? "❤️" : "✖️";

    for (let i = 0; i < particleCount; i++) {
      const angle =
        (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
      const speed = 6 + Math.random() * 8; // Vitesse augmentée

      newParticles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4, // Plus de biais vers le haut
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 30,
        scale: 1.5 + Math.random() * 1.5, // Taille beaucoup plus grande
        opacity: 1,
        emoji: emoji,
      });
    }

    setParticles(newParticles);

    // Animation loop
    const startTime = Date.now();
    const duration = 1000; // 1 seconde

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setParticles([]);
        onComplete?.();
        return;
      }

      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.2, // Gravité plus forte
          vx: particle.vx * 0.99, // Friction légère
          rotation: particle.rotation + particle.rotationSpeed,
          opacity: progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3, // Fade out dans les derniers 30%
        }))
      );

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [type, x, y, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute transition-none"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            opacity: particle.opacity,
            fontSize: "5rem", // Beaucoup plus grand !
            textShadow: "0 6px 20px rgba(0,0,0,0.4)",
            filter:
              type === "heart"
                ? "drop-shadow(0 0 15px rgba(255,50,50,0.8)) drop-shadow(0 0 25px rgba(255,100,100,0.5))"
                : "drop-shadow(0 0 15px rgba(255,50,50,0.8))",
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}
