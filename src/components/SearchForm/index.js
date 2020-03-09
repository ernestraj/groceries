import React, { Component } from "react";
import AutoComplete from "react-autocomplete";
import { connect } from "react-redux";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.props.actions.loadGroceries();
    console.log(this.props);
  }

  state = {
    value: ""
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  onSelect = value => {
    this.setState({ value: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.value);
  };
  render() {
    const { value } = this.state;
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <AutoComplete
          getItemValue={item => item.title}
          items={this.props.titles}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.title}
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

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.titles.fetching,
    error: state.titles.error,
    titles: state.titles.titles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroceryAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
