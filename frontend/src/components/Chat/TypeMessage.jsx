import React from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const Container = styled.div`
  border-top: 1px solid #c4c4c4;
  position: relative;
  height: 100%;
`;

const InputSendButton = styled.button`
  background: ${palette("black", 0)} none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
`;

const InputMessageWrite = styled.input`
  background: ${palette("white", 0)} none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
`;

const TypeMessage = ({ onSend, onChange, message }) => {
  return (
    <Container>
      <div>
        <InputMessageWrite
          placeholder="Write here fool"
          value={message}
          onChange={e => onChange(e.target.value)}
        />
        <InputSendButton onClick={() => onSend(message)}>S</InputSendButton>
      </div>
    </Container>
  );
};

export default TypeMessage;
