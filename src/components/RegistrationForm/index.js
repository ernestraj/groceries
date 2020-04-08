import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as RegistrationAction from "../../redux/actions/RegistrationAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class RegistrationForm extends Component {
  registrationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Email field is Required"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required")
  });
  render() {
    console.log("hello");
    console.log(this.props.error);
    return (
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            passwordConfirmation: ""
          }}
          validationSchema={this.registrationSchema}
          onSubmit={values => {
            this.props.actions.registerUser(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Field name="firstName" placeholder="First Name" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
              <Field name="middleName" placeholder="Middle Name" />
              <small>It is Optional</small>
              <Field name="lastName" placeholder="Last Name" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
              <Field name="email" placeholder="Email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Field name="password" placeholder="Password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <Field
                name="passwordConfirmation"
                placeholder="Confirm Password"
                type="password"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    progress: state.register.progress,
    error: state.register.error,
    login: state.register.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RegistrationAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
