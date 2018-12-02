import React, { Component } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";
import { Flex, Box } from "@rebass/grid";
import { send_message } from "../../api";
const URL = "http://localhost:5000";

const EstimateContainer = styled.div`
  height: 50vh;
  padding: 0 10px;
`;

const EstimateTableContainer = styled.div`
  height: calc(100% - 65px - 100px);
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
  font-family: "Titillium Web", sans-serif;
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
  min-width: 50px;
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

const AddEstimateButton = styled.button`
  background: ${palette("primary", 0)} none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  width: 33px;
  margin: 10px 0 0 10px;
`;

export class Estimate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineItems: [
        { name: "Labour", quantity: 10, price: 65 },
        { name: "Drywall", quantity: 4, price: 120 }
      ],
      newLineItem: { name: "", quantity: 0, price: 0 }
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

  addToLineItems = () => {
    const { newLineItem, lineItems } = this.state;
    this.setState({
      lineItems: [...lineItems, newLineItem],
      newLineItem: { name: "", quantity: 0, price: 0 }
    });
  };

  renderEstimateAddNewRow = () => {
    const { newLineItem } = this.state;
    return (
      <React.Fragment>
        <EstimateTableRow>
          <EstimateTableCell>
            <EstimateTableInput
              type="text"
              value={newLineItem.name}
              onChange={e =>
                this.setState({
                  newLineItem: { ...newLineItem, name: e.target.value }
                })
              }
            />
          </EstimateTableCell>
          <EstimateTableCell>
            <EstimateTableInput
              type="number"
              value={newLineItem.quantity}
              onChange={e =>
                this.setState({
                  newLineItem: { ...newLineItem, quantity: e.target.value }
                })
              }
            />
          </EstimateTableCell>
          <EstimateTableCell>
            <EstimateTableInput
              type="number"
              value={newLineItem.price}
              onChange={e =>
                this.setState({
                  newLineItem: { ...newLineItem, price: e.target.value }
                })
              }
            />
          </EstimateTableCell>
          <EstimateTableCell>
            ${newLineItem.price * newLineItem.quantity}
          </EstimateTableCell>
        </EstimateTableRow>
        <AddEstimateButton onClick={() => this.addToLineItems()}>
          +
        </AddEstimateButton>
      </React.Fragment>
    );
  };

  sendEstimate = () => {
    const message = this.state.lineItems.reduce(
      (acc, item, i) => {
        return `${item.name} x${item.quantity} @ ${item.price} ea.
        ${acc}
        `;
      },
      `TOTAL: $${this.state.lineItems.reduce((acc, item, i) => {
        return acc + item.price * item.quantity;
      }, 0)}`
    );
    send_message(0, message);
  };

  createQBEstimate = async () => {
    await fetch(`${URL}/create_estimate`, {
      method: "POST", // or 'PUT'
      //body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    });
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
          <Flex flexDirection="column" style={{ width: "100%" }}>
            <Box alignSelf="flex-end">
              <span style={{ fontSize: 28 }}>
                $
                {this.state.lineItems.reduce((acc, item, i) => {
                  return acc + item.price * item.quantity;
                }, 0)}
              </span>
            </Box>
            <Box>
              <Flex justifyContent="space-between">
                <EstimateButton onClick={() => this.sendEstimate()}>
                  {"< Update Neil"}
                </EstimateButton>
                <EstimateButton onClick={() => this.createQBEstimate()}>
                  {"Generate Estimate >"}
                </EstimateButton>
              </Flex>
            </Box>
          </Flex>
        </EstimateFooter>
      </EstimateContainer>
    );
  }
}
