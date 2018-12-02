import React, { Component } from "react";
import styled from "styled-components";

const SuggestedImageContainer = styled.div`
  max-height: 100%;
`;

const SuggestionHeader = styled.div`
  height: 50px;
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
  flex: 1;
  height: 200px;
  width: 80px;
  margin: 10px;
`;

export class Suggestions extends Component {
  constructor(props) {
    super(props);
  }

  generateSuggestedImageFeed = () => {
    const x = [1, 2, 3, 4, 5, 6];
    return x.map(y => {
      return (
        <SuggestedImageRow>
          <SuggestedImage
            style={{
              background: "url(https://bit.ly/2FRw47x) 50% 50% no-repeat"
            }}
          />
          <SuggestedImage
            style={{
              background: "url(https://bit.ly/2FRw47x) 50% 50% no-repeat"
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
