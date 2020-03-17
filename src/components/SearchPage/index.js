import React, { Component } from "react";
import { connect } from "react-redux";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";

class SearchPage extends Component {
  render() {
    return (
      <div id="search-page">
        {this.props.search_results.map(item => {
          return (
            <div key={item.field_grocery_aisle} className="search-item">
              <h2>
                <span>{item.field_brand}</span>
              </h2>
              {item.distance && (
                <h3>
                  <label>Distance</label>
                  <span>{item.distance} </span>
                </h3>
              )}
              <h3>
                <label>Aisle</label>
                <span>{item.field_grocery_aisle} </span>
              </h3>
              <p>
                <label>Address</label>
                <span>{item.name} </span>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search_results: state.titles.search_results,
    grocery_item: state.titles.grocery_item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroceryAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
