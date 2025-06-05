import React, { useState, useEffect } from "react";

const StarryNightSky = () => {
  const [stars, setStars] = useState<any>([]);
  const [comets, setComets] = useState<any>([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 250; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 4,
          twinkleDuration: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Generate comets periodically
  useEffect(() => {
    const generateComet = () => {
      const isFormation = Math.random() < 0.3; // 30% chance for formation
      const baseTime = Date.now();

      if (isFormation) {
        // Generate spacecraft breakdown formation (2-4 comets)
        const formationSize = Math.floor(Math.random() * 3) + 2;
        const baseStartX = Math.random() * 60 + 20;
        const baseStartY = Math.random() * 20 - 10;
        const baseDirection = Math.random() > 0.5 ? 1 : -1;

        for (let i = 0; i < formationSize; i++) {
          const spreadX = (Math.random() - 0.5) * 10;
          const spreadY = (Math.random() - 0.5) * 5;
          const startX = baseStartX + spreadX;
          const startY = baseStartY + spreadY;
          const endX = startX + baseDirection * (Math.random() * 15 + 10);
          const endY = startY + Math.random() * 80 + 70;

          const colors = ["yellow", "blue", "orange", "cyan"];
          const color = colors[Math.floor(Math.random() * colors.length)];

          const newComet = {
            id: baseTime + i,
            startX,
            startY,
            endX,
            endY,
            duration: Math.random() * 1.5 + 2,
            size: Math.random() * 1.5 + 1,
            angle: (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI,
            color,
            isFormation: true,
          };

          setComets((prev: any) => [...prev, newComet]);

          setTimeout(() => {
            setComets((prev: any) =>
              prev.filter((comet: any) => comet.id !== newComet.id)
            );
          }, newComet.duration * 1000 + 500);
        }
      } else {
        // Single comet (original logic)
        const side = Math.random();
        let startX, startY, endX, endY;

        if (side < 0.3) {
          startX = Math.random() * 30 - 10;
          startY = Math.random() * 30 - 10;
          endX = startX + Math.random() * 20 + 10;
          endY = startY + Math.random() * 80 + 60;
        } else if (side < 0.6) {
          startX = Math.random() * 30 + 80;
          startY = Math.random() * 30 - 10;
          endX = startX - Math.random() * 20 - 10;
          endY = startY + Math.random() * 80 + 60;
        } else {
          startX = Math.random() * 40 + 30;
          startY = Math.random() * 20 - 10;
          const direction = Math.random() > 0.5 ? 1 : -1;
          endX = startX + direction * (Math.random() * 15 + 10);
          endY = startY + Math.random() * 90 + 70;
        }

        const newComet = {
          id: baseTime,
          startX,
          startY,
          endX,
          endY,
          duration: Math.random() * 2 + 2.5,
          size: Math.random() * 2 + 1,
          angle: (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI,
          color: "white",
          isFormation: false,
        };

        setComets((prev: any) => [...prev, newComet]);

        setTimeout(() => {
          setComets((prev: any) =>
            prev.filter((comet: any) => comet.id !== newComet.id)
          );
        }, newComet.duration * 1000 + 500);
      }
    };

    const interval = setInterval(generateComet, 2000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-800 z-0">
      {/* Rotating background container */}
      <div
        className="absolute inset-0 animate-spin"
        style={{ animationDuration: "200s" }}
      >
        {/* Starfield */}
        <div className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4">
          {stars.map((star: any) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDelay: `${star.twinkleDelay}s`,
                animationDuration: `${star.twinkleDuration}s`,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
        </div>

        {/* Colorful Star Clusters */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 opacity-40">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-blue-400 rounded-full filter blur-2xl opacity-30 animate-pulse"
              style={{ animationDuration: "6s" }}
            />
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-blue-200 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  boxShadow: `0 0 ${
                    Math.random() * 4 + 2
                  }px rgba(59, 130, 246, 0.8)`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 w-36 h-36 opacity-35">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-orange-400 rounded-full filter blur-2xl opacity-40 animate-pulse"
              style={{ animationDuration: "7s", animationDelay: "1s" }}
            />
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-orange-200 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  boxShadow: `0 0 ${
                    Math.random() * 4 + 2
                  }px rgba(251, 146, 60, 0.8)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Additional colorful clusters */}
        <div className="absolute top-3/4 left-1/4 w-32 h-32 opacity-30">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-cyan-400 rounded-full filter blur-xl opacity-25 animate-pulse"
              style={{ animationDuration: "9s", animationDelay: "3s" }}
            />
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-cyan-100 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${Math.random() * 3 + 1}s`,
                  boxShadow: `0 0 ${
                    Math.random() * 3 + 2
                  }px rgba(34, 211, 238, 0.7)`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="absolute top-1/6 right-1/3 w-28 h-28 opacity-35">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-amber-400 rounded-full filter blur-xl opacity-30 animate-pulse"
              style={{ animationDuration: "8s", animationDelay: "2s" }}
            />
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-amber-100 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2.5 + 1}px`,
                  height: `${Math.random() * 2.5 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2.5 + 1}s`,
                  boxShadow: `0 0 ${
                    Math.random() * 3 + 2
                  }px rgba(245, 158, 11, 0.8)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Non-rotating elements */}
      <div className="absolute inset-0">
        {/* Comets */}
        {comets.map((comet: any) => {
          const getColorStyles = (color: any) => {
            switch (color) {
              case "yellow":
                return {
                  bg: "bg-yellow-300",
                  glow: "rgba(255, 255, 0, 0.8)",
                  glowSecondary: "rgba(255, 193, 7, 0.6)",
                  gradient: "from-transparent via-yellow-300 to-yellow-100",
                };
              case "blue":
                return {
                  bg: "bg-blue-400",
                  glow: "rgba(0, 123, 255, 0.8)",
                  glowSecondary: "rgba(135, 206, 250, 0.6)",
                  gradient: "from-transparent via-blue-400 to-blue-200",
                };
              case "orange":
                return {
                  bg: "bg-orange-400",
                  glow: "rgba(255, 165, 0, 0.8)",
                  glowSecondary: "rgba(255, 140, 0, 0.6)",
                  gradient: "from-transparent via-orange-400 to-orange-200",
                };
              case "cyan":
                return {
                  bg: "bg-cyan-400",
                  glow: "rgba(0, 255, 255, 0.8)",
                  glowSecondary: "rgba(0, 191, 255, 0.6)",
                  gradient: "from-transparent via-cyan-400 to-cyan-200",
                };
              default:
                return {
                  bg: "bg-white",
                  glow: "rgba(255, 255, 255, 0.8)",
                  glowSecondary: "rgba(135, 206, 250, 0.6)",
                  gradient: "from-transparent via-blue-200 to-white",
                };
            }
          };

          const colorStyle = getColorStyles(comet.color);

          return (
            <div
              key={comet.id}
              className="absolute"
              style={{
                left: `${comet.startX}%`,
                top: `${comet.startY}%`,
                animation: `comet-${comet.id} ${comet.duration}s linear forwards`,
              }}
            >
              <div
                className={`bg-gradient-to-r ${colorStyle.gradient} rounded-full opacity-90`}
                style={{
                  width: `${comet.size * (comet.isFormation ? 12 : 16)}px`,
                  height: `${comet.size * 0.8}px`,
                  transform: `translate(-20%, -50%) rotate(${comet.angle}deg)`,
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 ${comet.size * 3}px ${colorStyle.glow}`,
                }}
              />
              <style jsx>{`
                @keyframes comet-${comet.id} {
                  0% {
                    transform: translate(0, 0);
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 1;
                  }
                  100% {
                    transform: translate(
                      ${comet.endX - comet.startX}vw,
                      ${comet.endY - comet.startY}vh
                    );
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          );
        })}

        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50 pointer-events-none" />

        {/* Subtle nebula-like clouds */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="absolute top-10 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDuration: "10s", animationDelay: "4s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StarryNightSky;
