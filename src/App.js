import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Switch>
        {this.props.links.map(route => {
          return (
            <Route
              key={route.path}
              exact
              path={route.path}
              render={props => <Home {...props} />}
            />
          );
        })}
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    links: state.content.menuLinks
  };
}

export default connect(mapStateToProps, null)(App);
