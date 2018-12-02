import React, { Component } from "react";
import { receive_message } from "./api";
import { Flex, Box } from "@rebass/grid";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Chat, Suggestions, Estimate } from "./components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    font-family: 'Titillium Web', sans-serif;
  }

  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`;

// Making the App component
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //return <div>Message: {this.state.message}</div>;
    return (
      <ThemeProvider theme={theme}>
        <Box flex="1">
          <GlobalStyle />
          <Flex style={{ height: "100vh" }}>
            <Box width={5 / 8}>
              <Chat />
            </Box>
            <Box width={3 / 8}>
              <Flex flexDirection="column">
                <Box flex="1">
                  <Estimate />
                </Box>
                <Box flex="1">
                  <Suggestions />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
