import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const OutgoingMessageContainer = styled.div`
  overflow: hidden;
  margin: 26px 0 26px;
`;

const SentMessageParagraph = styled.div`
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
`;

const SentMessage = styled.div`
  float: right;
  width: 50%;
`;

const MessageTime = styled.span`
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
`;

const OutgoingMessage = ({ text }) => {
  return (
    <OutgoingMessageContainer>
      <SentMessage>
        <SentMessageParagraph>{text}</SentMessageParagraph>
        <MessageTime> 11:01 AM | June 9</MessageTime>
      </SentMessage>
    </OutgoingMessageContainer>
  );
};

export default OutgoingMessage;
