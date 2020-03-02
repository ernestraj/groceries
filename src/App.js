import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./components/Header";

class App extends Component {
	render() {
		return (
			<div className="conainer">
				<Header />
			</div>
		);
	}
}

export default App;
