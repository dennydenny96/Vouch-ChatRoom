import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Row, Container } from 'react-bootstrap';

//Add socket import here
import { socket } from '../services/socket'
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

let styles = {
  chatContainer: {
    marginTop: 10,
    minWidth: '375px'
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
    backgroundColor: 'rgba(227, 227, 227, 0.2)',
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    height: "90vh",
    overflowY: 'auto',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 20,
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
    borderRadius: '100px',
    width: '100%',
  },
  containerThread: {
    height: '70vh'
  },
  containerJoin: {
    bottom: '5vh'
  },
  LinkJoin: {
    textAlign: 'justify'
  },
  TextField: {
    flex: 1
  }
}

const LoginPage = () => {
  socket.connect();
  const MySwal = withReactContent(Swal);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [redirect, setRedirect] = useState(``);

  const redirectLink = () => {
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }

  const joinRoom = () => {
    socket.emit('welcome', { name, room }, (response) => {
      setRedirect(``)
      if (response.error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.error
        })

      } else {
        localStorage.setItem('roomId', response.roomId);
        setRedirect(`/chatRoom?name=${name}&room=${room}`)
      }
    });
  }

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
            onChange={(event) => setName(event.target.value)}
          />
        </Container>
        <Container style={styles.InputSection}>
          <TextField
            style={styles.TextField}
            id="input-roomid"
            label="RoomId"
            variant="outlined"
            pattern="[0-9]*"
            onChange={(event) => setRoom(event.target.value)}
          />
        </Container>
        <Container style={styles.containerThread}>

        </Container>
        <Container style={styles.containerJoin}>
          <Row>
            {/* <Link style={styles.LinkJoin} onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatRoom?name=${name}&room=${room}`}> */}
            {redirectLink()}
            <Button style={styles.joinButton} onClick={() => joinRoom()} variant="contained">
              JOIN
            </Button>
            {/* </Link> */}
          </Row>
        </Container>
      </Container>
    </Container>
  );
}

export default LoginPage;