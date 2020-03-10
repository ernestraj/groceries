import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";

class Home extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="container">
        <Header />
        {pathname === "/search" && <SearchPage />}
      </div>
    );
  }
}

export default Home;
