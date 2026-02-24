import Phaser from "phaser";
import { gameFunction } from "../gameFunction";

var gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth || 800,
  height: window.innerHeight || 600,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game-container",
  pixelArt: true,
  backgroundColor: "#0a0612",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: gameFunction,
};

export default gameConfig;
