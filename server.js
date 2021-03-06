const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
        
    },
})

const users = {}
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connection', name)

    })
    console.log('lover2')
    // socket.emit('chat-message', 'HELLO')
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name:
            users[socket.id] })
            
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
     
})