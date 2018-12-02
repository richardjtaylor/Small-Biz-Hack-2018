import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const ReceivedMessage = styled.div`
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 60%;
`;

const ReceivedMessageParagraph = styled.p`
  background: ${palette("grayscale", 5)} none repeat scroll 0 0;
  border-radius: 3px;
  color: ${palette("grayscale", 2)};
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
`;

const ReceivedMessageImage = styled.div`
  border-radius: 3px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: auto;
  height: 300px;
`;

const MessageTime = styled.span`
  color: ${palette("grayscale", 4)};
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
`;

const IncomingMessage = ({ message }) => {
  const generateBody = () => {
    return message.type === 0 ? (
      <ReceivedMessageParagraph>{message.text}</ReceivedMessageParagraph>
    ) : (
      <ReceivedMessageImage
        style={{ background: "url(https://bit.ly/2FRw47x) 0% 0% no-repeat" }}
      />
    );
  };

  return (
    <div>
      <ReceivedMessage>
        <div>
          {generateBody()}
          <MessageTime> 11:01 AM | Today</MessageTime>
        </div>
      </ReceivedMessage>
    </div>
  );
};

export default IncomingMessage;
