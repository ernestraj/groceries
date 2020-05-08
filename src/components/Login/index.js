import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as RegistrationAction from "../../redux/actions/RegistrationAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./index.scss";

class Login extends Component {
	loginSchema = Yup.object().shape({
		email: Yup.string().email().required("Email field is Required"),
		password: Yup.string().required("Password is required"),
	});
	render() {
		if (this.props.login) {
			return <Redirect to={"/pending-confirmation"} />;
		}
		return (
			<div className="container">
				<div className="jumbotron">
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={this.loginSchema}
						onSubmit={(values) => {
							this.props.actions.loginUser(values);
						}}
					>
						{({ errors, touched, setFieldValue, values }) => (
							<Form>
								<div className="row mt-4 form-item">
									<div className="col-4"></div>
									<div className="col-4">
										<Field name="email" placeholder="Email" />
										{errors.email && touched.email ? (
											<div className="error mt-1">{errors.email}</div>
										) : null}
									</div>
									<div className="col-4"></div>
								</div>
								<div className="row mt-4 form-item">
									<div className="col-4"></div>
									<div className="col-4">
										<Field
											name="password"
											placeholder="Password"
											type="password"
										/>
										{errors.password && touched.password ? (
											<div className="error mt-1">{errors.password}</div>
										) : null}
									</div>
									<div className="col-4"></div>
								</div>
								<div className="row mt-4 form-item">
									<div className="col text-center">
										<button
											className="btn btn-primary btn-bg-highlight"
											type="submit"
										>
											Login
										</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		progress: state.register.progress,
		error: state.register.error,
		login: state.register.login,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegistrationAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
