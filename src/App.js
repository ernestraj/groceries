import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";

class App extends Component {
	render() {
		const route = this.props.location;
		if (true) {
			return (
				<div id="content">
					<Switch>
						<Route
							path="/register"
							render={(props) => <RegistrationForm {...props} />}
						/>
						<Route path="/login" render={(props) => <Login {...props} />} />
					</Switch>
				</div>
			);
		} else {
			return (
				<div id="content">
					<Switch>
						<Route
							key={route.path}
							exact
							path={route.path}
							render={(props) => <Home route={this.props.links} {...props} />}
						/>
					</Switch>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		links: state.content.menuLinks,
	};
}

export default connect(mapStateToProps, null)(App);
