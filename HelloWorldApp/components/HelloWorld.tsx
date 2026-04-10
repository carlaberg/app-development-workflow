import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HelloWorldProps {
  name?: string;
}

export function HelloWorld({ name = 'World' }: HelloWorldProps) {
  return (
    <View style={styles.container} testID="hello-world-container">
      <Text style={styles.text} testID="hello-world-text">
        Hello, {name}! 👋
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
