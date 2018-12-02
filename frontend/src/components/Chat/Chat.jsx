import React, { Component } from "react";
import styled from "styled-components";
import TypeMessage from "./TypeMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { send_message, receive_message } from "../../api";

const Container = styled.div`
  border: 1px solid red;
  height: 100vh;
`;

const MessagesContainer = styled.div`
  border: 1px solid blue;
  height: 90vh;
`;

const MessageHistory = styled.div`
  overflow-y: auto;
  width: 100%;
`;

const Messages = styled.div`
  float: left;
  padding: 30px 15px 0 25px;
`;

const NewMessage = styled.div`
  border: 1px solid green;
  height: 10vh;
`;

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ text: "hahah" }],
      currentMessage: ""
    };

    receive_message(newMessage => {
      console.log("NEW: ", newMessage);
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }

  renderMessages = () => {
    return this.state.messages.map(message => {
      return <IncomingMessage text={message.text} />;
    });
  };

  render() {
    return (
      <Container>
        <MessagesContainer>
          <Messages>
            <MessageHistory>{this.renderMessages()}</MessageHistory>
          </Messages>
        </MessagesContainer>
        <NewMessage>
          <TypeMessage
            message={this.state.currentMessage}
            onChange={m => this.setState({ currentMessage: m })}
            onSend={message => send_message(message)}
          />
        </NewMessage>
      </Container>
    );
  }
}
