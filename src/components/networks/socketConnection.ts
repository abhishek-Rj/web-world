import { io } from "socket.io-client";

const socketConnection = io("http://localhost:4000", {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: false,
});

export { socketConnection };
