import React, { Component } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

export default class App extends Component {
  render() {
    return [<Header key="0" />, <Body key="1" />];
  }
}
