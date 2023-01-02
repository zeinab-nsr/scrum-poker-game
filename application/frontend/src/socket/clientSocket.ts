import { io } from "socket.io-client";

const socket = io();

const clientSocket = {
  emitEvent(eventName: string, value?: any) {
    socket.emit(eventName, value);
  },

  listenToSocketEvent(channelName: string, callback: (data?: any) => void) {
    socket.on(channelName, data => {
      callback(data);
    });
  },
};

Object.freeze(clientSocket);
export { clientSocket };