const { SocketEvents } = require('@spg/shared/src');
const { getClosestNumberInScores } = require('./utils/helper.util');

// variables
let users = [];
let scores = [];

module.exports = (io, socket) => {

    const joinRoom = (username) => {
        const user = {
            username,
            id: socket.id,
            voted: false,
        }
        users.push(user);

        io.emit(SocketEvents.USER_JOINED, user);
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    const disconnect = () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    const addScore = ({score, userId}) => {
        setUserVoted(userId, score);
        setAvg();
    }

    const setUserVoted = (userId, score) => {
        users.map(user => {
            if (user.id === userId && !user.voted) {
                scores.push(Number(score));
                user.voted = true;
            };
        })
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    const setAvg = () => {
        let avg = 0;
        if(scores.length === users.length) {
            const numericScores = scores.filter(score => score !== '?');
            avg = numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length;
            const result = getClosestNumberInScores(avg);
            io.emit(SocketEvents.GET_AVG, result);
        }
    }

    socket.on(SocketEvents.JOIN_ROOM, joinRoom);
    socket.on(SocketEvents.DISCONNECT, disconnect);
    socket.on(SocketEvents.ADD_SCORE, addScore);
}