import { io, Socket } from "socket.io-client";
import { FeedItem } from "./types";

// API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";
const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL || "http://localhost:3001";
//const SOCKET_URL = "http://localhost:3001";

class SocketClient {
  private socket: Socket;

  constructor() {
    this.socket = io(SOCKET_IO_URL);
  }

  onNewFeedItem(callback: (item: FeedItem) => void) {
    this.socket.on("new-feed-item", callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export const socketClient = new SocketClient();
