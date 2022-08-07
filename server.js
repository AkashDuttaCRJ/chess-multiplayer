const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

// render html
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// socket.io
const activeRooms = [];

io.on('connection', (socket) => {
    
    socket.on('create-room', (roomID) => {
        if (!activeRooms.includes(roomID)) {
            const room = {id: roomID, totalPlayers: 1};
            activeRooms.push(room);
            socket.join(roomID);
        }
    })
    socket.on('join-room', (roomID) => {
        activeRooms.forEach(room => {
            if (room.id === roomID) {
                if (room.totalPlayers < 2) {
                    room.totalPlayers++;
                    socket.join(roomID);
                }
            }
        })
    })
    socket.on('update-gs', ({room, gameState}) => {
        socket.to(room).emit('updated-gs', gameState);
    })
})