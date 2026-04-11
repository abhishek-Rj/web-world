import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface CharacterOption {
  id: string;
  name: string;
  image: string;
  color: string;
  glow: string;
}

const availableColors = [
  { color: "#00ffff", glow: "#00ffff" },
  { color: "#ff00ff", glow: "#ff00ff" },
  { color: "#ffff00", glow: "#ffff00" },
  { color: "#00ff00", glow: "#00ff00" },
];

export default function Character() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [characters, setCharacters] = useState<CharacterOption[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (auth.user?.characterId) {
      navigate("/join");
    }
  }, [auth.user?.characterId]);

  useEffect(() => {
    let isMounted = true;
    const fetchCharacters = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/avatar/getCharacters`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          },
        );
        const data = await res.json();
        if (data && Array.isArray(data) && isMounted) {
          const mapped = data.map((char: any, index: number) => ({
            id: char.id,
            name: char.name,
            image: `${char.image}/face.png`,
            color: availableColors[index % availableColors.length].color,
            glow: availableColors[index % availableColors.length].glow,
          }));
          setCharacters(mapped);
          if (mapped.length > 0) {
            setSelectedId(mapped[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching characters:", err);
      }
    };

    if (auth.accessToken) {
      fetchCharacters();
    }

    return () => {
      isMounted = false;
    };
  }, [auth.accessToken]);

  const handleContinue = async () => {
    if (!selectedId) return;
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        characterId: selectedId,
      }),
    });
    const data = await res.json();
    if (data) {
      navigate("/join");
    }
  };

  const selected = characters.find((c) => c.id === selectedId) || {
    id: "dummy",
    name: "LOADING...",
    image: "/first_sprite.png",
    color: "#332244",
    glow: "#332244",
  };

  return (
    <main className="font-departure relative min-h-screen overflow-hidden bg-[#0a0612] text-[#f7f0ff]">
      {/* Radial gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ff00ff40_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#00ffff30_0%,transparent_40%),radial-gradient(ellipse_at_100%_100%,#ff6b0040_0%,transparent_40%)] animate-[flicker_3s_ease-in-out_infinite]" />

      {/* Pixel grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] [bg-size:4px_4px]" />

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff00ff10_2px,#ff00ff10_4px)]" />

      {/* Decorative dots */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-pulse"
              style={{
                backgroundColor: i % 2 === 0 ? "#ff00ff" : "#00ffff",
                animationDelay: `${i * 0.15}s`,
                boxShadow:
                  i % 2 === 0
                    ? "0 0 10px #ff00ff, 0 0 20px #ff00ff"
                    : "0 0 10px #00ffff, 0 0 20px #00ffff",
              }}
            />
          ))}
        </div>
      </div>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div
            className="relative rounded-none border-4 border-[#ff00ff] bg-[#0d0618] p-1"
            style={{
              boxShadow:
                "0 0 0 2px #00ffff, 0 0 30px #ff00ff80, inset 0 0 30px #ff00ff20",
            }}
          >
            {/* Header badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d0618] px-3">
              <span
                className="inline-block whitespace-nowrap text-xs font-bold leading-none tracking-[0.25em] text-[#ff00ff]"
                style={{ textShadow: "0 0 10px #ff00ff" }}
              >
                ★ SELECT YOUR FIGHTER ★
              </span>
            </div>

            <div className="bg-[#1a0a2e] p-6 pt-8">
              {/* Corner accents */}
              <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#ff00ff]" />
              <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#ff00ff]" />
              <div className="absolute -right-1 -top-1 h-3 w-3 bg-[#00ffff]" />
              <div className="absolute -left-1 -bottom-1 h-3 w-3 bg-[#00ffff]" />

              <h1
                className="mb-2 text-center text-3xl font-black uppercase tracking-widest text-[#ffffff]"
                style={{
                  textShadow: "3px 3px 0 #ff00ff, -1px -1px 0 #00ffff",
                }}
              >
                Choose Character
              </h1>
              <p className="mb-6 text-center text-xs text-[#b8a4cc]">
                SELECT YOUR AVATAR TO ENTER THE ARENA
              </p>

              {/* Avatar display */}
              <div className="mb-6 flex justify-center">
                <div
                  className="relative overflow-hidden rounded-none border-2 p-2"
                  style={{
                    borderColor: selected.color + "80",
                    boxShadow: `0 0 30px ${selected.glow}40, inset 0 0 30px ${selected.glow}15`,
                    background: `radial-gradient(ellipse at center, ${selected.glow}15 0%, transparent 70%)`,
                  }}
                >
                  {/* Animated scan line across avatar */}
                  <div
                    className="pointer-events-none absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(transparent 0%, transparent 45%, ${selected.glow}30 50%, transparent 55%, transparent 100%)`,
                      animation: "avatarScan 3s ease-in-out infinite",
                    }}
                  />

                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="relative z-0 h-52 w-52 object-contain"
                    style={{
                      filter: `drop-shadow(0 0 15px ${selected.glow}80)`,
                      animation: "characterIdle 2.5s ease-in-out infinite",
                    }}
                  />

                  {/* Platform glow */}
                  <div
                    className="absolute bottom-2 left-1/2 h-3 w-3/4 -translate-x-1/2 rounded-full opacity-60 blur-md"
                    style={{
                      backgroundColor: selected.glow,
                    }}
                  />
                </div>
              </div>

              {/* Selected character name */}
              <p
                className="mb-5 text-center text-sm font-black uppercase tracking-[0.4em]"
                style={{
                  color: selected.color,
                  textShadow: `0 0 10px ${selected.glow}`,
                }}
              >
                {selected.name}
              </p>

              {/* Character grid */}
              <div className="mb-6">
                <p
                  className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#664488]"
                  style={{ textShadow: "0 0 6px #66448840" }}
                >
                  Available Characters
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {characters.map((char) => {
                    const isSelected = char.id === selectedId;
                    return (
                      <button
                        key={char.id}
                        type="button"
                        onClick={() => setSelectedId(char.id)}
                        className="group relative rounded-none border-2 p-1 transition-all duration-200"
                        style={{
                          borderColor: isSelected
                            ? char.color
                            : char.color + "40",
                          boxShadow: isSelected
                            ? `0 0 15px ${char.glow}60, inset 0 0 15px ${char.glow}20`
                            : "none",
                          background: isSelected ? `${char.glow}10` : "#0a0612",
                        }}
                      >
                        <img
                          src={char.image}
                          alt={char.name}
                          className="h-16 w-16 object-contain"
                          style={{
                            filter: isSelected
                              ? `drop-shadow(0 0 6px ${char.glow})`
                              : "brightness(0.5)",
                          }}
                        />
                        {isSelected && (
                          <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs"
                            style={{
                              color: char.color,
                              textShadow: `0 0 6px ${char.glow}`,
                            }}
                          >
                            ▼
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* Locked slots */}
                  {[...Array(Math.max(0, 4 - characters.length))].map(
                    (_, i) => (
                      <div
                        key={`locked-${i}`}
                        className="flex h-[76px] w-[76px] items-center justify-center rounded-none border-2 border-[#332244] bg-[#0a0612]"
                      >
                        <span
                          className="text-2xl text-[#332244]"
                          style={{ textShadow: "0 0 4px #33224440" }}
                        >
                          🔒
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Continue button */}
              <button
                type="button"
                onClick={handleContinue}
                className="group relative w-full rounded-none border-2 border-[#00ffff] bg-[#0a1520] py-4 text-center font-black uppercase tracking-widest text-white transition-all duration-100 hover:bg-[#00ffff20]"
                style={{
                  boxShadow: "4px 4px 0 #00ffff80, inset 0 0 20px #00ffff10",
                }}
              >
                <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#00ffff]" />
                <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#00ffff]" />
                <span
                  className="flex items-center justify-center gap-3"
                  style={{ textShadow: "0 0 10px #00ffff" }}
                >
                  CONTINUE
                  <span className="inline-block animate-pulse text-xl">▶</span>
                </span>
              </button>

              {/* Pulsing dots */}
              <div className="mt-6 flex justify-center gap-4">
                <div
                  className="h-2 w-2 animate-pulse bg-[#ff00ff]"
                  style={{ boxShadow: "0 0 8px #ff00ff" }}
                />
                <div
                  className="h-2 w-2 animate-pulse bg-[#00ffff]"
                  style={{
                    boxShadow: "0 0 8px #00ffff",
                    animationDelay: "0.3s",
                  }}
                />
                <div
                  className="h-2 w-2 animate-pulse bg-[#ffff00]"
                  style={{
                    boxShadow: "0 0 8px #ffff00",
                    animationDelay: "0.6s",
                  }}
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] tracking-widest text-[#664488]">
            CHARACTER SELECT • CHOOSE YOUR IDENTITY
          </p>
        </div>
      </section>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-[#332244]">
        <span>STATUS: CHARACTER_SELECT</span>
        <span>SYSTEM: ONLINE</span>
        <span>CREDIT: 00</span>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes characterIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes avatarScan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </main>
  );
}
