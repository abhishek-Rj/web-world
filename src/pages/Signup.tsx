import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.length < 3 || username.length > 20) {
      setError("USERNAME MUST BE 3-20 CHARACTERS");
      return;
    }
    if (/\s/.test(username)) {
      setError("USERNAME CANNOT CONTAIN SPACES");
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError("USERNAME CAN ONLY CONTAIN LETTERS, NUMBERS, _ AND -");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("ENTER A VALID EMAIL");
      return;
    }
    if (password.length < 8) {
      setError("PASSWORD MUST BE 8+ CHARACTERS");
      return;
    }
    if (password !== confirmPassword) {
      setError("PASSWORDS DO NOT MATCH");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );
      if (!response.ok) {
        setError("Signup failed");
        return;
      }
      const data = await response.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        setUser(data.user);
        navigate("/character");
      }
    } catch (error) {
      console.error(error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
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
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#664488] transition-colors hover:text-[#ff00ff]"
            style={{ textShadow: "0 0 8px #66448840" }}
          >
            ◀ BACK TO HOME
          </Link>

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
                ★ NEW PLAYER ★
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
                style={{ textShadow: "3px 3px 0 #ff00ff, -1px -1px 0 #00ffff" }}
              >
                Join The Arena
              </h1>
              <p className="mb-6 text-center text-xs text-[#b8a4cc]">
                CREATE YOUR PLAYER IDENTITY
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Username */}
                <div>
                  <label
                    className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ffff]"
                    style={{ textShadow: "0 0 6px #00ffff" }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    placeholder="CHOOSE A HANDLE"
                    className="w-full border-2 border-[#00ffff80] bg-[#050a10] px-4 py-3 text-sm font-bold tracking-widest text-[#00ffff] placeholder-[#00ffff30] outline-none transition-all duration-200 focus:border-[#00ffff] focus:shadow-[0_0_20px_#00ffff40,inset_0_0_20px_#00ffff10]"
                    style={{
                      textShadow: "0 0 8px #00ffff60",
                      boxShadow: "inset 0 0 15px #00ffff08",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffff00]"
                    style={{ textShadow: "0 0 6px #ffff00" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="PLAYER@ARENA.COM"
                    className="w-full border-2 border-[#ffff0080] bg-[#0a0a05] px-4 py-3 text-sm font-bold tracking-widest text-[#ffff00] placeholder-[#ffff0030] outline-none transition-all duration-200 focus:border-[#ffff00] focus:shadow-[0_0_20px_#ffff0040,inset_0_0_20px_#ffff0010]"
                    style={{
                      textShadow: "0 0 8px #ffff0060",
                      boxShadow: "inset 0 0 15px #ffff0008",
                    }}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff00ff]"
                    style={{ textShadow: "0 0 6px #ff00ff" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full border-2 border-[#ff00ff80] bg-[#100510] px-4 py-3 text-sm font-bold tracking-widest text-[#ff00ff] placeholder-[#ff00ff30] outline-none transition-all duration-200 focus:border-[#ff00ff] focus:shadow-[0_0_20px_#ff00ff40,inset_0_0_20px_#ff00ff10]"
                    style={{
                      textShadow: "0 0 8px #ff00ff60",
                      boxShadow: "inset 0 0 15px #ff00ff08",
                    }}
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff00ff]"
                    style={{ textShadow: "0 0 6px #ff00ff" }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="••••••••"
                    className="w-full border-2 border-[#ff00ff80] bg-[#100510] px-4 py-3 text-sm font-bold tracking-widest text-[#ff00ff] placeholder-[#ff00ff30] outline-none transition-all duration-200 focus:border-[#ff00ff] focus:shadow-[0_0_20px_#ff00ff40,inset_0_0_20px_#ff00ff10]"
                    style={{
                      textShadow: "0 0 8px #ff00ff60",
                      boxShadow: "inset 0 0 15px #ff00ff08",
                    }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p
                    className="text-center text-xs font-bold text-[#ff4444]"
                    style={{ textShadow: "0 0 8px #ff4444" }}
                  >
                    ⚠ {error}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative mt-2 w-full rounded-none border-2 border-[#ff00ff] bg-[#200a18] py-4 text-center font-black uppercase tracking-widest text-white transition-all duration-100 hover:bg-[#ff00ff20] disabled:opacity-50"
                  style={{
                    boxShadow: "4px 4px 0 #ff00ff80, inset 0 0 20px #ff00ff10",
                  }}
                >
                  <div className="absolute -left-1 -top-1 h-3 w-3 bg-[#ff00ff]" />
                  <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#ff00ff]" />
                  <span
                    className="flex items-center justify-center gap-3"
                    style={{ textShadow: "0 0 10px #ff00ff" }}
                  >
                    {isLoading ? (
                      <>
                        INITIALIZING
                        <span className="inline-block animate-pulse text-xl">
                          ◆
                        </span>
                      </>
                    ) : (
                      <>
                        CREATE ACCOUNT
                        <span className="inline-block animate-pulse text-xl">
                          ★
                        </span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#332244]" />
                <span className="text-[10px] font-bold tracking-widest text-[#664488]">
                  OR
                </span>
                <div className="h-px flex-1 bg-[#332244]" />
              </div>

              {/* Login link */}
              <Link
                to="/login"
                className="group relative block w-full rounded-none border-2 border-[#00ffff] bg-[#0a1520] py-3 text-center font-bold uppercase tracking-widest text-[#00ffff] transition-all duration-100 hover:bg-[#00ffff20]"
                style={{
                  boxShadow: "4px 4px 0 #00ffff40, inset 0 0 15px #00ffff08",
                }}
              >
                <span
                  className="flex items-center justify-center gap-2 text-sm"
                  style={{ textShadow: "0 0 8px #00ffff" }}
                >
                  ALREADY HAVE AN ACCOUNT? LOG IN
                  <span className="text-lg">▶</span>
                </span>
              </Link>

              {/* Pulsing dots */}
              <div className="mt-5 flex justify-center gap-4">
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
            NEW CHALLENGER • CREATE YOUR IDENTITY
          </p>
        </div>
      </section>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-[#332244]">
        <span>STATUS: REGISTRATION</span>
        <span>SYSTEM: ONLINE</span>
        <span>CREDIT: 00</span>
      </div>
    </main>
  );
}
