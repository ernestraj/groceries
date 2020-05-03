import React, { Component } from "react";
import { connect } from "react-redux";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.props.actions.loadDishes();
	}

	render() {
		var dish_items = [];
		return (
			<div id="dishes-page">
				{this.props.dishes.map((dish) => {
					return (
						<div key={dish.nid} className="dish">
							<h2>{dish.title}</h2>
							<ul className="ingredients-list">
								{dish.field_ingredients.split(",").map((ingredient) => {
									const item = ingredient.split("-");
									return <li key={item[1]}>{item[0]}</li>;
								})}
							</ul>
						</div>
					);
				})}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		dishes: state.titles.dishes,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(GroceryAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
