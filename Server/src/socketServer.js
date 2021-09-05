import { authService, roomService, userService, chatRoomService } from './services';

export default async ({ io }) => {
  io.on('connection', (client) => {
    console.log('A client connected');

    //Client entered The chat Room
    client.on('welcome', async ({ name, room }, callback) => {
      const { error, roomCollection } = await chatRoomService.addUser({ id: client.id, name, room });

      if (error) return callback({ error, roomId: null });
      client.join(roomCollection.room);
      callback({ error: null, roomId: roomCollection._id });
    });

    //Client in Chat Room
    client.on('join', async ({ name, room, roomId }, callback) => {
      io.to(room).emit('roomData', {
        room: room,
        users: await chatRoomService.getUsersInRoom(room),
        messages: await chatRoomService.getMessagesInRoom(roomId)
      });
      client.broadcast.to(room).emit('message', { name: 'admin', text: `${name} has joined!` });
      
      callback();
    });

    //Client send message to in Chat Room
    client.on('sendMessage', ({ name, text, room, roomObjId }, callback) => {
      chatRoomService.sendMessageInRoom({ name, text, roomObjId })
      io.to(room).emit('message', { name, text });
      callback();
    });

    //Whenever someone disconnects this piece of code executed
    client.on('disconnect', async (reconnect) => {
      console.log('A user disconnected');
      const user = await chatRoomService.removeUser(client.id);
      if (user) {
        io.to(user.room).emit('message', { name: 'admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: await chatRoomService.getUsersInRoom(user.room) });
      }
    });
  });

  return io;
};
