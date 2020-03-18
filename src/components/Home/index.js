import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";
import AddGroceryForm from "../AddGroceryForm";

class Home extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="container">
        <Header />
        {pathname === "/search" && <SearchPage />}
        {pathname === "/add-grocery-item" && <AddGroceryForm />}
      </div>
    );
  }
}

export default Home;
