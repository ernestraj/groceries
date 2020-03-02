import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as searchResultActions from "../../redux/actions/SearchResultActions";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm";

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">
					Groceries
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className={"navbar-nav align-items-lg-center ixm-nav"}>
						{this.props.links.map(link => (
							<li key={link.path} className={"nav-item mb-4 mb-lg-0"}>
								<NavLink
									key={link.path}
									to={link.path}
									exact
									className={"nav-link transition__ease-link"}
								>
									{link.title}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<SearchForm />
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		links: state.content.menuLinks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(searchResultActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
