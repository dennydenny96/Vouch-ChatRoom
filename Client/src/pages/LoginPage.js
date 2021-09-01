import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

//Add socket import here
import { socket } from '../services/socket'
import { Redirect, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
  LinkJoin: {
    textAlign: 'justify'
  },
  TextField: {
    flex: 1
  }
}

const LoginPage = () => {

  const MySwal = withReactContent(Swal);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [redirect, setRedirect] = useState(``);

  const redirectLink = () => {
    console.log(redirect)
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }

  const joinRoom = () => {
    console.log('memekkkk')

    socket.emit('welcome', { name, room }, (error) => {
      setRedirect(``)
      if (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        })

      } else {
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
        {/* <Link style={styles.LinkJoin} onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chatRoom?name=${name}&room=${room}`}> */}
        {redirectLink()}
        <Button style={styles.joinButton} onClick={() => joinRoom()} variant="contained">
          JOIN
        </Button>
        {/* </Link> */}
      </Container>
    </Container>
  );
}

export default LoginPage;