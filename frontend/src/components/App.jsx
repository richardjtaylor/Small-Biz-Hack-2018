import React, { Component } from "react";
import { receive_message } from "../api";

// Making the App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    receive_message(message => {
      console.log(message);
      this.setState({ message });
    });
  }

  send = () => {
    console.log("here");
    // socket.emit("ferret", "tobi", data => {
    //   console.log(data); // data will be 'woot'
    // });
  };

  render() {
    return <div>Message: {this.state.message}</div>;
  }
}

export default App;
