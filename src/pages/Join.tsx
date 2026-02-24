import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketConnection as socket } from "@/components/networks/socketConnection";

export default function Join() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleJoinClick = () => {
    setShowModal(true);
    setRoomCode("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.length !== 6 || !/^\d{6}$/.test(roomCode)) {
      setError("ENTER 6-DIGIT CODE");
      return;
    }
    setShowModal(false);
    socket.connect();
    socket.emit("joinRoom", { roomCode });
    socket.on("joinedRoom", ({ roomCode }: { roomCode: string }) => {
      navigate(`/world/${roomCode}`);
    });
  };

  const handleRoomJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.connect();
    socket.emit("createRoom");
    socket.on("roomCreated", ({ code }) => {
      navigate(`/world/${code}`);
    });
  };

  return (
    <main className="font-pixel relative min-h-screen overflow-hidden bg-[#0a0612] text-[#f7f0ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#ff00ff40_0%,transparent_50%),radial-gradient(ellipse_at_0%_100%,#00ffff30_0%,transparent_40%),radial-gradient(ellipse_at_100%_100%,#ff6b0040_0%,transparent_40%)] animate-[flicker_3s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute inset-0 opacity-20 [background:linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] [background-size:4px_4px]" />

      <div className="pointer-events-none absolute inset-0 animate-pulse opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff00ff10_2px,#ff00ff10_4px)]" />

      <div className="absolute left-1/2 top-[15%] -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
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
        <div className="w-full max-w-md">
          <div
            className="relative rounded-none border-4 border-[#ff00ff] bg-[#0d0618] p-1"
            style={{
              boxShadow:
                "0 0 0 2px #00ffff, 0 0 30px #ff00ff80, inset 0 0 30px #ff00ff20",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0d0618] px-3">
              <span
                className="inline-block whitespace-nowrap text-xs font-bold leading-none tracking-[0.25em] text-[#00ffff]"
                style={{ textShadow: "0 0 10px #00ffff" }}
              >
                ★ ARCADE PORTAL ★
              </span>
            </div>

            <div className="bg-[#1a0a2e] p-6 pt-8">
              <h1
                className="mb-2 text-center text-3xl font-black uppercase tracking-widest text-[#fff]"
                style={{ textShadow: "3px 3px 0 #ff00ff, -1px -1px 0 #00ffff" }}
              >
                Select Mode
              </h1>
              <p className="mb-8 text-center text-xs text-[#b8a4cc]">
                CHOOSE YOUR DESTINY
              </p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className="group relative w-full rounded-none border-2 border-[#00ffff] bg-[#0a1520] py-4 text-left transition-all duration-100 hover:bg-[#00ffff]20"
                  style={{
                    boxShadow: "4px 4px 0 #00ffff80, inset 0 0 20px #00ffff10",
                  }}
                >
                  <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#00ffff]" />
                  <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#00ffff]" />

                  <div className="px-4">
                    <span
                      className="block text-xs font-bold uppercase tracking-[0.3em] text-[#00ffff]"
                      style={{ textShadow: "0 0 8px #00ffff" }}
                    >
                      [ 1 ] Multiplayer
                    </span>
                    <span className="mt-1 block text-xl font-black uppercase tracking-wide text-white">
                      Join World
                    </span>
                  </div>

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-[#00ffff] opacity-50 transition-opacity group-hover:opacity-100"
                    style={{ textShadow: "0 0 10px #00ffff" }}
                  >
                    ▶
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleRoomJoin}
                  className="group relative w-full rounded-none border-2 border-[#ff00ff] bg-[#200a18] py-4 text-left transition-all duration-100 hover:bg-[#ff00ff20]"
                  style={{
                    boxShadow: "4px 4px 0 #ff00ff80, inset 0 0 20px #ff00ff10",
                  }}
                >
                  <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#ff00ff]" />
                  <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#ff00ff]" />

                  <div className="px-4">
                    <span
                      className="block text-xs font-bold uppercase tracking-[0.3em] text-[#ff8cf7]"
                      style={{ textShadow: "0 0 8px #ff00ff" }}
                    >
                      [ 2 ] Host
                    </span>
                    <span className="mt-1 block text-xl font-black uppercase tracking-wide text-white">
                      Create World
                    </span>
                  </div>

                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-[#ff00ff] opacity-50 transition-opacity group-hover:opacity-100"
                    style={{ textShadow: "0 0 10px #ff00ff" }}
                  >
                    ★
                  </span>
                </button>
              </div>

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

          <p className="mt-6 text-center text-[10px] text-[#664488] tracking-widest">
            PRESS 1 OR 2 TO SELECT • INSERT COIN TO CONTINUE
          </p>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-[#332244]">
        <span>SCORE: 000000</span>
        <span>HI-SCORE: 999999</span>
        <span>CREDIT: 00</span>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#000000cc]" />

          <div className="relative animate-[pulse_0.5s_ease-in-out]">
            <div
              className="rounded-none border-4 border-[#00ffff] bg-[#0a1520] p-1"
              style={{
                boxShadow:
                  "0 0 0 2px #ff00ff, 0 0 40px #00ffff80, inset 0 0 40px #00ffff10",
              }}
            >
              <div className="bg-[#0d1a28] p-6">
                <h2
                  className="mb-4 text-center text-xl font-black uppercase tracking-widest text-[#00ffff]"
                  style={{ textShadow: "0 0 10px #00ffff" }}
                >
                  Enter Room Code
                </h2>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    maxLength={6}
                    value={roomCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setRoomCode(val);
                      setError("");
                    }}
                    placeholder="000000"
                    className="mb-3 w-full border-2 border-[#00ffff80] bg-[#050a10] px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-[#00ffff] placeholder-[#00ffff40] outline-none"
                    style={{
                      textShadow: "0 0 10px #00ffff",
                      boxShadow: "inset 0 0 20px #00ffff10",
                    }}
                    autoFocus
                  />

                  {error && (
                    <p
                      className="mb-3 text-center text-xs text-[#ff4444]"
                      style={{ textShadow: "0 0 8px #ff4444" }}
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 rounded-none border-2 border-[#ff4444] bg-[#200a0a] py-2 text-sm font-bold uppercase tracking-wider text-[#ff6666] transition-all hover:bg-[#ff444420]"
                      style={{ boxShadow: "2px 2px 0 #ff444480" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-none border-2 border-[#00ff88] bg-[#0a2015] py-2 text-sm font-bold uppercase tracking-wider text-[#00ff88] transition-all hover:bg-[#00ff8820]"
                      style={{ boxShadow: "2px 2px 0 #00ff8880" }}
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
