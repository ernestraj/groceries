import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";
import AddGroceryForm from "../AddGroceryForm";
import RegistrationForm from "../RegistrationForm";
import Login from "../Login";
import Dishes from "../Dishes";

class Home extends Component {
	render() {
		const { pathname } = this.props.location;
		return (
			<div className="container">
				<Header />
				{pathname === "/search" && <SearchPage />}
				{pathname === "/add-grocery-item" && <AddGroceryForm />}
				{pathname === "/register" && <RegistrationForm />}
				{pathname === "/login" && <Login />}
				{pathname === "/dishes" && <Dishes />}
			</div>
		);
	}
}

export default Home;
