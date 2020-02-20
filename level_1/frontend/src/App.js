import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import {Card} from '@material-ui/core';


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pageSize: 10
    };
  }


  componentDidMount() {
    axios
      .get("http://localhost:8001/")
      .then(res => {
        console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => console.error(err));
  }
  loadFunc =()=>{
    console.log(this.state.pageSize)
    axios
      .get("http://localhost:8001/",{params:{pageSize:this.state.pageSize}})
      .then(res => {
        let p = this.state.pageSize+10
        this.setState({pageSize:p})
        this.setState({ data: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    // var timerID = setInterval(function() {
    //   axios
    //     .get("http://localhost:8001/post")
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => console.error(err));
    // }, 5 * 60 * 1000);
    console.log(this.state.data)
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {this.state.data.map((e, i) => {
            return (
              <div key={i}>
                <Card style={{padding:'10px',marginBottom:'30px', minHeight:'50px', display:'flex'}}>
                  <div className="card-content id">{e.id}</div>
                  <div className="card-content img"><img src={e.logo_url || "https://www.mathunion.org/fileadmin/IMU/Logo/IMU-logo-wt.png"} width="30px"/></div>
                  <div className="card-content name">{e.name}</div>
                  <div className="card-content desc">{e.description}</div>
                  <div className="card-content site"><a href={e.website_url}>website</a></div>
                  <div className="card-content site"><a href={e.blog_url}>blog</a></div>
                  <div className="card-content site"><a href={e.facebook_url}>facebook</a></div>
                  <div className="card-content site"><a href={e.medium_url}>medium</a></div>
                  <div className="card-content site"><a href={e.discord_url}>discord</a></div>
                  <div className="card-content site"><a href={e.github_url}>github</a></div>
                  <div className="card-content site"><a href={e.reddit_url}>reddit</a></div>
                  <div className="card-content site"><a href={e.twitter_url}>twitter</a></div>
                  <div className="card-content site"><a href={e.telegram_url}>telegram</a></div>
                  <div className="card-content site"><a href={e.youtube_url}>youtube</a></div>
                </Card>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
