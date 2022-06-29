//stablish the connection between the client and server
//it defaults to trying to connect to the host that serves the page.
// var socket = io();

//connect to 
var socket = io.connect('http://localhost:3000');

//query dom
var handle = document.getElementById('handle'),
    message = document.getElementById('msg'),
    btn = document.getElementById('btn'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit event
btn.addEventListener('click', ()=>{
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    })
})


message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value)
})

//listen on event
socket.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += `<p class='message'><strong>${data.handle}:</strong>${data.message}</p>`;
})


socket.on('typing', (data)=>{
    feedback.innerHTML = `<span class='meta'>${data} is typing now... </span>`;
})


