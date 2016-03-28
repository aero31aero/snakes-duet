var socket = io.connect("http://172.16.120.101:3000");
window.onload=function(){
    socket.on("move", function (move) {
        // todo: add the tweet as a DOM node

        console.log("move from: ", move.user);
        console.log("direction:", move.key);
        changeval(move.user,move.key);
    });
    socket.on("newsnake", function (snake) {
        // todo: add the tweet as a DOM node

        console.log("move from: ", move.user);
        console.log("direction:", move.key);
        var snakeid=newsnake();
        socket.emit("snakeid",{"userid":snakeid});
    });
}