import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pressStart2P, geistMono, spaceMono, saira } from "@/fonts";
import { ShootingStars } from "@/components/ui/shooting-star";
import { StarsBackground } from "@/components/ui/stars-background";
import { signIn } from "next-auth/react"

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const handleSubmit = async () => {
    // Email validation
    const emailError = validateEmail(form.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (!form.password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else if (res?.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex items-center bg-black justify-center relative overflow-hidden ${geistMono.className}`}
      >
        {/* Rotating background container */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "200s" }}
        >
          <StarsBackground />
        </div>

        {/* Additional rotating gradient overlay */}
        <div
          className="absolute inset-0 animate-spin opacity-20"
          style={{
            animationDuration: "300s",
            background:
              "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
          }}
        />

        <ShootingStars />
        <div className="flex flex-col md:flex-row gap-8 p-4 max-w-5xl w-full items-stretch h-auto relative z-10">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl w-full max-w-md rounded-2xl p-6 text-white z-10 flex flex-col justify-center">
            <h2
              className={`text-xl text-center mb-4 ${pressStart2P.className} tracking-widest`}
            >
              JOIN THE METAVERSE
            </h2>
            <CardContent className="flex flex-col gap-4">
              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
                  {error}
                </div>
              )}

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-white/10 border-white/30 placeholder-white/60 text-white"
                disabled={isLoading}
              />

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-white/10 border-white/30 placeholder-white/60 text-white pr-10"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/60 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </Button>
              </div>

              <Button
                className={`bg-purple-600 hover:bg-purple-700 transition-all font-semibold mt-2 ${pressStart2P.className}`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <p
                className={`text-[15.5px] text-center text-white/70 mt-2 ${spaceMono.className}`}
              >
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className={`text-blue-400 hover:underline hover:font-bold ${spaceMono.className}`}
                >
                  Sign Up
                </a>
              </p>

              <div
                className={`flex space-y-2 flex-col ${pressStart2P.className}`}
              >
                <Button className="bg-white font-bold transition-all" disabled={isLoading}>
                  <span className="text-blue-600">G</span>
                  <span className="text-red-600">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-600">g</span>
                  <span className="text-green-600">l</span>
                  <span className="text-red-600">e</span>
                </Button>
                <Button className="bg-[#1877F2] text-white font-bold transition-all" disabled={isLoading}>
                  <span>F</span>
                  <span>a</span>
                  <span>c</span>
                  <span>e</span>
                  <span>b</span>
                  <span>o</span>
                  <span>o</span>
                  <span>k</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden backdrop-blur-lg bg-black/10 border-white/20 shadow-xl w-full max-w-md rounded-2xl p-6 text-white z-10 flex items-center justify-center">
            <img
              src="/signin/cover.png"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 text-center">
              <h1
                className={`text-3xl lg:text-4xl font-bold text-white drop-shadow-lg ${pressStart2P.className}`}
              >
                Welcome back!
              </h1>
              <p
                className={`mt-4 text-lg text-white/80 ${geistMono.className} font-medium`}
              >
                Continue your journey beyond the screen.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
