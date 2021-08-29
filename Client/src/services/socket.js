import 'dotenv/config';
import socketIOClient from "socket.io-client";

const serverEndpoint = process.env.SERVER_NODE_URL;
// const serverEndpoint = "http://localhost:4000";

export const socket = socketIOClient(serverEndpoint, {
  transports: ['websocket']
});
