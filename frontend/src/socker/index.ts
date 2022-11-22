import { io } from "socket.io-client";
import { Events } from 'shared/socker'

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
  socket.emit(Events.JOIN_ROOM, username);
  socket.on('GET_CONNECTION_ID', (id: string) => {
    sessionStorage.setItem("id", id);
  })
}

export function onUsersModified(callback: Function) {
  socket.on(Events.USERS_MODIFIED, (newUsersList: [User]) => {
    callback(newUsersList);
  });
}

export function onGetAvg(callback: Function) {
  socket.on(Events.GET_AVG, (avg: number) => {
    callback(avg);
  });
}

export function emitAddScore(score: Score) {
  socket.emit(Events.ADD_SCORE, score);
}

export function offUsersModified() {
  socket.off(Events.USERS_MODIFIED);
}

export function offGEtAvg() {
  socket.off(Events.GET_AVG);
}