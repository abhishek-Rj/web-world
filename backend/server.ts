import "dotenv/config";

import express from "express";
import { joinRouter } from "./src/routes/network";
import { Server } from "socket.io";
import { gameRoom } from "./interface/schema";
import cors, { CorsOptions } from "cors";
import socket from "./src/websocket/socket";
import { authRouter } from "./src/routes/auth";
import { characterRouter } from "./src/routes/avatar";
import cookieParser from "cookie-parser";
import { s3Router } from "./src/aws/s3";
import { userRouter } from "./src/routes/user";

const app = express();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`${new Date()} backend runnnin on port ${PORT}`);
});

const whiteList = [
  "http://localhost:5173",
  "http://frontend:5173",
  "https://webworld.abhishekraj.xyz",
  "https://web-world-rust.vercel.app",
];

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
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.json());

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

app.use("/auth", authRouter);
app.use("/network", joinRouter);
app.use("/s3", s3Router);
app.use("/avatar", characterRouter);
app.use("/user", userRouter);

io.on("connection", socket);
