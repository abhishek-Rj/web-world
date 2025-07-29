import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pressStart2P, geistMono, spaceMono } from "@/fonts";
import GridDistortion from "@/components/ui/distortion";
import { useRouter } from "next/navigation";

interface Avatar {
  id: number;
  name: string;
  image: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic";
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
  };
}

const avatars: Avatar[] = [
  {
    id: 1,
    name: "Cyber Knight",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=cyber-knight&backgroundColor=1a1a1a&clothesColor=4a90e2&accessoriesColor=ff6b6b",
    description: "A futuristic warrior with enhanced cybernetic implants",
    rarity: "Epic",
    stats: {
      strength: 85,
      agility: 70,
      intelligence: 90,
    },
  },
  {
    id: 2,
    name: "Neon Runner",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=neon-runner&backgroundColor=2d2d2d&clothesColor=ff6b6b&accessoriesColor=4ecdc4",
    description: "A speed demon with neon-lit enhancements",
    rarity: "Rare",
    stats: {
      strength: 60,
      agility: 95,
      intelligence: 75,
    },
  },
  {
    id: 3,
    name: "Digital Sage",
    image:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=digital-sage&backgroundColor=1a1a1a&clothesColor=9b59b6&accessoriesColor=f39c12",
    description: "A wise technomancer with ancient digital knowledge",
    rarity: "Common",
    stats: {
      strength: 50,
      agility: 65,
      intelligence: 100,
    },
  },
];

export default function SelectAvatar() {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirmSelection = async () => {
    if (!selectedAvatar) return;

    setIsLoading(true);
    // Here you would typically save the avatar selection to your backend
    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Epic":
        return "text-purple-400 border-purple-400";
      case "Rare":
        return "text-blue-400 border-blue-400";
      case "Common":
        return "text-green-400 border-green-400";
      default:
        return "text-gray-400 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid Distortion Background */}
      <div className="absolute inset-0 z-0">
        <GridDistortion
          imageSrc="https://picsum.photos/1920/1080?grayscale"
          grid={20}
          mouse={0.15}
          strength={0.2}
          relaxation={0.85}
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`${pressStart2P.className} text-4xl md:text-6xl text-white mb-4 tracking-wider`}
          >
            CHOOSE YOUR AVATAR
          </h1>
          <p
            className={`${spaceMono.className} text-lg text-white/70 max-w-2xl mx-auto`}
          >
            Select your digital identity and begin your journey in the metaverse
          </p>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          {avatars.map((avatar) => (
            <Card
              key={avatar.id}
              className={`backdrop-blur-sm bg-white/10 border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                selectedAvatar?.id === avatar.id
                  ? "border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/50"
                  : "border-white/20 hover:border-white/40"
              }`}
              onClick={() => handleAvatarSelect(avatar)}
            >
              <CardContent className="p-6 text-white">
                {/* Avatar Image */}
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Avatar Info */}
                <div className="text-center">
                  <h3 className={`${pressStart2P.className} text-xl mb-2`}>
                    {avatar.name}
                  </h3>
                  <span
                    className={`${
                      spaceMono.className
                    } text-sm px-3 py-1 rounded-full border ${getRarityColor(
                      avatar.rarity
                    )}`}
                  >
                    {avatar.rarity}
                  </span>
                  <p
                    className={`${geistMono.className} text-sm text-white/70 mt-3 mb-4`}
                  >
                    {avatar.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        STR
                      </span>
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${avatar.stats.strength}%` }}
                        />
                      </div>
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        {avatar.stats.strength}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        AGI
                      </span>
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${avatar.stats.agility}%` }}
                        />
                      </div>
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        {avatar.stats.agility}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        INT
                      </span>
                      <div className="w-24 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${avatar.stats.intelligence}%` }}
                        />
                      </div>
                      <span
                        className={`${spaceMono.className} text-xs text-white/60`}
                      >
                        {avatar.stats.intelligence}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="text-center">
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedAvatar || isLoading}
            className={`${pressStart2P.className} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>INITIALIZING...</span>
              </div>
            ) : (
              `CONFIRM ${selectedAvatar?.name?.toUpperCase() || "SELECTION"}`
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className={`${spaceMono.className} text-sm text-white/50`}>
            Click on an avatar to select • Your choice will define your journey
          </p>
        </div>
      </div>
    </div>
  );
}
