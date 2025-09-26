import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Starting = () => (
  <View style={styles.section}>
    <Text style={styles.text}>Starting Section</Text>
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

export default Starting;
