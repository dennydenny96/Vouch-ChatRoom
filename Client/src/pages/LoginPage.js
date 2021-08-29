import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

//Add socket import here
import { socket } from '../services/socket'

let styles = {
  chatContainer: {
    marginTop: 10
  },
  header: {
    height: "7vh",
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 20,
  },
  usernameText: {
    fontWeight: 'bold',
    marginLeft: 3,
    marginRight: 3,
  },
  chatThread: {
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    height: "90vh",
    overflowY: 'auto',
    width: '45vw',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8
  },
  messageInputSection: {
    backgroundColor: '#F6F6F6',
    marginBottom: '5px',
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  joinButton: {
    backgroundColor: '#5DB075',
    color: '#FFFFFF',
    position: 'absolute',
    bottom: '3%',
    width: '45%',
    borderRadius: '100px'
  },
  messageTextField: {
    flex: 1
  },
  messageSubmitButton: {
    flex: 0
  }

}

const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUsername: "",
      currentUserID: 0,
      currentRoomId: "",
      initialLoad: true,
    };
    //Create Ref for managing "auto-scroll"
    this.messagesEndRef = React.createRef()
  }

  componentDidMount() {

    localStorage.setItem('userID', '1')
    localStorage.setItem('roomId', '1')
    localStorage.setItem('username', 'Denny')
    let userIDVal = localStorage.getItem('userID')
    let roomIdVal = localStorage.getItem('roomId')
    let usernameVal = localStorage.getItem('username')

    //If user does not have a userid and username saved in local storage, create them for them
    if (!userIDVal) {
      socket.on("SetUserData", userData => {
        //When user creation on server is complete, retrieve and save data to local storage
        localStorage.setItem('userID', userData.userID)
        localStorage.setItem('roomId', userData.roomId)
        localStorage.setItem('username', userData.username)
        console.log(userData)

        this.setState({ currentUsername: userData.username, roomId: userData.roomId })

        //Notify Socket server is not ready to chat
        socket.emit("UserEnteredRoom", userData)
      });

      //Send Socket command to create user info for current user
      socket.emit("CreateUserData")

    }
    else {
      //If user already has userid and username, notify server to allow them to join chat
      this.setState({ currentUsername: usernameVal, currentUserID: userIDVal })
      socket.emit("UserEnteredRoom", { roomId: roomIdVal, username: usernameVal })
    }

    socket.on("RetrieveChatRoomData", (chatRoomData) => {
      this.setState({ chatRoomData: chatRoomData }, () => this.shouldScrollToBottom())
    })

  }

  componentWillUnmount() {
    socket.off("RetrieveChatRoomData")
    socket.off("SetUserData")
  }

  setLogin(message) {
    //Set Message being typed in input field
    this.setState({ message: message })
  }

  shouldScrollToBottom() {
    //If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
    if (this.messagesEndRef.current.scrollHeight - this.messagesEndRef.current.scrollTop < this.messagesEndRef.current.offsetHeight + autoScrollOffset) {
      this.scrollToBottom()
    }

    //Navigate to end of chat when entering chat the first time
    if (this.state.initialLoad) {
      this.scrollToBottom()
      this.setState({ initialLoad: false })
    }
  }

  scrollToBottom() {
    //Scrolls user to end of chat message window
    this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight
  }

  render() {

    let { username, roomId } = this.state

    return (
      <Container style={styles.chatContainer}>
        <Container style={styles.chatThread}>
          <Container style={styles.header}>
            <Row style={styles.headerText}>Join Chat Room</Row>
          </Container>

          <Container style={styles.messageInputSection}>
            <TextField
              style={styles.messageTextField}
              id="input-username"
              label="Username"
              variant="outlined"
              value={this.state.username}
            />
          </Container>
          <Container style={styles.messageInputSection}>
            <TextField
              style={styles.messageTextField}
              id="input-roomid"
              label="RoomId"
              variant="outlined"
              pattern="[0-9]*"
              value={this.state.roomId}
            />
          </Container>

          <Button style={styles.joinButton} variant="contained">
            JOIN
          </Button>
        </Container>
      </Container>
    );
  }
}

export default LoginPage;