const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server);


io.on('connection', socket => {
    console.log('connectiosn') 
    socket.on('message',({name,message})=>{
        console.log('hey',message)        
        io.emit('message', {name,message})
    })   
    
 });

 

server.listen(3001, ()=>{
   console.log('serving on 3001')      
});