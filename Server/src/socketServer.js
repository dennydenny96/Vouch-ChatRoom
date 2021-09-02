import { authService, roomService, userService } from './services';

// Settings
let chatRoomData = []
let connectedClients = {}

export default async ({ io }) => {
  io.on('connection', (client) => {
    console.log('A client connected');

    //Whenever someone disconnects this piece of code executed
    client.on('disconnect', function () {
      console.log('A user disconnected');
      const user = userService.removeUser(client.id);
      
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: userService.getUsersInRoom(user.room)});
      }
    });
    
    //Client entered The chat Room
    client.on('welcome', ({ name, room }, callback) => {
      const { error, user } = userService.addUser({ id: client.id, name, room });

      if(error) return callback(error);
  
      client.join(user.room);
  
      callback();
    });

    client.on('join', ({ name, room }, callback) => {
      client.emit('message', { user: 'admin', text: `${name}, welcome to room ${room}.`});
      client.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });
  
      io.to(room).emit('roomData', { room: room, users: userService.getUsersInRoom(room) });
      
      callback();
    });
  
    client.on('sendMessage', (message, callback) => {
      const user = userService.getUser(client.id);
      
      io.to(user.room).emit('message', { user: user.name, text: message });
      callback();
    });

  });

  return io;
};
