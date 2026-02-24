import { Socket } from "socket.io";
import { playerDetailSchema } from "../../../src/utils/interface/schema";
import { randomCode } from "../random.code.generator";
import { playerRoom, rooms } from "../../server";

export default function socket(socket: Socket) {
  if (!socket.handshake.headers["user-agent"]) {
    socket.disconnect();
    return;
  }
  const player = {
    id: socket.id,
    x: 332,
    y: 1216,
  };

  //room logic
  socket.on("createRoom", () => {
    const code = randomCode();
    socket.join(code);
    rooms.set(code, {
      players: new Map(),
    });

    rooms.get(code)?.players.set(player.id, player);
    playerRoom.set(socket.id, code);

    socket.emit("roomCreated", { code });
    console.log(rooms);
  });

  socket.on("joinRoom", ({ roomCode }: { roomCode: string }) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    socket.join(roomCode);
    room.players.set(player.id, player);
    playerRoom.set(socket.id, roomCode);
    socket.emit("joinedRoom", { roomCode });
    console.log(rooms);
  });

  //game Logics
  setInterval(() => {
    const roomCode = playerRoom.get(socket.id);
    if (roomCode) {
      socket.emit(
        "currentPlayers",
        Object.fromEntries(rooms.get(roomCode)!.players),
      );
    }
  }, 500);

  //socket.broadcast.emit("newPlayer", players.get(socket.id));

  socket.on("playerMove", (player: playerDetailSchema) => {
    if (player && player.id && playerRoom.has(player.id)) {
      const roomCode = playerRoom.get(player.id);
      if (roomCode) {
        rooms.get(roomCode)!.players.set(player.id, player);
        socket.to(roomCode).emit("playerMoved", player);
      }
    }
  });

  socket.on("disconnect", () => {
    const roomCode = playerRoom.get(socket.id);
    if (roomCode) {
      rooms.get(roomCode)!.players.delete(socket.id);
      socket.broadcast.emit("playerDisconnected", socket.id);
      playerRoom.delete(socket.id);
    }
  });
}
