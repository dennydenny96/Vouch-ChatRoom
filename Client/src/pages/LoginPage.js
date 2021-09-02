import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

//Add socket import here
import { socket } from '../services/socket'
import { Redirect, Link } from 'react-router-dom';

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
  InputSection: {
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
  TextField: {
    flex: 1
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentUserID: 0,
      roomId: "",
      initialLoad: true,
      redirect: null
    };
    //Create Ref for managing "auto-scroll"
    this.messagesEndRef = React.createRef()
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    socket.off("RetrieveChatRoomData")
    socket.off("SetUserData")
  }

  setUsername(username) {
    this.setState({ username: username })
  }

  setRoom(roomId) {
    this.setState({ roomId: roomId })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
  }

  enterRoom() {
    socket.emit("UserEnteredRoom", this.state)
    socket.on("Authorized", (data) => {
      console.log(data)
      this.setState({ redirect: '/chatRoom' })
    })
  }

  render() {
    return (
      <Container style={styles.chatContainer}>
        <Container style={styles.chatThread}>
          <Container style={styles.header}>
            <Row style={styles.headerText}>Join Chat Room</Row>
          </Container>

          <Container style={styles.InputSection}>
            <TextField
              style={styles.TextField}
              id="input-username"
              label="Username"
              variant="outlined"
              value={this.state.inputUsername}
              onChange={(event) => this.setUsername(event.target.value)}
            />
          </Container>
          <Container style={styles.InputSection}>
            <TextField
              style={styles.TextField}
              id="input-roomid"
              label="RoomId"
              variant="outlined"
              pattern="[0-9]*"
              value={this.state.inputRoomId}
              onChange={(event) => this.setRoom(event.target.value)}
            />
          </Container>
          
          {this.renderRedirect()}
          <Button style={styles.joinButton} variant="contained" onClick={() => this.enterRoom()}>
              JOIN
          </Button>
        </Container>
      </Container>
    );
  }
}

export default LoginPage;