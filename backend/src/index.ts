import { MESSAGES } from "consts";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Logger } from "utils";
import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

interface Message {
  id: string;
  username: string;
  msg: string;
}

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
  const clientID = uuidv4();
  Logger.info("New Client connected: ", clientID);

  ws.send(JSON.stringify({ type: "id", id: clientID }));

  ws.on("message", (message: string) => {
    const msg: Message = JSON.parse(message);
    Logger.info("Received from client", msg.id);
    Logger.info(`Username: ${msg.username}`);
    Logger.info("Message: ", msg.msg);
  });

  ws.on("close", () => {
    Logger.info(`Client ${clientID} disconnected`);
  });
});

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"));

const PORT = process.env.SERBER_PORT || 4000;

app.listen(PORT, () => {
  Logger.log(MESSAGES.MSG_SERVER_STARTED);
});

export default app;
