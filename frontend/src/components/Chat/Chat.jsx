import React, { Component } from "react";
import styled from "styled-components";
import TypeMessage from "./TypeMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { send_message, receive_message } from "../../api";
const URL = "http://localhost:5000";

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
      messages: [],
      currentMessage: ""
    };

    receive_message(newMessage => {
      if (!!newMessage.text_body) {
        //don't show empty messages that seem to pop up
        this.setState({ messages: [...this.state.messages, newMessage] });
      }
    });
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = async () => {
    const messages = await (await fetch(`${URL}/all_messages`, {
      method: "GET", // or 'PUT'
      //body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })).json();

    this.setState({ messages });
  };

  renderMessages = () => {
    return this.state.messages.map(message => {
      return message.sent_from_self == false ? (
        <IncomingMessage message={message} />
      ) : (
        <OutgoingMessage message={message} />
      );
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
          onSend={() => {
            send_message(0, this.state.currentMessage);
            this.setState({ currentMessage: "" });
          }}
        />
      </Container>
    );
  }
}
