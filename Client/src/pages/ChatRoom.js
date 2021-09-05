import React, { useEffect, useState, useRef } from 'react';
import queryString from 'qs';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import CurrentUserText from '../components/CurrentUserText'
import OtherUserText from '../components/OtherUserText'
import ChatNotification from '../components/ChatNotification'
import ChatNotificationAdmin from '../components/ChatNotificationAdmin'

import config from '../config/index';

//Add socket import here
import { socket } from '../services/socket'

let styles = {
	chatRoomContainer: {
		marginTop: 10,
		minWidth: '375px'
	},
	header: {
		height: "10vh",
		backgroundColor: '#5DB075',
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
		height: "73vh",
		overflowY: 'auto',
		alignSelf: 'center',
		padding: 20,
		paddingBottom: 10,
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
	},
	exitRow: {
		flex: 0,
		justifyContent: 'flex-start',
		display: 'flex',
		position: 'absolute',
		margin: '3vh'
	},
	exitLink: {
		color: "red"
	}
}

const ENDPOINT = config.server_node.url;

const ChatRoom = () => {
	const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [roomObjId, setRoomObjId] = useState(localStorage.getItem('roomId'));
	const [users, setUsers] = useState('');
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);
	const [initialLoad, setInitialLoad] = useState(true);
	const messagesEndRef = useRef(null);

	const [state, setState] = useState("loading (4 sec)...");
	useEffect(() => {
		let isMounted = true;
		// simulate some Web API fetching
		const fetchData = () => {
			setTimeout(() => {
				if (isMounted) setState("data fetched")
			}, 4000);
		}

		fetchData();
		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		const { name, room } = queryString.parse(window.location.search.replace("?", ""));
		const roomId = localStorage.getItem('roomId');
		setRoom(room);
		setName(name);

		socket.emit('join', { name, room, roomId }, () => {

		});
	}, [ENDPOINT, window.location.search.replace("?", "")])

	useEffect(() => {
		socket.on('message', message => {
			setMessages(messages => [...messages, message])
			shouldScrollToBottom();
		})

		socket.on("roomData", ({ users, messages }) => {
			if (messages) setMessages(messages.messages)
			setUsers(users);
			localStorage.removeItem('roomId');
			shouldScrollToBottom();
		});
	}, []);

	const sendMessage = (event) => {
		if (text) {
			socket.emit('sendMessage', { text, name, room, roomObjId }, () => setText(''));
		}
	}

	const disconnect = () => {
		socket.disconnect();
	}

	const shouldScrollToBottom = () => {
		if (messagesEndRef.current !== null) {
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
	}

	const scrollToBottom = () => {
		//Scrolls user to end of chat message window
		messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
	}

	return (
		<Container style={styles.chatRoomContainer}>
			<Container style={styles.header}>
				<Row style={styles.exitRow}>
					<Link style={styles.exitLink} onClick={() => disconnect()} to={`/`}>
						Exit
					</Link>
				</Row>
				<Row style={styles.headerText}>Chat Room</Row>
				<Row style={styles.youAppearAsText}>
					<div style={styles.usernameText}> {room}</div>
				</Row>
			</Container>


			<Container style={styles.chatThread} ref={messagesEndRef}>
				{
					messages.map((messageData, index) => {
						if (messageData.name === name) {
							return <CurrentUserText key={index} username={messageData.name} text={messageData.text} />
						} else if (messageData.name.toLowerCase() === 'admin') {
							return <ChatNotificationAdmin key={index} username={messageData.name} text={messageData.text} />
						}
						else if (messageData.name === '') {
							return <ChatNotification key={index} username={messageData.name} text={messageData.text} />
						} else {
							return <OtherUserText key={index} username={messageData.name} text={messageData.text} />
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
					value={text}
					onChange={(event) => setText(event.target.value)}
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