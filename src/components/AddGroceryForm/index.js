import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Autocomplete from "react-autocomplete";
import * as GroceryItemAction from "../../redux/actions/GroceryItemAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";

class AddGroceryForm extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getBrands();
  }
  grocerySchema = Yup.object().shape({
    brand: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    aisle: Yup.string().required("Required"),
    groceryName: Yup.string().required("Required")
  });
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            brand: "",
            address: "",
            aisle: "",
            groceryName: "",
            price: "",
            description: ""
          }}
          validationSchema={this.grocerySchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Autocomplete
                getItemValue={item => item.name}
                items={this.props.brands ? this.props.brands : []}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.tid}
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    {item.name}
                  </div>
                )}
                value={values.brand}
                placeholder="brand"
                onChange={e => setFieldValue("brand", e.target.value)}
                onSelect={val => setFieldValue("brand", val)}
                placeholder="Brand/Store Name"
              />
              <small>
                ex:Walmart/SuperStore. It will be populated as you type.
              </small>
              {errors.brand && touched.brand ? <div>{errors.brand}</div> : null}
              <GooglePlacesAutocomplete
                onSelect={val => setFieldValue("address", val)}
                autocompletionRequest={{
                  componentRestrictions: {
                    country: ["ca"]
                  }
                }}
              />
              <small>
                Address of the Store it will be populated as you type
              </small>
              {errors.address && touched.address ? (
                <div>{errors.address}</div>
              ) : null}
              <Field name="aisle" placeholder="Aisle" />
              <small>
                ex: 1/2/116 Aisle number a number value where this grocery item
                is located
              </small>
              {errors.aisle && touched.aisle ? <div>{errors.aisle}</div> : null}
              <Field name="groceryName" placeholder="Name" />
              <small>
                Name of the grocery item which you want to add in the system.{" "}
              </small>
              {errors.groceryName && touched.groceryName ? (
                <div>{errors.groceryName}</div>
              ) : null}
              <Field name="description" placeholder="Description" />
              <small>
                If you want to describe about the grocery or its location or if
                you want to put any comments to make it easy for user's to
                locate it. It can include directions as well.{" "}
              </small>
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <Field name="price" />
              {errors.price && touched.price ? <div>{errors.price}</div> : null}
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
    fetching: state.brands.fetching,
    error: state.brands.error,
    brands: state.brands.brands
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GroceryItemAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroceryForm);
