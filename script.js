const socket = io('http://localhost:3000/');
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('form')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input');
const roombtn = document.getElementById('room-button');

socket.on('connect',() =>{
  displayMessage('you connected with id:'+socket.id);
})
socket.on('recieve-message',message =>{
  displayMessage(message);
})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value;
  if(message==="" ) return;
  displayMessage(message);
  //we will create a send-message event wheneve a user sends a message and then the server will
  //listen to the event sedn-message
  // socket.emit('send-message',message);
  socket.emit('send-message',message,room);
  messageInput.value="";
  
  
})

function displayMessage(message){
  const div= document.createElement('div');
  div.innerText=message;
  messageContainer.appendChild(div);
}
roombtn.addEventListener('click', () =>{
  const room = roomInput.value;
  socket.emit('join-room',room,message =>{
    displayMessage(message);
  });
})