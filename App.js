import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { getRandomNumber } from './games/helpers';
import addition from './games/addition';

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

    //this.state = { question: {}, answer: '?', maxNumber: 10 };
    this.state = {
      ...this._init(),
      maxNumber: 10
    };
  }

  _init = () => {
    const a = getRandomNumber(0, 10);
    const b = getRandomNumber(0, 10);
    return {
      question: { a, b },
      result: addition(a, b),
      answer: '?'
    };
  }

  _onSelect = answer => {
    if (answer === this.state.result) {
      this.setState(this._init());
    }
    else {
      this.setState({ answer });
    }
  }

  render() {
    const { question, answer, maxNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ ...styles.row, flex: 4, backgroundColor: 'powderblue' }}>
          <View style={styles.buttonWrapper}>
            {
              [...Array(maxNumber*2).keys()].map(number =>
                <NumberButton number={(number+1)} key={number} onClick={this._onSelect} />
              )
            }
          </View>
        </View>
        <View style={{ ...styles.row, flex: 1, backgroundColor: 'skyblue' }}>
          <Text style={{ fontSize: 20 }}>{ `${question.a} + ${question.b} = ${answer}` }</Text>
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
