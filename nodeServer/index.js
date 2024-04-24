const http = require("http");

const server = http.createServer();
const io = require("socket.io")(server, {});
const users = {};

function updateUserCount() {
    io.emit('user-count', Object.keys(users).length);
}

io.on('connection', socket => {

    updateUserCount();

    socket.on('new-user-joined', name => {
        console.log("New user", name);
        users[socket.id] = name;
        updateUserCount();
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('left', users[socket.id]);
            delete users[socket.id];
            updateUserCount();
        }
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
