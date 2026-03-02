import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const reviews = [
  {
    name: "NEON_RIDER",
    text: "BEST MULTIPLAYER EXPERIENCE I'VE HAD IN YEARS. THE RETRO VIBES ARE UNMATCHED!",
    rating: "★★★★★",
  },
  {
    name: "CYBER_SLAYER",
    text: "INSTANT PLAY, NO LAG, PURE ARCADE ACTION. THIS IS EXACTLY WHAT WEB GAMING SHOULD BE.",
    rating: "★★★★★",
  },
  {
    name: "PIXEL_MASTER",
    text: "FINALLY A GAME THAT CAPTURES THE ESSENCE OF CLASSIC ARCADES. ABSOLUTELY ADDICTIVE!",
    rating: "★★★★★",
  },
  {
    name: "VOID_WALKER",
    text: "THE SYNCHRONIZED MULTIPLAYER IS BUTTERY SMOOTH. BEST WEB GAME I'VE PLAYED.",
    rating: "★★★★★",
  },
];

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setNavVisible(currentY < lastScrollY.current || currentY < 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentReview]);

  return (
    <main className="font-departure relative min-h-screen overflow-hidden bg-[#0a0612] text-[#f7f0ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ff00ff40_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#00ffff30_0%,transparent_40%),radial-gradient(ellipse_at_100%_100%,#ff6b0040_0%,transparent_40%)] animate-[flicker_3s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] [bg-size:4px_4px]" />

      <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff00ff10_2px,#ff00ff10_4px)]" />

      {/* Floating Navbar */}
      <nav
        className="fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out"
        style={{
          top: navVisible ? '20px' : '-80px',
          width: 'min(92%, 900px)',
        }}
      >
        <div
          className="relative flex items-center justify-between rounded-none border-2 px-5 py-3 transition-all duration-300"
          style={{
            borderColor: scrolled ? '#ff00ff80' : '#ff00ff40',
            backgroundColor: scrolled ? '#0a0612e6' : '#0a0612b0',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: scrolled
              ? '0 0 30px #ff00ff30, 0 0 60px #00ffff15, inset 0 0 20px #ff00ff08, 0 8px 32px rgba(0,0,0,0.5)'
              : '0 0 20px #ff00ff15, inset 0 0 15px #ff00ff05, 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Corner accents */}
          <div className="absolute -left-[3px] -top-[3px] h-2 w-2 bg-[#ff00ff] transition-all duration-300" style={{ boxShadow: '0 0 6px #ff00ff' }} />
          <div className="absolute -right-[3px] -top-[3px] h-2 w-2 bg-[#00ffff] transition-all duration-300" style={{ boxShadow: '0 0 6px #00ffff' }} />
          <div className="absolute -bottom-[3px] -left-[3px] h-2 w-2 bg-[#00ffff] transition-all duration-300" style={{ boxShadow: '0 0 6px #00ffff' }} />
          <div className="absolute -bottom-[3px] -right-[3px] h-2 w-2 bg-[#ff00ff] transition-all duration-300" style={{ boxShadow: '0 0 6px #ff00ff' }} />

          {/* Logo - Left side */}
          <Link to="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
            <img
              src="/logo/logo.png"
              alt="Web World"
              className="h-8 w-8 object-contain"
              style={{ filter: 'drop-shadow(0 0 6px #ff00ff80)' }}
            />
            <span
              className="text-lg font-black uppercase tracking-widest text-white"
              style={{ textShadow: '2px 2px 0 #ff00ff, -1px -1px 0 #00ffff' }}
            >
              WEB WORLD
            </span>
          </Link>

          {/* Auth buttons - Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="border border-[#00ffff60] bg-[#00ffff08] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00ffff] transition-all duration-200 hover:border-[#00ffff] hover:bg-[#00ffff18] hover:shadow-[0_0_15px_#00ffff30]"
              style={{ textShadow: '0 0 6px #00ffff60' }}
            >
              LOG IN
            </Link>
            <Link
              to="/signup"
              className="border-2 border-[#ff00ff] bg-[#ff00ff15] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff00ff] transition-all duration-200 hover:bg-[#ff00ff30] hover:text-white hover:shadow-[0_0_20px_#ff00ff40]"
              style={{ textShadow: '0 0 6px #ff00ff', boxShadow: '2px 2px 0 #ff00ff40' }}
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Billboard Scaffold Frame Background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 800 500"
            className="h-[85%] w-[90%] max-w-5xl opacity-[0.15]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer frame - main rectangular border */}
            <rect x="20" y="20" width="760" height="460" rx="4" stroke="#888" strokeWidth="6" />
            <rect x="20" y="20" width="760" height="460" rx="4" stroke="#aaa" strokeWidth="2" />

            {/* Inner frame */}
            <rect x="50" y="50" width="700" height="400" rx="2" stroke="#777" strokeWidth="4" />

            {/* Vertical beams - dense grid */}
            {[100, 180, 260, 340, 400, 460, 540, 620, 700].map((x) => (
              <g key={`v-${x}`}>
                <line x1={x} y1="20" x2={x} y2="480" stroke="#666" strokeWidth="3" />
                <line x1={x + 1} y1="20" x2={x + 1} y2="480" stroke="#999" strokeWidth="0.5" />
              </g>
            ))}

            {/* Horizontal beams - dense grid */}
            {[80, 140, 200, 250, 310, 370, 420].map((y) => (
              <g key={`h-${y}`}>
                <line x1="20" y1={y} x2="780" y2={y} stroke="#666" strokeWidth="2.5" />
                <line x1="20" y1={y + 1} x2="780" y2={y + 1} stroke="#999" strokeWidth="0.5" />
              </g>
            ))}

            {/* Diagonal cross-braces - X in every cell */}
            {(() => {
              const vBeams = [50, 100, 180, 260, 340, 400, 460, 540, 620, 700, 750];
              const hBeams = [50, 80, 140, 200, 250, 310, 370, 420, 450];
              const diags: number[][] = [];
              for (let vi = 0; vi < vBeams.length - 1; vi++) {
                for (let hi = 0; hi < hBeams.length - 1; hi++) {
                  if ((vi + hi) % 2 === 0) {
                    diags.push([vBeams[vi], hBeams[hi], vBeams[vi + 1], hBeams[hi + 1]]);
                  }
                }
              }
              return diags.map(([x1, y1, x2, y2], idx) => (
                <g key={`d-${idx}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="1.5" />
                  <line x1={x2} y1={y1} x2={x1} y2={y2} stroke="#555" strokeWidth="1.5" />
                </g>
              ));
            })()}

            {/* Extra diagonal struts across larger spans */}
            <line x1="50" y1="50" x2="400" y2="250" stroke="#444" strokeWidth="1" />
            <line x1="750" y1="50" x2="400" y2="250" stroke="#444" strokeWidth="1" />
            <line x1="50" y1="450" x2="400" y2="250" stroke="#444" strokeWidth="1" />
            <line x1="750" y1="450" x2="400" y2="250" stroke="#444" strokeWidth="1" />

            {/* Junction bolts at all intersections */}
            {[50, 100, 180, 260, 340, 400, 460, 540, 620, 700, 750].flatMap((x) =>
              [50, 80, 140, 200, 250, 310, 370, 420, 450].map((y) => (
                <g key={`bolt-${x}-${y}`}>
                  <circle cx={x} cy={y} r="4" fill="#444" stroke="#777" strokeWidth="1" />
                  <circle cx={x} cy={y} r="1.5" fill="#999" />
                </g>
              ))
            )}

            {/* Corner gusset plates */}
            {[
              [20, 20, 65, 20, 20, 65],
              [780, 20, 735, 20, 780, 65],
              [20, 480, 65, 480, 20, 435],
              [780, 480, 735, 480, 780, 435],
            ].map(([x1, y1, x2, y2, x3, y3], idx) => (
              <polygon
                key={`gusset-${idx}`}
                points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                fill="#44444480"
                stroke="#666"
                strokeWidth="2"
              />
            ))}

            {/* Support legs at bottom */}
            <line x1="100" y1="480" x2="70" y2="520" stroke="#666" strokeWidth="5" />
            <line x1="260" y1="480" x2="240" y2="520" stroke="#666" strokeWidth="4" />
            <line x1="400" y1="480" x2="400" y2="520" stroke="#666" strokeWidth="5" />
            <line x1="540" y1="480" x2="560" y2="520" stroke="#666" strokeWidth="4" />
            <line x1="700" y1="480" x2="730" y2="520" stroke="#666" strokeWidth="5" />
          </svg>
        </div>
        <div className="w-full max-w-4xl text-center">
          <div className="mb-8">
            {/* Wall-Mounted Neon Letters */}
            <div className="mb-4 flex items-end justify-center gap-1 md:gap-3">
              {['W','E','B',' ','W','O','R','L','D'].map((letter, i) => {
                if (letter === ' ') {
                  return <div key={i} className="w-4 md:w-8 lg:w-10" />;
                }

                const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b00', '#ff00ff', '#00ffff', '#ffff00'];
                const color = colors[i];

                // E in WEB (index 1) and R in WORLD (index 6) are faulty
                const isFaulty = i === 1 || i === 6;
                const tiltDeg = i === 1 ? -50 : i === 6 ? 180 : i === 8 ? 15 : 0;

                return (
                  <div
                    key={i}
                    className="wall-letter relative inline-block"
                    style={{
                      transform: i === 1
                        ? `rotate(${tiltDeg}deg) translateY(15%) translateX(-55%)`
                        : `rotate(${tiltDeg}deg)`,
                      animation: 'none',
                      marginLeft: i === 1 ? '8px' : '0',
                      marginRight: i === 1 ? '8px' : '0',
                    }}
                  >
                    {/* Mounting screws - varied positions per letter */}
                    {(() => {
                      const screwPositions = [
                        ['-top-1 -left-1', '-bottom-1 -right-1'],   // W: TL + BR
                        [],   // E: fallen, no screws
                        ['-top-1 left-1/2 -translate-x-1/2', '-bottom-1 -left-1'], // B: TC + BL
                        [],
                        ['-top-1 -left-1', '-top-1 -right-1'],     // W: TL + TR
                        ['-bottom-1 -left-1', '-bottom-1 -right-1'], // O: BL + BR
                        ['-top-1 -right-1', '-bottom-1 -right-1'], // R: TR + BR
                        ['-top-1 -left-1', '-bottom-1 left-1/2 -translate-x-1/2'], // L: TL + BC
                        ['-top-1 -right-1', '-bottom-1 -left-1'],  // D: TR + BL
                      ];
                      const positions = screwPositions[i] || screwPositions[0];
                      return positions.map((pos, si) => (
                        <div
                          key={`screw-${si}`}
                          className={`absolute ${pos} h-[3px] w-[3px] rounded-full border border-[#999] md:h-[5px] md:w-[5px]`}
                          style={{
                            background: 'radial-gradient(circle at 35% 35%, #bbb, #444)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.5), inset 0 0.5px 0.5px rgba(255,255,255,0.3)',
                          }}
                        >
                          <div className="absolute left-1/2 top-1/2 h-[3px] w-[0.5px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#666]" />
                          <div className="absolute left-1/2 top-1/2 h-[0.5px] w-[3px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#666]" />
                        </div>
                      ));
                    })()}

                    {/* Electric wire going up to the billboard frame (skip for R) */}
                    {i !== 6 && (
                    <svg
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 hidden md:block"
                      style={{
                        top: 'clamp(-90px, -8vw, -60px)',
                        width: 'clamp(30px, 5vw, 50px)',
                        height: 'clamp(80px, 10vw, 65px)',
                        overflow: 'visible',
                        opacity: 0.35,
                      }}
                      viewBox="0 0 50 65"
                      preserveAspectRatio="none"
                    >
                      {/* Wire path - unique curve per letter */}
                      <path
                        d={
                          i === 0 ? 'M25,65 C25,55 5,45 3,30 C1,15 18,5 22,0' :
                          i === 1 ? 'M28,65 C32,52 38,42 35,28 C32,14 20,5 25,0' :
                          i === 2 ? 'M22,65 C18,52 40,35 36,22 C32,9 27,2 25,0' :
                          i === 4 ? 'M25,65 C20,55 8,48 10,32 C12,16 22,5 25,0' :
                          i === 5 ? 'M28,65 C30,50 42,38 38,24 C34,10 27,2 25,0' :
                          i === 6 ? 'M22,65 C26,50 45,40 40,28 C35,16 25,5 25,0' :
                          i === 7 ? 'M25,65 C20,52 6,42 8,28 C10,14 20,4 25,0' :
                          'M28,65 C32,55 40,42 35,25 C30,8 26,2 25,0'
                        }
                        stroke={isFaulty ? '#555' : '#888'}
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                          filter: isFaulty ? 'none' : `drop-shadow(0 0 3px ${color}40)`,
                        }}
                      />
                      {/* Wire connector dot at top */}
                      <circle cx="25" cy="0" r="2.5" fill="#555" stroke="#888" strokeWidth="1" />
                      {/* Wire connector dot at letter */}
                      <circle cx={i === 0 ? 25 : i === 1 ? 28 : i === 2 ? 22 : i === 4 ? 25 : i === 5 ? 28 : i === 6 ? 22 : i === 7 ? 25 : 28} cy="65" r="2" fill={isFaulty ? '#444' : color} stroke="#888" strokeWidth="1"
                        style={{ filter: isFaulty ? 'none' : `drop-shadow(0 0 4px ${color})` }}
                      />
                      {/* Second wire (power) - different route */}
                      <path
                        d={
                          i === 0 ? 'M20,65 C15,50 35,40 32,25 C29,10 26,3 25,0' :
                          i === 1 ? 'M18,65 C14,48 8,38 12,25 C16,12 22,3 25,0' :
                          i === 2 ? 'M30,65 C35,50 10,38 14,22 C18,6 23,1 25,0' :
                          i === 4 ? 'M30,65 C35,52 42,40 38,25 C34,10 28,3 25,0' :
                          i === 5 ? 'M18,65 C14,48 5,35 10,22 C15,9 22,2 25,0' :
                          i === 6 ? 'M30,65 C35,52 5,38 10,25 C15,12 22,4 25,0' :
                          i === 7 ? 'M30,65 C34,48 44,35 38,22 C32,9 27,2 25,0' :
                          'M18,65 C12,48 8,35 14,22 C20,9 23,2 25,0'
                        }
                        stroke={isFaulty ? '#444' : '#666'}
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={isFaulty ? '4 3' : 'none'}
                      />
                      {/* Third wire - chaotic extra */}
                      <path
                        d={
                          i === 0 ? 'M15,65 C10,48 -5,42 2,28 C9,14 20,5 25,0' :
                          i === 1 ? 'M32,65 C38,50 42,35 38,20 C34,5 28,0 25,0' :
                          i === 2 ? 'M18,65 C12,55 -2,40 5,28 C12,16 20,5 25,0' :
                          i === 4 ? 'M20,65 C15,48 -3,38 5,25 C13,12 20,3 25,0' :
                          i === 5 ? 'M32,65 C38,52 48,38 42,22 C36,6 28,0 25,0' :
                          i === 6 ? 'M18,65 C12,52 -5,42 3,28 C11,14 20,4 25,0' :
                          i === 7 ? 'M35,65 C40,50 48,32 42,18 C36,4 28,0 25,0' :
                          'M15,65 C8,50 -2,38 5,25 C12,12 20,3 25,0'
                        }
                        stroke={isFaulty ? '#3a3a3a' : '#555'}
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                      {/* Fourth wire - loose dangling */}
                      <path
                        d={
                          i === 0 ? 'M30,65 C35,55 45,48 42,35 C39,22 30,8 25,0' :
                          i === 1 ? 'M22,65 C18,50 5,42 8,30 C11,18 20,6 25,0' :
                          i === 2 ? 'M35,65 C40,52 50,38 45,22 C40,6 30,0 25,0' :
                          i === 4 ? 'M35,65 C40,55 50,42 45,28 C40,14 30,3 25,0' :
                          i === 5 ? 'M22,65 C18,50 2,40 8,28 C14,16 20,4 25,0' :
                          i === 6 ? 'M35,65 C40,48 52,35 45,20 C38,5 28,0 25,0' :
                          i === 7 ? 'M15,65 C8,52 -4,40 5,28 C14,16 20,4 25,0' :
                          'M35,65 C42,52 50,35 42,20 C34,5 28,0 25,0'
                        }
                        stroke={isFaulty ? '#333' : '#4a4a4a'}
                        strokeWidth="0.8"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.5"
                        strokeDasharray={i % 3 === 0 ? '3 4' : i % 3 === 1 ? '5 2' : 'none'}
                      />
                    </svg>
                    )}

                    {/* The Letter */}
                    <span
                      className={`font-departure relative block text-4xl font-black uppercase md:text-6xl lg:text-8xl ${isFaulty ? 'faulty-letter' : ''}`}
                      style={{
                        color: isFaulty ? color : 'white',
                        textShadow: isFaulty
                          ? `0 0 10px ${color}, 0 0 20px ${color}80, 0 0 40px ${color}40, 2px 2px 0 ${color}60`
                          : `3px 3px 0 ${color}, -1px -1px 0 ${color}60, 0 0 30px ${color}50, 0 0 60px ${color}30`,
                        filter: isFaulty ? `drop-shadow(0 2px 6px ${color}50)` : `drop-shadow(0 4px 8px ${color}40)`,
                        WebkitTextStroke: isFaulty ? `1px ${color}` : 'none',
                        animation: isFaulty ? `faultyFlicker 3s ease-in-out ${i * 0.3}s infinite` : i === 8 ? 'smoothBlink 4s ease-in-out infinite' : 'none',
                      }}
                    >
                      {letter}
                    </span>

                    {/* Glow backdrop behind letter */}
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 rounded-sm"
                      style={{
                        background: isFaulty
                          ? `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)`
                          : `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
                        transform: 'scale(1.5)',
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <p
              className="font-departure text-lg font-bold uppercase tracking-[0.3em] text-[#00ffff] md:text-xl"
              style={{ textShadow: "0 0 15px #00ffff" }}
            >
              ENTER THE VIRTUAL ARENA
            </p>

            <p className="font-supply mx-auto mb-12 mt-8 max-w-2xl text-sm uppercase leading-relaxed text-[#b8a4cc] md:text-base">
              EXPERIENCE REAL-TIME MULTIPLAYER BATTLES IN A RETRO-FUTURISTIC CYBER ARENA.
              CONNECT WITH PLAYERS WORLDWIDE AND DOMINATE THE VIRTUAL FRONTIER.
            </p>
          </div>
          <Link
            to="/join"
            className="group relative inline-block cursor-pointer border-4 border-[#ff00ff] bg-[#200a18] px-12 py-5 text-xl font-black uppercase tracking-widest text-white transition-all duration-100 hover:bg-[#ff00ff30]"
            style={{
              boxShadow: "6px 6px 0 #ff00ff80, 0 0 40px #ff00ff40, inset 0 0 30px #ff00ff10",
            }}
          >
            <div className="absolute -left-2 -top-2 h-4 w-4 bg-[#ff00ff]" />
            <div className="absolute -right-2 -bottom-2 h-4 w-4 bg-[#ff00ff]" />
            <span
              className="flex items-center gap-3"
              style={{ textShadow: "2px 2px 0 #ff00ff" }}
            >
              START GAME
              <span className="inline-block animate-pulse text-2xl" style={{ textShadow: "0 0 10px #ff00ff" }}>
                ★
              </span>
            </span>
          </Link>



          <p className="font-supply mt-6 text-xs text-[#664488] tracking-widest">
            PRESS START TO ENTER • NO [DOWNLOAD] REQUIRED
          </p>
        </div>
      </section>

      <section className="relative z-10 border-t border-[#332244] bg-[#0a0612]/80 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-12 text-center text-2xl font-black uppercase tracking-widest text-[#00ffff]"
            style={{ textShadow: "0 0 15px #00ffff" }}
          >
            Features
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "⚡",
                title: "REAL-TIME MULTIPLAYER",
                desc: "BATTLE PLAYERS WORLDWIDE WITH LIGHTNING-FAST SYNCHRONIZED GAMEPLAY",
                color: "#00ffff",
              },
              {
                icon: "🎮",
                title: "RETRO ARCADE STYLE",
                desc: "IMMERSIVE YOURSELF IN CYBERPUNK AESTHETICS WITH NEON VISUALS",
                color: "#ff00ff",
              },
              {
                icon: "🌐",
                title: "INSTANT CONNECT",
                desc: "NO DOWNLOADS OR INSTALLATIONS - PLAY DIRECTLY IN YOUR BROWSER",
                color: "#ffff00",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative border-2 bg-[#1a0a2e] p-6 transition-all hover:-translate-y-1"
                style={{
                  borderColor: feature.color,
                  boxShadow: `4px 4px 0 ${feature.color}40, inset 0 0 20px ${feature.color}10`,
                }}
              >
                <div
                  className="absolute -left-1 -top-1 h-3 w-3"
                  style={{ backgroundColor: feature.color }}
                />
                <div
                  className="absolute -right-1 -bottom-1 h-3 w-3"
                  style={{ backgroundColor: feature.color }}
                />

                <span
                  className="mb-4 block text-4xl"
                  style={{ textShadow: `0 0 20px ${feature.color}` }}
                >
                  {feature.icon}
                </span>
                <h3
                  className="mb-2 text-lg font-bold uppercase tracking-wide"
                  style={{ color: feature.color, textShadow: `0 0 10px ${feature.color}` }}
                >
                  {feature.title}
                </h3>
                <p className="font-supply text-sm text-[#b8a4cc]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-[#332244] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-12 text-center text-2xl font-black uppercase tracking-widest text-[#ff00ff]"
            style={{ textShadow: "0 0 15px #ff00ff" }}
          >
            Player Reviews
          </h2>

          <div className="relative h-48 overflow-hidden md:h-40">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`absolute left-0 right-0 mx-auto max-w-lg transition-all duration-300 ${i === currentReview
                  ? isAnimating
                    ? "translate-y-4 opacity-0 blur-sm"
                    : "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-sm"
                  }`}
                style={{
                  transform: i === currentReview
                    ? isAnimating
                      ? "translateY(20px) scale(0.95)"
                      : "translateY(0) scale(1)"
                    : "translateY(20px)",
                  opacity: i === currentReview ? (isAnimating ? 0 : 1) : 0,
                  filter: isAnimating ? "blur(4px)" : "blur(0px)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                <div
                  className="relative border-2 border-[#664488] bg-[#1a0a2e] p-6"
                  style={{
                    boxShadow: "4px 4px 0 #66448840",
                    animation: isAnimating ? "glitch 0.15s infinite" : "none"
                  }}
                >
                  {isAnimating && (
                    <div className="pointer-events-none absolute inset-0 bg-[#ff00ff]/10 animate-pulse" />
                  )}
                  <p className="font-supply mb-4 text-sm leading-relaxed text-[#b8a4cc]">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-bold uppercase tracking-wider text-[#00ffff]"
                      style={{
                        textShadow: "0 0 8px #00ffff",
                        animation: isAnimating ? "textGlitch 0.1s infinite" : "none"
                      }}
                    >
                      {review.name}
                    </span>
                    <span className="text-[#ffff00]" style={{ textShadow: "0 0 10px #ffff00" }}>
                      {review.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 transition-all duration-300 ${i === currentReview
                  ? "bg-[#ff00ff] scale-125"
                  : "bg-[#664488]"
                  }`}
                style={{
                  boxShadow: i === currentReview ? "0 0 10px #ff00ff" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-[#332244] bg-[#0d0618] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="mb-6 text-2xl font-black uppercase tracking-widest text-white"
            style={{ textShadow: "3px 3px 0 #ff00ff" }}
          >
            READY TO PLAY?
          </h2>
          <p className="font-supply mb-8 uppercase text-[#b8a4cc]">
            JOIN THOUSANDS OF PLAYERS IN THE ULTIMATE WEB-BASED ARCADE EXPERIENCE.
          </p>
          <Link
            to="/join"
            className="group relative inline-block cursor-pointer border-4 border-[#00ffff] bg-[#0a1520] px-12 py-5 text-xl font-black uppercase tracking-widest text-white transition-all duration-100 hover:bg-[#00ffff30]"
            style={{
              boxShadow: "6px 6px 0 #00ffff80, 0 0 40px #00ffff40, inset 0 0 30px #00ffff10",
            }}
          >
            <div className="absolute -left-2 -top-2 h-4 w-4 bg-[#00ffff]" />
            <div className="absolute -right-2 -bottom-2 h-4 w-4 bg-[#00ffff]" />
            <span
              className="flex items-center gap-3"
              style={{ textShadow: "2px 2px 0 #00ffff" }}
            >
              JOIN NOW
              <span className="inline-block animate-pulse text-2xl" style={{ textShadow: "0 0 10px #00ffff" }}>
                ▶
              </span>
            </span>
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#332244] px-4 py-8">
        <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-4">
            <div
              className="h-2 w-2 animate-pulse bg-[#ff00ff]"
              style={{ boxShadow: "0 0 8px #ff00ff" }}
            />
            <div
              className="h-2 w-2 animate-pulse bg-[#00ffff]"
              style={{ boxShadow: "0 0 8px #00ffff", animationDelay: "0.3s" }}
            />
            <div
              className="h-2 w-2 animate-pulse bg-[#ffff00]"
              style={{ boxShadow: "0 0 8px #ffff00", animationDelay: "0.6s" }}
            />
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="font-supply text-[10px] font-bold uppercase tracking-widest text-[#00ffff] transition-colors hover:text-[#ffffff]"
              style={{ textShadow: "0 0 8px #00ffff" }}
            >
              LOG IN
            </Link>
            <Link
              to="/signup"
              className="font-supply text-[10px] font-bold uppercase tracking-widest text-[#ff00ff] transition-colors hover:text-[#ffffff]"
              style={{ textShadow: "0 0 8px #ff00ff" }}
            >
              SIGN UP
            </Link>
          </div>
          <p className="font-supply text-[10px] text-[#664488] tracking-widest">
            © 2026 WEB WORLD • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </main>
  );
}
