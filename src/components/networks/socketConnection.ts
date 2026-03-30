import { io } from "socket.io-client";

const socketConnection = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: false,
});

export { socketConnection };
