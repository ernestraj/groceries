import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as searchResultActions from "../../redux/actions/SearchResultActions";
import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm";
import "./index.scss";

class Header extends Component {
	render() {
		const userState = this.props.authenticated;
		return (
			<nav className="navbar navbar-expand-lg navbar-light header__inner">
				<a className="navbar-brand" href="/">
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
						{this.props.links[userState].links.map((link) => (
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
		links: state.content.menuLinks,
		authenticated: state.register.authenticated,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(searchResultActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
