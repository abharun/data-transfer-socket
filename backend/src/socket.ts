import { Server, Socket } from "socket.io";
import { Logger } from "utils";

class SocketServer {
  io: Server | null = null;

  startServer = (server: any) => {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.on('connection', (socket: Socket) => {
        const id = socket.id;
        Logger.info(`User ${id} connected`);
        socket.emit('idset', id);

        socket.on('message', (data) => {
            Logger.info(`Message from ${id}`);
            Logger.info(data);
        });

        socket.on('disconnect', () => {
            Logger.info(`User ${id} disconnected`);
        });
    });
  };

  sendToken = (token: string, socketId: string) => {
    this.io.sockets.emit(socketId, token);
  };
}

export const socketServer = new SocketServer();
