import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "./components/Home";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import * as RegistrationAction from "./redux/actions/RegistrationAction";

class App extends Component {
	constructor(props) {
		super(props);
		const user_id = localStorage.getItem("USER_ID");
		this.props.actions.getUserInfo(user_id);
	}
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
						<Route component={NoMatch} />
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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegistrationAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
