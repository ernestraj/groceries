import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "./components/Home";
import * as RegistrationAction from "./redux/actions/RegistrationAction";

var user_id = null;

class App extends Component {
	constructor(props) {
		super(props);
		user_id = localStorage.getItem("USER_ID");
		user_id && this.props.actions.getUserInfo(user_id);
	}

	render() {
		var links = [];
		if (
			this.props.progress != null &&
			!this.props.progress &&
			!this.props.error
		) {
			links = this.props.links.authenticated.links;
		} else {
			links = this.props.links.anonymous.links;
		}
		const route = this.props.location;
		return (
			<div id="main">
				<Switch>
					<Route
						key={route.path}
						exact
						path={route.path}
						render={(props) => <Home links={links} {...props} />}
					/>
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		links: state.content.menuLinks,
		user_data: state.register.user_data,
		error: state.register.error,
		progress: state.register.progress,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegistrationAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
