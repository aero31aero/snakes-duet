var io = require('socket.io')();

io.on("connection", function (socket) {  
    //var move = {user: "username", key: "down"};

    // to make things interesting, have it send every second
    //socket.emit("move", move);
    
    socket.on("disconnect", function () {
        console.log("disconnect");
    });
});

module.exports = io;