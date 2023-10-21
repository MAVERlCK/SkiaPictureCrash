import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Crash} from './src/Crash';
import {Canvas} from '@shopify/react-native-skia';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.flex}>
      <Canvas style={[styles.flex, styles.blue]}>
        <Crash />
      </Canvas>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  blue: {
    backgroundColor: 'blue',
  },
});

export default App;
