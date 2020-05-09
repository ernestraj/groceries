import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";
import AddGroceryForm from "../AddGroceryForm";
import Dishes from "../Dishes";
import HomePage from "../HomePage";
import "./index.scss";

class Home extends Component {
	render() {
		console.log(this.props);
		const { pathname } = this.props.location;
		return (
			<>
				<Header />
				{pathname === "/" && <HomePage />}
				{pathname === "/search" && <SearchPage />}
				{pathname === "/add-grocery-item" && <AddGroceryForm />}
				{pathname === "/dishes" && <Dishes />}
			</>
		);
	}
}

export default Home;
