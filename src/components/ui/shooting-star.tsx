"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  cloudParticles: CloudParticle[];
}

interface CloudParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

const generateCloudParticles = (x: number, y: number, angle: number) => {
  const particles: CloudParticle[] = [];
  const particleCount = Math.floor(Math.random() * 8) + 5; // 5-12 particles

  for (let i = 0; i < particleCount; i++) {
    const spreadX = (Math.random() - 0.5) * 40; // Spread horizontally
    const spreadY = (Math.random() - 0.5) * 20; // Spread vertically

    particles.push({
      id: i,
      x: x + spreadX,
      y: y + spreadY,
      opacity: Math.random() * 0.6 + 0.2,
      size: Math.random() * 2 + 1,
    });
  }

  return particles;
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 2,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
        cloudParticles: generateCloudParticles(x, y, angle),
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => {};
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    const animateStar = () => {
      setStar((prevStar) => {
        if (!prevStar) return null;

        const newX =
          prevStar.x +
          (prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180)) / 60;
        const newY =
          prevStar.y +
          (prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180)) / 60;
        const newDistance = prevStar.distance + prevStar.speed / 60;
        const newScale = 1 + newDistance / 100;

        // Update cloud particles positions
        const updatedCloudParticles = prevStar.cloudParticles.map(
          (particle) => ({
            ...particle,
            x:
              particle.x +
              (prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180)) /
                60,
            y:
              particle.y +
              (prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180)) /
                60,
            opacity: Math.max(0, particle.opacity - 0.005), // Fade out gradually
          })
        );

        // Check if star is out of bounds
        if (
          newX < -20 ||
          newX > window.innerWidth + 20 ||
          newY < -20 ||
          newY > window.innerHeight + 20
        ) {
          return null;
        }

        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
          cloudParticles: updatedCloudParticles,
        };
      });

      animationRef.current = requestAnimationFrame(animateStar);
    };

    if (star) {
      animationRef.current = requestAnimationFrame(animateStar);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [star]);

  return (
    <svg
      ref={svgRef}
      className={cn(
        "w-full h-full absolute inset-0 pointer-events-none",
        className
      )}
      viewBox={`0 0 ${
        typeof window !== "undefined" ? window.innerWidth : 1000
      } ${typeof window !== "undefined" ? window.innerHeight : 1000}`}
      preserveAspectRatio="none"
      style={{ background: "transparent" }}
    >
      {star && (
        <g key={star.id}>
          {/* Cloud particles (dust effect) */}
          {star.cloudParticles.map((particle) => (
            <circle
              key={`${star.id}-particle-${particle.id}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={starColor}
              opacity={particle.opacity}
            />
          ))}

          {/* Glow effect */}
          <rect
            x={star.x}
            y={star.y}
            width={starWidth * star.scale}
            height={starHeight}
            fill="url(#glow)"
            transform={`rotate(${star.angle}, ${
              star.x + (starWidth * star.scale) / 2
            }, ${star.y + starHeight / 2})`}
            opacity="0.6"
          />
          {/* Main star */}
          <rect
            x={star.x}
            y={star.y}
            width={starWidth * star.scale}
            height={starHeight}
            fill="url(#gradient)"
            transform={`rotate(${star.angle}, ${
              star.x + (starWidth * star.scale) / 2
            }, ${star.y + starHeight / 2})`}
          />
        </g>
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: starColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 0.8 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
