import React, { Component } from "react";
import { receive_message } from "./api";
import Grid from "styled-components-grid";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Chat, Suggestions, Estimate } from "./components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100%;
    font-family: Helvetica;
  }
`;

// Making the App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    receive_message(message => {
      console.log(message);
      this.setState({ message });
    });
  }

  send = () => {
    console.log("here");
    // socket.emit("ferret", "tobi", data => {
    //   console.log(data); // data will be 'woot'
    // });
  };

  render() {
    //return <div>Message: {this.state.message}</div>;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <GlobalStyle />
          <Grid>
            <Grid.Unit size={5 / 8}>
              <Chat />
            </Grid.Unit>
            <Grid.Unit size={3 / 8}>
              <Grid.Unit>
                <Estimate />
              </Grid.Unit>
              <Grid.Unit>
                <Suggestions />
              </Grid.Unit>
            </Grid.Unit>
          </Grid>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
