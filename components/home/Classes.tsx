import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Classes = () => (
	<View style={styles.section}>
		<Text style={styles.text}>Classes Section</Text>
	</View>
);

const styles = StyleSheet.create({
	section: {
		padding: 24,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: '600',
	},
});

export default Classes;
