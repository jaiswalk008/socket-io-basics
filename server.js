const app = require('express')();
const http = require('http');
const Server = require('socket.io');


const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on('send-message',(message,room)=>{
    //server listens to send-message event and then sends message to all the clients
    //io.emit will send message to all the clients including the client which has send the message

    // io.emit('recieve-message',message);
    //socket.broadcast sends message to all the clients except the client which made the request
    if(room==="") socket.broadcast.emit("recieve-message",message);
    //the below message will be sent to the particular and room value is sid
    else socket.to(room).emit("recieve-message",message);
    console.log(message);
    
  });
  socket.on('join-room',(room,cb) =>{
    // console.log(room);
    socket.join(room);
    cb('joined '+room); 
  })
});

server.listen(3000);