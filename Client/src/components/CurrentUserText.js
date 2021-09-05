import React from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
	currentUserTextContainer: {
		marginBottom: 20,
		flex: 0,
		justifyContent: 'flex-end',
		display: 'flex',
		marginLeft: '25%',
	},
	textBubble: {
		padding: 10,
		backgroundColor: '#5DB075',
		justifyContent: 'flex-start',
		flex: 0,
		display: 'flex',
		borderRadius: 8,
		textAlign: 'right',
		color: 'white'
	},
	usernameText: {
		fontSize: 9
	}
}

const CurrentUserText = (props) => {
	const {
		text
	} = props

	return (
		<Row style={styles.currentUserTextContainer}>
			<Container>
				<Row style={styles.textBubble}>
					{text}
				</Row>
			</Container>
		</Row>
	);

}

export default CurrentUserText;