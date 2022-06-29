const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();
const path = require('path');       
const socket = require('socket.io');


//setup server 
const port = process.env.PORT || 3000;
const app = express();
//create a server and store it in this var
const server = app.listen(port, ()=> console.log(`server is running on port: ${port}`));


//set public folder as our static folder <<serve it to the browser>>
app.use(express.static(path.join(__dirname, 'public')));  


//setup socket for the server
const io = socket(server);   //what server we want to work with

//it will waiting for a client to make a connection with our server
//then setup a websocket between the two

//run when client connect  
//socket == is the created socket between a particular client and the server
io.on('connection', socket => {
    console.log('new ws connection', socket.id);

    //listen on msg sent by the client to server

    socket.on('chat', (data)=>{        
        //send data to all sockets
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data)=>{
        //send data to all sockets except the sender 
        socket.broadcast.emit('typing', data);
    })
})


