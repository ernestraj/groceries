import React, { Component } from "react";
import { connect } from "react-redux";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.grocery_item);
  }

  render() {
    console.log(this.props.location);
    return <div id="search-page"></div>;
  }
}

function mapStateToProps(state) {
  return {
    search_results: state.titles.search_results,
    location: state.router.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroceryAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
