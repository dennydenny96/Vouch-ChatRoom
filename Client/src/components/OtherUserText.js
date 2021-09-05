import React from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
	userTextContainer: {
		marginBottom: 20,
		marginRight: '25%',
		flex: 0,
		justifyContent: 'flex-start',
		display: 'flex',
	},
	textBubble: {
		padding: 10,
		backgroundColor: '#E6E6E6',
		justifyContent: 'flex-start',
		flex: 0,
		display: 'flex',
		textAlign: 'left',
		borderRadius: 8,
		color: 'black'
	},
	usernameText: {
		fontSize: 12,
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: 3,
	}
}

const OtherUserText = (props) => {
	const {
		username,
		text
	} = props

	return (
		<Row style={styles.userTextContainer}>
			<Container>
				<Row style={styles.usernameText}>
					{username}
				</Row>
				<Row style={styles.textBubble}>
					{text}
				</Row>
			</Container>
		</Row>
	)
}

export default OtherUserText;