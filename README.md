# Web World (Multiplayer Web Arcade)

Welcome to **Web World**, a real-time multiplayer 2D arcade ecosystem! This project provides an interactive virtual world where users can select custom characters, host or join distinct private game rooms using 6-digit codes, and explore a shared top-down map together in real time. 

## Key Features

- **Multiplayer Real-Time Synchronization**: Seamlessly handles player spawning, active movement, and disconnects across active sessions using Socket.io.
- **Interactive 2D World**: Powered by Phaser 3, featuring a tilemap-based world with 8-directional character animations and smooth arcade physics.
- **Room Management (Lobbies)**: Players can either host a brand new world or join an existing one using randomly generated 6-digit PINs.
- **Proximity Detection**: Calculates distance between players in real-time, displaying prompts when users are close to each other.
- **Cyberpunk / Retro Arcade UI**: A stylish React frontend featuring heavily stylized, neon-themed character selection and lobby screens.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS (for UI pages)
- **Game Engine**: Phaser 3 (for the 2D canvas experience)
- **Backend & API**: Node.js, Express.js
- **Real-Time Communication**: Socket.io

## Core Project Files Reference

Here is a quick reference guide to the key files in the project to help you navigate the codebase:

- **`src/components/game/gameFunction.ts`**: The core Phaser game scene. It handles the tilemap rendering, player sprites, animations, and movement logic. It also manages the WebSocket connection for multiplayer, synchronizing player positions, spawning, and proximity interactions.
- **`src/components/game/config/gameConfig.ts`**: The Phaser configuration entry point. It sets up the Arcade physics engine, sets the canvas size to be responsive, configures pixel-art scaling, and registers the main `gameFunction` scene.
- **`src/pages/Character.tsx`**: The React-based character selection screen with a neon/cyberpunk aesthetic. Users pick their avatar and the selection is saved to the backend via a POST request (`/upload/character`) before navigating to the Join page.
- **`src/pages/Join.tsx`**: The arcade-style React portal where users choose their multiplayer mode. They can either "Host" a new room (which connects via socket to create a room) or "Join" an existing room (by entering a 6-digit PIN).
- **`backend/src/websocket/socket.ts`**: The main Socket.io handler for the backend. It manages real-time multiplayer functionality including generating rooms (`createRoom`), handling room joins, receiving/broadcasting player movements (`playerMove`), periodic broadcasts of game state (`currentPlayers`), and handling player disconnects.
- **`backend/src/routes/network/`**: This directory handles REST API routing for network-level actions. Specifically, `index.ts` and `join.ts` expose the HTTP endpoint for generating a random 6-digit code for a new multiplayer room.
