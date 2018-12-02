import React, { Component } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

const EstimateContainer = styled.div`
  height: 50vh;
`;

const EstimateTableContainer = styled.div`
  height: calc(100% - 65px - 50px);
`;

const EstimateHeader = styled.div`
  height: 50px;
  text-align: center;
  width: 100%;
  padding: 3px;
  font-size: 24px;
`;

const EstimateButton = styled.button`
  background-color: ${palette("primary", 0)};
  border: none;
  color: ${palette("white", 0)};
  padding: 15px 32px;
  flex: 1;
  text-align: center;
  margin: 10px 0;
  text-decoration: none;
  font-size: 16px;
  outline: none;
  cursor: pointer;
`;

const EstimateTable = styled.table`
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const EstimateTableRow = styled.tr`
  border-bottom: 1px solid #f2f2f2;
  text-align: right;
`;

const EstimateTableCell = styled.td`
  font-size: 15px;
`;

const EstimateTableInput = styled.input``;

const EstimateTableHeaderCell = styled.th`
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
  text-transform: uppercase;
`;

const EstimateTableHeader = styled.thead``;

const EstimateFooter = styled.div`
  height: 65px;
  width: 100%;
  display: flex;
`;

export class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineItems: [
        { name: "Labour", quantity: 10, price: 65 },
        { name: "Drywall", quantity: 4, price: 120 }
      ]
    };
  }

  renderEstimateRows = () => {
    return this.state.lineItems.map(item => {
      return (
        <EstimateTableRow>
          <EstimateTableCell>{item.name}</EstimateTableCell>
          <EstimateTableCell>{item.quantity}</EstimateTableCell>
          <EstimateTableCell>${item.price}</EstimateTableCell>
          <EstimateTableCell>${item.price * item.quantity}</EstimateTableCell>
        </EstimateTableRow>
      );
    });
  };

  renderEstimateAddNewRow = () => {
    return (
      <EstimateTableRow>
        <EstimateTableCell>
          <EstimateTableInput type="text" />
        </EstimateTableCell>
        <EstimateTableCell>
          <EstimateTableInput type="number" />
        </EstimateTableCell>
        <EstimateTableCell>
          <EstimateTableInput type="number" />
        </EstimateTableCell>
        <EstimateTableCell>0</EstimateTableCell>
      </EstimateTableRow>
    );
  };

  formatEstimateForText = () => {
    return `
      Wood x3 @ $50 ea.
      Total: $150
    `;
  };

  render() {
    return (
      <EstimateContainer>
        <EstimateHeader>Estimate</EstimateHeader>
        <EstimateTableContainer>
          <EstimateTable>
            <EstimateTableHeader>
              <EstimateTableRow>
                <EstimateTableHeaderCell>Item</EstimateTableHeaderCell>
                <EstimateTableHeaderCell>Quantity</EstimateTableHeaderCell>
                <EstimateTableHeaderCell>Price</EstimateTableHeaderCell>
                <EstimateTableHeaderCell>Total</EstimateTableHeaderCell>
              </EstimateTableRow>
            </EstimateTableHeader>
            {this.renderEstimateRows()}
            {this.renderEstimateAddNewRow()}
          </EstimateTable>
        </EstimateTableContainer>
        <EstimateFooter>
          <EstimateButton>{"< Update Neil"}</EstimateButton>
          <EstimateButton>{"Generate Estimate >"}</EstimateButton>
        </EstimateFooter>
      </EstimateContainer>
    );
  }
}
