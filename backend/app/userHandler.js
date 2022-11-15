const {events} = require( "shared/socker");

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
        console.log('users', users);

        io.emit(events.USERS_MODIFIED, users);
        io.emit(events.GET_CONNECTION_ID, socket.id);
    }

    const disconnect = () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit(events.USERS_MODIFIED, users);
    }

    const addScore = ({score, userId}) => {
        const scoreItem = {
            score,
            userId,
        }
        const i = scores.findIndex(item => item.userId === userId);
        if (i > -1) scores[i] = scoreItem;
        else scores.push(scoreItem);
        console.log('scores', scores);

        io.emit(events.USER_VOTED, userId);



    }

    const setUserVoted = (userId) => {
        users.map(user => {
            if (user.id === userId) user.voted = true;
        })
        console.log('users', users);
        io.emit(events.USERS_MODIFIED, users);
    }

    const setAvg = () => {
        let avg = 0;
        if(scores.length === users.length) {
            const numericalScores = scores.filter(item => item.score !== '?')
            avg = numericalScores.reduce((sum, item) => sum + item.score, 0) / numericalScores.length;
            console.log('avg', avg)
            io.emit(events.GET_AVG, avg);
        }
    }

    socket.on(events.JOIN_ROOM, joinRoom)
    socket.on(events.DISCONNECT, disconnect)
    socket.on(events.ADD_SCORE, addScore)
    socket.on(events.USER_VOTED, setUserVoted)
    socket.on(events.SET_AVG, setAvg)
}