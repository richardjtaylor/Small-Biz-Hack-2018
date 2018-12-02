import React, { Component } from "react";
import styled from "styled-components";
import { send_message } from "../../api";

const SuggestedImageContainer = styled.div`
  max-height: 100%;
`;

const SuggestionHeader = styled.div`
  height: 50px;
  width: auto;
  text-align: center;
  width: 100%;
  padding: 3px;
  font-size: 24px;
`;

const SuggestionImageFeed = styled.div`
  height: calc(50vh - 60px);
  overflow-y: scroll;
`;

const SuggestedImageRow = styled.div`
  padding: 10px 5px;
  display: flex;
`;

const SuggestedImage = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  flex: 1;
  height: 150px;
  width: 80px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  }
`;

export class Suggestions extends Component {
  constructor(props) {
    super(props);
  }

  sendPreviousJob = (url = "https://bit.ly/2FRw47x") => {
    send_message(1, url);
  };

  generateSuggestedImageFeed = () => {
    const x = [1, 2, 3, 4, 5, 6];
    return x.map(y => {
      return (
        <SuggestedImageRow>
          <SuggestedImage
            onClick={() => this.sendPreviousJob()}
            style={{
              backgroundImage: "url(https://bit.ly/2FRw47x)"
            }}
          />
          <SuggestedImage
            onClick={() => this.sendPreviousJob()}
            style={{
              backgroundImage: "url(https://bit.ly/2FRw47x)"
            }}
          />
        </SuggestedImageRow>
      );
    });
  };

  render() {
    return (
      <SuggestedImageContainer>
        <SuggestionHeader>Similar Work You've Done</SuggestionHeader>
        <SuggestionImageFeed>
          {this.generateSuggestedImageFeed()}
        </SuggestionImageFeed>
      </SuggestedImageContainer>
    );
  }
}
