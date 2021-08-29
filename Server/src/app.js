import express from 'express';
import loaders from './loaders';
import { createServer } from "http";
import { Server } from 'socket.io';
import socketServer from "./socketServer";

const startServer = async () => {
  const app = express();

  await loaders.init({ expressApp: app });

  // app.listen(process.env.PORT, () => {
  //   console.log(`Backend listening on port ${process.env.PORT}!`);
  // });

  const server = createServer(app);
  const options = {};
  const io = new Server(server, options)
  await socketServer({ io: io });
  console.log('Socket Initialized');

  server.listen(process.env.PORT);

  server.on('listening', () => {
    console.log(`Backend Listening on port:: http://localhost:${process.env.PORT}/`);
  });
  return app;
};

startServer();

