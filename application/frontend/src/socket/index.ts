import { io } from "socket.io-client";
// @ts-ignore
import { SocketEvents } from "@spg/shared/src";

const socket = io();

interface User {
  username: string;
  id: string;
  rated: boolean;
}

interface Score {
  score: number | string,
  username: string | null,
}

export function joinRoom(username: string) {
  socket.emit(SocketEvents.JOIN_ROOM, username);
  sessionStorage.setItem("username", username);
}

export function onUsersModified(callback: Function) {
  socket.on(SocketEvents.USERS_MODIFIED, (newUsersList: [User]) => {
    callback(newUsersList);
  });
}

export function onGetAvg(callback: Function) {
  socket.on(SocketEvents.GET_AVG, (avg: number) => {
    callback(avg);
  });
}

export function emitAddScore(score: Score) {
  socket.emit(SocketEvents.ADD_SCORE, score);
}

export function offUsersModified() {
  socket.off(SocketEvents.USERS_MODIFIED);
}

export function offGEtAvg() {
  socket.off(SocketEvents.GET_AVG);
}