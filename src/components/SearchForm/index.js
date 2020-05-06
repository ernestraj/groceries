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
		this.position();
	}

	state = {
		value: this.props.grocery_item ? this.props.grocery_item.title : "",
		redirect: false,
		latitude: null,
		longitude: null,
	};
	position = () => {
		navigator.geolocation.getCurrentPosition(
			(position) =>
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				}),
			(err) => console.log(err)
		);
	};
	onChange = (e) => {
		this.setState({ value: e.target.value });
		this.props.actions.loadGroceries(this.state.value);
	};
	onSelect = (value) => {
		this.setState({ value: value });
	};
	setRedirect = () => {
		this.setState({
			redirect: true,
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const grocery_item = this.props.titles.filter(function (element) {
			if (element.title === this.state.value) {
				return element;
			}
		}, this);
		this.props.actions.loadGroceryItemsWithStore(
			grocery_item,
			this.state.latitude,
			this.state.longitude
		);
		this.setRedirect();
	};
	renderRedirect = (searched_item) => {
		if (this.state.redirect && this.props.location.pathname !== "/search") {
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
						getItemValue={(item) => item.title}
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
						className="btn btn-outline-success btn-bg-highlight"
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
		grocery_item: state.titles.grocery_item,
		location: state.router.location,
		search_results: state.titles.search_results,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(GroceryAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
