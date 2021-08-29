import config from '../config/index';
import socketIOClient from "socket.io-client";

const serverEndpoint = config.server_node.url;

export const socket = socketIOClient(serverEndpoint, {
  transports: ['websocket']
});
