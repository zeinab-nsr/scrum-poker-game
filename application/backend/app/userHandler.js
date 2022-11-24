const { SockerEvents } = require( '@spg/shared/src' );

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

        io.emit(SockerEvents.USERS_MODIFIED, users);
    }

    const disconnect = () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit(SockerEvents.USERS_MODIFIED, users);
    }

    const addScore = ({score, username}) => {
        const scoreItem = {
            score,
            username,
        }
        const i = scores.findIndex(item => item.username === username);
        if (i > -1) scores[i] = scoreItem;
        else scores.push(scoreItem);
        console.log('scores', scores);

        setUserVoted( username );
        setAvg();
    }

    const setUserVoted = (username) => {
        users.map(user => {
            if (user.username === username) user.voted = true;
        })
        console.log('users', users);
        io.emit(SockerEvents.USERS_MODIFIED, users);
    }

    const setAvg = () => {
        let avg = 0;
        if(scores.length === users.length) {
            const numericalScores = scores.filter(item => item.score !== '?')
            avg = numericalScores.reduce((sum, item) => sum + item.score, 0) / numericalScores.length;
            console.log('avg', avg)
            io.emit(SockerEvents.GET_AVG, avg);
        }
    }

    socket.on(SockerEvents.JOIN_ROOM, joinRoom)
    socket.on(SockerEvents.DISCONNECT, disconnect)
    socket.on(SockerEvents.ADD_SCORE, addScore)
}