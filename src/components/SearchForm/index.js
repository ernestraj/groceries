import React, { Component } from "react";
import AutoComplete from "react-autocomplete";
import { connect } from "react-redux";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.props.actions.loadGroceries();
  }

  state = {
    value: this.props.grocery_item ? this.props.grocery_item.title : "",
    redirect: false
  };
  onChange = e => {
    this.setState({ value: e.target.value });
    this.props.actions.loadGroceries(this.state.value);
  };
  onSelect = value => {
    this.setState({ value: value });
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const element = this.props.titles.find(function(element) {
      if (element.title === this.state.value) {
        return element;
      }
    }, this);
    this.props.actions.saveGroceryItemQuery(element);
    this.setRedirect();
  };
  renderRedirect = searched_item => {
    if (this.state.redirect) {
      return (
        <Redirect push to={{ pathname: "/search", state: { searched_item } }} />
      );
    }
  };
  render() {
    const { value } = this.state;
    return (
      <div id="search-form">
        {this.renderRedirect(this.props.grocery_item)}
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
          <AutoComplete
            getItemValue={item => item.title}
            items={this.props.titles}
            renderItem={(item, isHighlighted) => (
              <div
                key={item.nid}
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.title}
              </div>
            )}
            value={value}
            onChange={this.onChange}
            onSelect={this.onSelect}
            placeholder="Search"
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.titles.fetching,
    error: state.titles.error,
    titles: state.titles.titles,
    grocery_item: state.titles.grocery_item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroceryAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
