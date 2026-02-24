import express from "express";
import { router } from "./src/routes";
import { Server } from "socket.io";
import { gameRoom, playerDetailSchema } from "../src/utils/interface/schema";
import cors, { CorsOptions } from "cors";
import socket from "./src/websocket/socket";

const app = express();
const server = app.listen(4000, () => {
  console.log(`${new Date()} backend runnnin on port 4000`);
});

const whiteList = ["http://localhost:5173"];

const corsConfig: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, origin?: boolean) => void,
  ) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsConfig));

const io = new Server(server, {
  transports: ["websocket"],
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectTimeout: 5000,
  allowEIO3: true,
  serveClient: false,
  allowUpgrades: false,
});

export let playerRoom = new Map<string, string>();
export let rooms = new Map<string, gameRoom>();

app.use("/network", router);

io.on("connection", socket);
