import React, { Component } from "react";
import agent from "superagent";
import { connect } from "react-redux";
import propTypes from "prop-types";
import FormIngredients from "./FormIngredients";
import FormStep1 from "./FormStep1";
import FormStep3 from "./FormStep3";
import { LASTRECIPES } from "./../store/types";

class FormUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {}
    };
    agent
      .post(
        "https://ohmyrecipes-1.appspot.com/_ah/api/ohmyrecipesAPI/v1/getAllUserRecipes"
      )
      .send("userId=temp101")
      .end((err, res) => {
        if (!err) {
          this.props.dispatch({
            type: LASTRECIPES,
            payload: res.body.items
          });
        }
      });
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
    return <div className="form-container">{this.formGiven()}</div>;
  }
}

FormUpload.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.object),
  validity: propTypes.bool,
  steppings: propTypes.arrayOf(propTypes.object)
};

const mapStateToProps = state => ({
  ingredients: state.manageIngredients,
  validity: state.validity,
  steppings: state.stepping
});

export default connect(mapStateToProps)(FormUpload);
