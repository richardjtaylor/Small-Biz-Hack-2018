import React, { Component } from "react";
import styled from "styled-components";
import TypeMessage from "./TypeMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { send_message, receive_message } from "../../api";

const Title = styled.div`
  height: 50px;
  text-align: center;
  width: 100%;
  padding: 3px;
  font-size: 24px;
`;

const Container = styled.div`
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: scroll;
  max-height: 100vh;
  position: relative;
`;

const Messages = styled.div`
  overflow-y: scroll;
  padding: 0 20px;
  height: calc(100vh - 49px - 53px);
`;

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ text: "hahah", type: 0 }, { url: "", type: 1 }],
      currentMessage: ""
    };

    receive_message(newMessage => {
      console.log("NEW: ", newMessage);
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }

  renderMessages = () => {
    return this.state.messages.map(message => {
      console.log("here:");
      return <IncomingMessage message={message} />;
    });
  };

  render() {
    return (
      <Container>
        <Title>Neil Armstrong - Deck Quote</Title>
        <Messages>{this.renderMessages()}</Messages>
        <TypeMessage
          message={this.state.currentMessage}
          onChange={m => this.setState({ currentMessage: m })}
          onSend={message => send_message(message)}
        />
      </Container>
    );
  }
}
