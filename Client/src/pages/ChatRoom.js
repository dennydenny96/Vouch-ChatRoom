import React, { useEffect, useState, Component, useRef } from 'react';
import queryString from 'qs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

import CurrentUserText from '../components/CurrentUserText'
import OtherUserText from '../components/OtherUserText'
import ChatNotification from '../components/ChatNotification'

import config from '../config/index';
import 'dotenv';
//Add socket import here
import { socket } from '../services/socket'

let styles = {
	chatRoomContainer: {
		marginTop: 10,
	},
	header: {
		height: "7vh",
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
	},
	youAppearAsText: {
		fontSize: 14,
		marginTop: 5,
		display: 'flex',
		flexDirection: 'row',
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
		height: "75vh",
		overflowY: 'auto',
		width: '45vw',
		alignSelf: 'center',
		padding: 20,
		paddingBottom: 40,
		border: '1px solid rgba(0, 0, 0, 0.2)',
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		marginBottom: 8
	},
	messageInputSection: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	messageTextField: {
		flex: 1
	},
	messageSubmitButton: {
		flex: 0
	}

}
const ENDPOINT = config.server_node.url;
const ChatRoom = () => {
	const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [initialLoad, setInitialLoad] = useState(true);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		const { name, room } = queryString.parse(window.location.search.replace("?", ""));
		setRoom(room);
		setName(name);
		socket.emit('join', { name, room }, () => {
			
		});
	}, [ENDPOINT, window.location.search.replace("?", "")])

	useEffect(() => {
		socket.on('message', message => {
			setMessages(messages => [...messages, message])
			shouldScrollToBottom();
		})

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	}

	const shouldScrollToBottom = () => {
		//If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (messagesEndRef.current.scrollHeight - messagesEndRef.current.scrollTop < messagesEndRef.current.offsetHeight + autoScrollOffset) {
			scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if (initialLoad) {
			scrollToBottom()
			setInitialLoad(false);
		}
	}

	const scrollToBottom = () => {
		//Scrolls user to end of chat message window
		messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
	}

	return (
		<Container style={styles.chatRoomContainer}>

			<Container style={styles.header}>
				<Row style={styles.headerText}>Chat Room</Row>
				<Row style={styles.youAppearAsText}>
					<div style={styles.usernameText}> {room}</div>
				</Row>
			</Container>


			<Container style={styles.chatThread} ref={messagesEndRef}>
				{
					messages.map((messageData, index) => {
						if (messageData.user == name) {
							return <CurrentUserText key={index} username={messageData.user} message={messageData.text} />
						} else if (messageData.user == '') {
							return <ChatNotification key={index} username={messageData.user} message={messageData.text} />
						} else {
							return <OtherUserText key={index} username={messageData.user} message={messageData.text} />
						}
					})
				}
			</Container>

			<Container style={styles.messageInputSection}>
				<TextField
					style={styles.messageTextField}
					id="input-with-icon-adornment"
					label="Enter Message"
					variant="outlined"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					onKeyPress={(event) => {
						if (event.key === 'Enter') {
							sendMessage();
						}
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => sendMessage()}>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
			</Container>

		</Container>
	);
}

export default ChatRoom;