import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import gameConfig from "../components/game/config/gameConfig";
import Phaser from "phaser";
import { socketConnection as socket } from "@/components/networks/socketConnection";

export default function World() {
  const { worldId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("joinRoom", { roomCode: worldId });
      socket.on("joinedRoom", () => {
        console.log(`Connected to room ${worldId}`);
      });
    }
    const game = new Phaser.Game(gameConfig);
    game.scene.start("scene_1", { socket });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div ref={containerRef} id="game-container" className="fixed inset-0" />
  );
}
