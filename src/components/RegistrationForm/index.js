import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as RegistrationAction from "../../redux/actions/RegistrationAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class RegistrationForm extends Component {
	registrationSchema = Yup.object().shape({
		email: Yup.string().email().required("Email field is Required"),
		password: Yup.string().required("Password is required"),
		passwordConfirmation: Yup.string().oneOf(
			[Yup.ref("password"), null],
			"Passwords must match"
		),
		firstName: Yup.string().required("First Name is Required"),
		lastName: Yup.string().required("Last Name is Required"),
	});
	render() {
		if (this.props.registrationSuccessful) {
			return <Redirect to={"/pending-confirmation"} />;
		}
		return (
			<div className="container">
				<div className="jumbotron">
					<Formik
						initialValues={{
							firstName: "",
							lastName: "",
							middleName: "",
							email: "",
							password: "",
							passwordConfirmation: "",
						}}
						validationSchema={this.registrationSchema}
						onSubmit={(values) => {
							this.props.actions.registerUser(values);
						}}
					>
						{({ errors, touched, setFieldValue, values }) => (
							<Form>
								<div className="row mt-1 form-item">
									<div className="col-4">
										<Field name="firstName" placeholder="First Name" />
										{errors.firstName && touched.firstName ? (
											<div className="error mt-1">{errors.firstName}</div>
										) : null}
									</div>
									<div className="col-4">
										<Field name="middleName" placeholder="Middle Name" />
										<small>It is Optional</small>
									</div>
									<div className="col-4">
										<Field name="lastName" placeholder="Last Name" />
										{errors.lastName && touched.lastName ? (
											<div className="error mt-1">{errors.lastName}</div>
										) : null}
									</div>
								</div>
								<div className="row mt-4 form-item">
									<div className="col-4">
										<Field name="email" placeholder="Email" />
										{errors.email && touched.email ? (
											<div className="error mt-1">{errors.email}</div>
										) : null}
									</div>
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
									<div className="col-4">
										<Field
											name="passwordConfirmation"
											placeholder="Confirm Password"
											type="password"
										/>
										{errors.passwordConfirmation &&
										touched.passwordConfirmation ? (
											<div className="error mt-1">
												{errors.passwordConfirmation}
											</div>
										) : null}
									</div>
								</div>
								<div className="row mt-4 form-item">
									<div className="col text-center">
										<button
											className="btn btn-primary btn-bg-highlight"
											type="submit"
										>
											Register
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
		registrationSuccessful: state.register.registrationSuccessful,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(RegistrationAction, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
