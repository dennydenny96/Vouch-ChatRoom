import { authService, roomService, userService } from './services';
// Settings
let chatRoomData = []
let connectedClients = {}

export default async ({ io }) => {

  io.on('connection', (client) => {
    console.log('A client connected');

    //Client Sent a message
    client.on("SendMessage", (messageData) => {
      console.log(messageData)
      // chatRoomData.push(messageData)
      // sendUpdatedChatRoomData(client)
    })

    //Client entered The chat Room
    client.on("UserEnteredRoom", async (userData) => {
      console.log(userData)
      var enteredRoomMessage = { message: `${userData.username} has entered the chat`, username: "", userID: 0, timeStamp: null }
      const { user, token } = await authService.login(userData);

      console.log(user, token);
      // roomService.findRoomByRoomId();

      // chatRoomData.push(enteredRoomMessage)
      // sendUpdatedChatRoomData(client)
      // connectedClients[client.id] = userData

    })

    client.on("CreateUserData", () => {
      let username = "Denny";
      let roomId = 1
      var userData = { roomId: roomId, username: username, userID: 1 }
      client.emit("SetUserData", userData)
    })

    //Whenever someone disconnects this piece of code executed
    client.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });

  return io;
};

//Sending update chat room data to all connected clients
function sendUpdatedChatRoomData(client) {
  client.emit("RetrieveChatRoomData", chatRoomData)
  client.broadcast.emit("RetrieveChatRoomData", chatRoomData)
}
