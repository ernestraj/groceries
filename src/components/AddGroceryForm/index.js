import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Autocomplete from "react-autocomplete";
import * as GroceryItemAction from "../../redux/actions/GroceryItemAction";
import * as GroceryAction from "../../redux/actions/GroceryAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./index.css";

class AddGroceryForm extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getBrands();
    this.props.actions.loadGroceries();
    this.props.actions.getAisles();
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
            brand_id: "",
            address: "",
            aisle: "",
            aisle_id: "",
            groceryName: "",
            grocery_id: "",
            price: "",
            description: ""
          }}
          validationSchema={this.grocerySchema}
          onSubmit={values => {
            values = {
              ...values,
              brand_id: this.props.brands.find(function(item) {
                if (item.name === values.brand) {
                  return item;
                }
              }),
              aisle_id: this.props.aisles.find(function(item) {
                if (item.name === values.aisle) {
                  return item;
                }
              }),
              grocery_id: this.props.groceries.find(function(item) {
                if (item.title === values.groceryName) {
                  return item;
                }
              })
            };
            this.props.actions.saveGroceryItem(values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Autocomplete
                name="brand"
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
              <Autocomplete
                name="aisle"
                getItemValue={item => item.name}
                items={this.props.aisles ? this.props.aisles : []}
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
                value={values.aisle}
                onChange={e => setFieldValue("aisle", e.target.value)}
                onSelect={val => setFieldValue("aisle", val)}
                placeholder="Aisle"
              />
              <small>
                ex: 1/2/116 Aisle number a number value where this grocery item
                is located
              </small>
              {errors.aisle && touched.aisle ? <div>{errors.aisle}</div> : null}
              <Autocomplete
                name="groceryName"
                getItemValue={item => item.title}
                items={this.props.groceries ? this.props.groceries : []}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item.nid}
                    style={{
                      background: isHighlighted ? "lightgray" : "white"
                    }}
                  >
                    {item.title}
                  </div>
                )}
                value={values.groceryName}
                onChange={e => setFieldValue("groceryName", e.target.value)}
                onSelect={val => setFieldValue("groceryName", val)}
                placeholder="Grocery Name"
              />
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
    brands: state.brands.brands,
    aisles: state.brands.aisles,
    groceries: state.titles.titles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, GroceryItemAction, GroceryAction),
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroceryForm);
