import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";

class App extends Component {
	render() {
		const route = this.props.location;
		return (
			<Switch>
				<Route
					key={route.path}
					exact
					path={route.path}
					render={(props) => <Home route={this.props.links} {...props} />}
				/>
			</Switch>
		);
	}
}

function mapStateToProps(state) {
	return {
		links: state.content.menuLinks,
	};
}

export default connect(mapStateToProps, null)(App);
