import express from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import expressWs from 'express-ws';
import path from 'path';
import ws, { RawData } from 'ws';
import { UserManager } from './user/UserManager';
import { CloseHandler } from './websocket-handler/CloseHandler';
import { ErrorHandler } from './websocket-handler/ErrorHandler';
import { MessageHandler } from './websocket-handler/MessageHandler';

dotenv.config();

const port = process.env.PORT || 3000;

const expressWebSocketServer = expressWs(express());
const server = expressWebSocketServer.app;

const userManager = new UserManager();
const closeHandler = new CloseHandler(userManager);
const errorHandler = new ErrorHandler(userManager);
const messageHandler = new MessageHandler(userManager, expressWebSocketServer);

server.use(express.static(path.resolve(__dirname, '../../app/build')));

const handleWebSocketConnection = (ws: ws) => {
  const id: string = uuidv4();
  console.log(`New connection: ${id}`);
  userManager.addUser(ws, id);

  ws.on('message', (rawMessage: RawData) => {
    messageHandler.handleMessage(ws, rawMessage);
  });

  ws.on('error', (error: Error) => {
    errorHandler.handleError(ws, error);
  });

  ws.on('close', (code: number) => {
    closeHandler.handleClose(ws, code);
  });
};

server.ws('/', handleWebSocketConnection);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error(`[server]: Failed to start server: ${err.message}`);
});