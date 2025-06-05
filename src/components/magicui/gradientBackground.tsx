'use client';

export default function NoisyGradientBlurBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* Blurred gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-600 opacity-90 rounded-full blur-[200px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-pink-500 opacity-90 rounded-full blur-[200px]" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-blue-500 opacity-90 rounded-full blur-[180px]" />

      {/* Noise layer */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-screen animate-noise" />
    </div>
  );
}
