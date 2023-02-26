const { SocketEvents } = require('@spg/shared/src');
const { getClosestNumberInScores } = require('./utils/helper.util');

// variables
let users = [];
let scores = [];

module.exports = (io, socket) => {
    // socket.join("some room");

    const handleUserLogin = (username) => { // url
        const user = {
            username,
            id: socket.id,
            voted: false,
        }
        users.push(user);

        io.emit(SocketEvents.USER_JOINED, user);
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    const handleUserVote = ({score, userId}) => {
        users.map(user => {
            if (user.id === userId && !user.voted) {
                scores.push(Number(score));
                user.voted = true;
            };
        })
        io.emit(SocketEvents.USERS_MODIFIED, users);
        calcResult();
    }

    const calcResult = () => {
        if(scores.length === users.length) {
            let avg = 0;
            const numericScores = scores.filter(score => score !== '?');
            avg = numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length;
            const result = getClosestNumberInScores(avg);
            io.emit(SocketEvents.GET_AVG, result);
        }
    }

    const handleUserDisconnect = () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    socket.on(SocketEvents.JOIN_ROOM, handleUserLogin);
    socket.on(SocketEvents.DISCONNECT, handleUserDisconnect);
    socket.on(SocketEvents.ADD_SCORE, handleUserVote);
}