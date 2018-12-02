import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const ReceivedMessage = styled.div`
  display: inline-block;
  padding: 0 0 25px 10px;
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
  height: 200px;
  background-repeat: no-repeat;
  background-size: contain;
`;

const MessageTime = styled.span`
  color: ${palette("grayscale", 4)};
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
`;

const ImageLabel = styled.span`
  color: ${palette("grayscale", 3)};
  border-bottom: ${palette("grayscale", 3)} 1px solid;
  font-size: 12px;
  margin: 8px 0 0;
  padding: 0 5px;
  display: "inline-block";
`;

const IncomingMessage = ({ message }) => {
  const generateBody = () => {
    return message.type === 0 ? (
      <div>
        <ReceivedMessageParagraph>{message.text_body}</ReceivedMessageParagraph>
        <MessageTime> 11:01 AM | Today</MessageTime>
      </div>
    ) : (
      <div>
        <ReceivedMessageImage
          style={{ backgroundImage: `url(${message.text_body})` }}
        />
        <div style={{ width: "60%" }}>
          {message.image_tags.map(tag => (
            <ImageLabel>{tag.name}</ImageLabel>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ReceivedMessage>{generateBody()}</ReceivedMessage>
    </div>
  );
};

export default IncomingMessage;
