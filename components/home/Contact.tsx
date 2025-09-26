import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Contact = () => (
	<View style={styles.section}>
		<Text style={styles.text}>Contact Section</Text>
	</View>
);

const styles = StyleSheet.create({
	section: {
		padding: 24,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: '600',
	},
});

export default Contact;
