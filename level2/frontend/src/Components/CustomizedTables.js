import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  NativeSelect
} from "@material-ui/core";
import "./App.css";

export class CustomizedTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      status: "1d"
    };
  }

  componentDidMount() {
    if (typeof this.props.tableData[this.state.status] === "object") {
      console.log(this.state.status);
      this.setState({ data: this.props.tableData[this.state.status] });
    }
  }
  selectHandler = e => {
    this.setState({ status: e.target.value });
    this.setState({ data: this.props.tableData[e.target.value] });
  };

  dropdown = () => {
    return (
      <Button style={{ background: "aliceblue" }}>
        <NativeSelect
          disableUnderline
          onChange={this.selectHandler}
          value={this.status}
          style={{ width: "170px", color: "red", fontWeight: "bold" }}
        >
          <option value="1d">1d</option>
          <option value="7d">7d</option>
          <option value="30d">30d</option>
          <option value="365d">365d</option>
        </NativeSelect>
      </Button>
    );
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            style={{ background: "black", color: "white" }}
            title="get details on different date"
            action={this.dropdown()}
          />
          <CardContent style={{}}>
            <div className="table-row">
              <h4>price_change</h4>
              <p>{this.state.data.price_change}</p>
            </div>
            <hr />
            <div className="table-row">
              <h4>price_change_pct</h4>
              <p>{this.state.data.price_change_pct}</p>
            </div>
            <hr />
            <div className="table-row">
              <h4>volume-</h4>
              <p>{this.state.data.volume}-</p>
            </div>
            <hr />
            <div className="table-row">
              <h4>volume_change-</h4>
              <p>{this.state.data.volume_change}-</p>
            </div>
            <hr />
            <div className="table-row">
              <h4>market_cap_change</h4>
              <p>{this.state.data.market_cap_change}</p>
            </div>
            <hr />
            <div className="table-row">
              <h4>market_cap_change_pct-</h4>
              <p>{this.state.data.market_cap_change_pct}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CustomizedTables;
