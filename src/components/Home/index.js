import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";
import AddGroceryForm from "../AddGroceryForm";
import Dishes from "../Dishes";
import HomePage from "../HomePage";
import RegistrationForm from "../RegistrationForm";
import Login from "../Login";
import { connect } from "react-redux";
import NoMatch from "../NoMatch";
import "./index.scss";

const components = {
	"/search": SearchPage,
	"/add-grocery-item": AddGroceryForm,
	"/dishes": Dishes,
	"/": HomePage,
	"/login": Login,
	"/register": RegistrationForm,
};

class Home extends Component {
	render() {
		const userState = this.props.authenticated;
		const { pathname } = this.props.location;
		var Component = null;
		const componentExists = this.props.menulinks[userState].routes.find(
			(element) => {
				if (element == pathname) {
					return true;
				} else {
					return false;
				}
			}
		);
		if (componentExists) Component = components[pathname];
		else Component = NoMatch;
		return (
			<>
				<Header routes={this.props.links} />
				<Component />
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		menulinks: state.content.menuLinks,
		authenticated: state.register.authenticated,
	};
}

export default connect(mapStateToProps)(Home);
