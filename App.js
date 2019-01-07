import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

const NumberButton = ({ number, onClick }) => (
  <View style={styles.button}>
    <Button
      onPress={() => onClick(number)}
      title={number.toString()}
    />
  </View>
);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { answer: '?' };
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(answer) {
    this.setState({ answer });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ ...styles.row, flex: 4, backgroundColor: 'powderblue' }}>
          <View style={styles.buttonWrapper}>
            {
              [1,2,3,4,5,6,7,8,9,10].map(number =>
                <NumberButton number={number} key={number} onClick={this._onSelect} />
              )
            }
          </View>
        </View>
        <View style={{ ...styles.row, flex: 1, backgroundColor: 'skyblue' }}>
          <Text style={{ fontSize: 20 }}>5 + 2 = { this.state.answer }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    fontSize: 24,
  },
  row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  button: {
    width: 50,
    height: 50,
    color: 'white',
    margin: 5,
  }
});
