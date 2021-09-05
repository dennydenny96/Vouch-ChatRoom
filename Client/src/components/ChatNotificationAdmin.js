import React from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
	currentUserTextContainer: {
		marginBottom: 10,
		flex: 0,
		justifyContent: 'center',
		display: 'flex',
	},
	textBubble: {
		padding: 10,
		backgroundColor: '#00FFA2',
		justifyContent: 'center',
		flex: 0,
		display: 'flex',
		borderRadius: 8,
		fontSize: 14,
		color: 'black'
	},
	usernameText: {
		fontSize: 9
	}
}

const ChatNotificationAdmin = (props) => {
	const {
		username,
		text
	} = props

	return (
		<Row style={styles.currentUserTextContainer}>
			<Container>
				<Row style={styles.usernameText}>
					{username.toUpperCase()}
				</Row>
				<Row style={styles.textBubble}>
					{text}
				</Row>
			</Container>
		</Row>
	);
}

export default ChatNotificationAdmin;