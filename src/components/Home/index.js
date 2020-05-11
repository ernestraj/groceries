import React, { Component } from "react";
import Header from "../Header";
import SearchPage from "../SearchPage";
import AddGroceryForm from "../AddGroceryForm";
import Dishes from "../Dishes";
import HomePage from "../HomePage";
import RegistrationForm from "../RegistrationForm";
import Login from "../Login";
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
		const { pathname } = this.props.location;
		return (
			<>
				<Header routes={this.props.links} />
				{Object.keys(components).map((key, index) => {
					if (key === pathname) {
						const Component = components[key];
						return <Component key={index} />;
					}
				})}
			</>
		);
	}
}

export default Home;
