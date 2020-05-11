import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "./components/Home";
import * as RegistrationAction from "./redux/actions/RegistrationAction";

const UserContext = React.createContext("authenticated");

class App extends Component {
	constructor(props) {
		super(props);
		const user_id = localStorage.getItem("USER_ID");
		this.props.actions.getUserInfo(user_id);
	}
	render() {
		var links = [];
		var routes = [];
		if (this.props.user_data !== "undefined") {
			links = this.props.links.authenticated.links;
			routes = this.props.links.authenticated.routes;
		} else {
			links = this.props.links.anonymous.links;
			routes = this.props.links.anonymous.routes;
		}
		const route = this.props.location;
		return (
			<div id="content">
				<Switch>
					<Route
						key={route.path}
						exact
						path={route.path}
						render={(props) => (
							<Home routes={routes} links={links} {...props} />
						)}
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
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegistrationAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
