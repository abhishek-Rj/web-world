import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pressStart2P, geistMono, spaceMono, saira } from "@/fonts";
import { ShootingStars } from "@/components/ui/shooting-star";
import { StarsBackground } from "@/components/ui/stars-background";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => { };

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

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-white/10 border-white/30 placeholder-white/60 text-white"
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-white/10 border-white/30 placeholder-white/60 text-white"
              />
              <Button
                className={`bg-purple-600 hover:bg-purple-700 transition-all font-semibold mt-2 ${pressStart2P.className}`}
                onClick={handleSubmit}
              >
                Sign Up
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
                <Button className="bg-white font-bold transition-all">
                  <span className="text-blue-600">G</span>
                  <span className="text-red-600">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-600">g</span>
                  <span className="text-green-600">l</span>
                  <span className="text-red-600">e</span>
                </Button>
                <Button className="bg-[#1877F2] text-white font-bold transition-all">
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
