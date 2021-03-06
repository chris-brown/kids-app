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

    this.state = {
      ...this._init(),
      maxNumber: 10,
      timer: null,
      score: 0,
      started: false,
    };
  }

  componentWillUnmount() {
    this._stop();
  }

  _init = () => {
    const a = getRandomNumber(0, 10);
    const b = getRandomNumber(0, 10);
    return {
      question: { a, b },
      result: addition(a, b),
      answer: '?'
    };
  };

  _tick = () => {
    if (this.state.score <= 0) {
      Alert.alert('You loose', 'Try again?',
        [
          {text: 'OK', onPress: this._stop }
        ]);
      this._stop();
      return;
    }
    this.setState(state => ({
      ...this._init(),
      score: state.score - 1,
      timer: setTimeout(this._tick, 5000)
    }));
  };

  _onSelect = answer => {
    if (answer === this.state.result) {
      clearTimeout(this.state.timer);
      this.setState(state => ({
        ...this._init(),
        score: state.score + 1,
        timer: setTimeout(this._tick, 5000),
        started: true,
      }));
    }
    else {
      this.setState({ answer });
    }
  };

  _stop = () => {
    clearTimeout(this.state.timer);
  };

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
            <View style={styles.button}>
              <Button color="red" onPress={this._stop} title="Stop" />
            </View>
          </View>
        </View>
        <View style={{ ...styles.row, flex: 1, backgroundColor: answer === '?' ? 'skyblue' : 'red' }}>
          <Text style={{ fontSize: 38 }}>{ `${question.a} + ${question.b} = ${answer}` }</Text>
          <Text style={{  }}>Score: { this.state.score }</Text>
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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  button: {
    width: 70,
    height: 50,
    color: 'white',
    margin: 5,
  }
});
