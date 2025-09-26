import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = () => (
  <View style={styles.navbar}>
    <Text style={styles.title}>Navbar</Text>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Navbar;
