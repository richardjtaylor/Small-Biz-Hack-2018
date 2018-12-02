import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const Container = styled.div`
  border-top: 1px solid #c4c4c4;
  position: relative;
  padding: 0 10px;
`;

const InputSendButton = styled.button`
  background: ${palette("primary", 0)} none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 5px;
  top: 7px;
  width: 33px;
`;

const InputMessageWrite = styled.input`
  background: ${palette("white", 0)} none repeat scroll 0 0;
  border: medium none;
  color: ${palette("grayscale", 2)};
  outline: none;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
`;

const TypeMessage = ({ onSend, onChange, message }) => {
  const onKeyPress = e => {
    if (e.key == "Enter") {
      onSend();
    }
  };

  return (
    <Container>
      <div>
        <InputMessageWrite
          placeholder="Ask Neil about his project"
          value={message}
          onChange={e => onChange(e.target.value)}
          onKeyPress={e => onKeyPress(e)}
        />
        <InputSendButton onClick={() => onSend()}>></InputSendButton>
      </div>
    </Container>
  );
};

export default TypeMessage;
