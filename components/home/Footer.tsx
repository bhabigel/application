import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = () => (
	<View style={styles.footer}>
		<Text style={styles.text}>Footer</Text>
	</View>
);

const styles = StyleSheet.create({
	footer: {
		height: 56,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222',
		marginTop: 24,
	},
	text: {
		color: '#fff',
		fontSize: 16,
	},
});

export default Footer;
