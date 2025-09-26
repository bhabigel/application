import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Opening = () => (
  <View style={styles.section}>
    <Text style={styles.text}>Opening Section</Text>
  </View>
);

const styles = StyleSheet.create({
  section: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Opening;
