import React, { Component } from "react";
import AutoComplete from "react-autocomplete";

class SearchForm extends Component {
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
    console.log(event);
  };
  render() {
    const { value } = this.state;
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <AutoComplete
          getItemValue={item => item.label}
          items={[{ label: "apple" }, { label: "banana" }, { label: "pear" }]}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.label}
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item.label}
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

export default SearchForm;
