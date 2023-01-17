const { SocketEvents } = require('@spg/shared/src');

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
        setUserVoted(userId);
        setAvg();
    }

    const setUserVoted = (userId) => {
        users.map(user => {
            if (user.id === userId) user.voted = true;
        })
        io.emit(SocketEvents.USERS_MODIFIED, users);
    }

    const setAvg = () => {
        let avg = 0;
        if(scores.length === users.length) {
            const numericalScores = scores.filter(item => item.score !== '?')
            avg = numericalScores.reduce((sum, item) => sum + item.score, 0) / numericalScores.length;
            io.emit(SocketEvents.GET_AVG, avg);
        }
    }

    socket.on(SocketEvents.JOIN_ROOM, joinRoom)
    socket.on(SocketEvents.DISCONNECT, disconnect)
    socket.on(SocketEvents.ADD_SCORE, addScore)
}