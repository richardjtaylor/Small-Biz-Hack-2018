import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid red;
  height: 50vh;
`;

export class Estimate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container>Estimate</Container>;
  }
}
