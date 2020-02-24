import React from "react";
import "./App.css";
import Header from "./Header";
import CustomizedTables from "./CustomizedTables";
import { Card } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import _ from "underscore";

const Axios = require("axios");

function App() {
  const [data, setData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortby, setSortby] = React.useState("rank");

  React.useEffect(() => {
    Axios.get("http://localhost:8001/", { params: { pageSize: pageSize } })
      .then(res => {
        console.log(res.data[0]['1d']);
        let p = pageSize + 10;
        setPageSize(p);
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const loadFunc = () => {
    console.log(pageSize);
    Axios.get(`http://localhost:8001/${sortby}`, {
      params: { pageSize: pageSize }
    })
      .then(res => {
        let p = pageSize + 10;
        setPageSize(p);
        setData(res.data);
      })
      .catch(err => console.error(err));
  };

  const dropdown = selected => {
    console.log(selected);
    setSortby(selected);
    let api_call = ["rank", "price", "price_date", "market_cap"];
    if (api_call.includes(selected)) {
      Axios.get(`http://localhost:8001/${selected}`, {
        params: { pageSize: pageSize }
      })
        .then(res => {
          let p = pageSize + 10;
          setPageSize(p);
          setData(res.data);
        })
        .catch(err => console.log(err));
    } else {
      let newList = _.sortBy(data, selected);
      setData(newList);
    }
  };

  const bodyData = () => {
    return data.map((e, i) => {
      return (
        <Card key={i} className="card">
          <div className="card-header">
            <div id="header-1">
              <img src={e.logo_url} alt={e.symbol} width="100px"></img>
              <h3 id="currency">{e.currency}</h3>
              <h5 id="symbol">{e.symbol}</h5>
            </div>
            <div style={{display:"flex"}}>
              <h3>Rank :</h3>
              <h3 id="rank">{e.rank}</h3>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <div id="ml-30">
              <p>price</p>
              <p>price_data</p>
              <p>market_cap</p>
              <p>circulating_supply</p>
              <p>max_supply</p>
              <p>high</p>
              <p>high_timestamp</p>
            </div>
            <div id="ml-30">
              <p> : </p>
              <p> : </p>
              <p> : </p>
              <p> : </p>
              <p> : </p>
              <p> : </p>
              <p> : </p>
            </div>
            <div id="ml-30">
              <p>{e.price || "-"}</p>
              <p>{e.price_data || "-"}</p>
              <p>{e.market_cap || "-"}</p>
              <p>{e.circulating_supply || "-"}</p>
              <p>{e.max_supply || "-"}</p>
              <p>{e.high || "-"}</p>
              <p>{e.high_timestamp || "-"}</p>
            </div>
          </div>
          <CustomizedTables tableData={e}/>
        </Card>
      );
    });
  };


  return (
    <div className="App">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Header dropdown={dropdown} />
        <div className="body">{bodyData()}</div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
