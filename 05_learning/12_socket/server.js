const express=require('express');
const http=require('http');
const socketIo=require('socket.io');

const app=express();
// hosting frontend
app.use(express.static('public'));
const server= http.createServer(app);

// initiate socket.io and attch this to the http server
const io=socketIo(server);

const users=new Set();

io.on("connection",(socket)=>{
    console.log("A User is now connected");

    // handle users when they will join the chat

    socket.on("join",(userName)=>{
        users.add(userName);

        socket.userName=userName;

        // broadcast to all clients/users that a new user has join

        io.emit('userJoined',userName);

        // send the updated user list to all clients
        io.emit('userList',Array.from(users));
    })



    // handle incoming chat message
    
    socket.on("chatMessage",(message)=>{
        // boradcast the  recived message to all connected client
         io.emit("chatMessage",message)  
    })




    // handle user disconnection
    socket.on("disconnect",()=>{
        console.log("An User is disconneted");
        users.forEach(user=>{
            if(user===socket.userName){
                users.delete(user);

                io.emit('userLeft',user);
                io.emit("userList",Array.from(users));
            }
        })
    })

})


const PORT=process.env.PORT || 4000;
server.listen(PORT,()=>{
    console.log("Server is running on port :",PORT);
})

