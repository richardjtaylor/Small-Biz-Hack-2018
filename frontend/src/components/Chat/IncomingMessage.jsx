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
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
`;

const MessageTime = styled.span`
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
`;

const IncomingMessage = ({ text }) => {
  return (
    <div>
      <ReceivedMessage>
        <div>
          <ReceivedMessageParagraph>{text}</ReceivedMessageParagraph>
          <MessageTime> 11:01 AM | Today</MessageTime>
        </div>
      </ReceivedMessage>
    </div>
  );
};

export default IncomingMessage;
