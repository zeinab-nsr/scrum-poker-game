import { io } from "socket.io-client";
const events = require('shared/socker')

const socket = io();

interface User {
  username: string;
  id: string;
  rated: boolean;
}

interface Score {
  score: number | string,
  userId: string | null,
}

export function joinRoom(username: string) {
  socket.emit(events.JOIN_ROOM, username);
  socket.on(events.GET_CONNECTION_ID, (id: string) => {
    sessionStorage.setItem("id", id);
  })
}

export function onUsersModified(callback: Function) {
  socket.on(events.USERS_MODIFIED, (newUsersList: [User]) => {
    callback(newUsersList);
  });
}

export function onGetAvg(callback: Function) {
  socket.on(events.GET_AVG, (avg: number) => {
    callback(avg);
  });
}

export function emitAddScore(score: Score) {
  socket.emit(events.ADD_SCORE, score);
}

export function offUsersModified() {
  socket.off(events.USERS_MODIFIED);
}

export function offGEtAvg() {
  socket.off(events.GET_AVG);
}