import React, { Component } from "react";
import Portal from "./Advert";
import { connect } from "react-redux";
import propTypes from "prop-types";
import FormIngredients from "./FormIngredients";
import FormStep1 from "./FormStep1";
import FormStep3 from "./FormStep3";

class FormUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ingredients: {}
    };
  }

  formGiven() {
    if (
      this.props.steppings[0] &&
      this.props.steppings[0].isSteped1 &&
      !this.props.steppings[1]
    ) {
      return <FormIngredients />;
    }
    if (this.props.steppings[1] && this.props.steppings[1].isSteped2) {
      return <FormStep3 />;
    }
    return <FormStep1 />;
  }

  render() {
    console.log(this.props.steppings);
    return (
      <div className="form-container">
        {this.formGiven()}
        {/*  <FormStep3 /> */}
        {/* <FormIngredients
          ingredients={this.props.ingredients}
          SubmitRecipe={e => this.SubmitRecipe(e)}
          loading={this.state.loading}
          validity={this.props.validity}
        /> */}
        <Portal
          open={this.state.open}
          header={this.state.header}
          message={this.state.message}
          color={this.state.color}
        />
      </div>
    );
  }
}

FormUpload.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.object)
};

const mapStateToProps = state => ({
  ingredients: state.manageIngredients,
  validity: state.validity,
  steppings: state.stepping
});

export default connect(mapStateToProps)(FormUpload);
