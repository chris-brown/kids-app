import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ ...styles.row, flex: 4, backgroundColor: 'powderblue' }}>
          <Text style={styles.button}>1</Text>
          <Text style={styles.button}>2</Text>
          <Text style={styles.button}>3</Text>
          <Text style={styles.button}>4</Text>
        </View>
        <View style={{ ...styles.row, flex: 1, backgroundColor: 'skyblue' }}>
          <Text>Yo yo</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    color: 'white',
    margin: 5,
  }
});
