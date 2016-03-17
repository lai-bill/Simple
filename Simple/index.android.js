/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require("react-native");
var Index = require("./view/Index");
var {
  Component,
  AppRegistry,
  View,
  Text
} = React;

class Simple extends Component {
  render() {
    return (
      <Index />
    );
  }
}


AppRegistry.registerComponent('Simple', () => Simple);
