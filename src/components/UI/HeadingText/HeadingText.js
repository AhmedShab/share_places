import React from 'react'
import { Text } from 'react-native';

const headingText = props => (
	<Text {...props} style={[styles.textHeading, props.style]}>{props.children}</Text>
);

const styles = {
	textHeading: {
		fontSize: 28,
		fontWeight: "bold"
	}
}

export default headingText;
