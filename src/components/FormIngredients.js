import React from "react";
import propTypes from "prop-types";
import { Form } from "semantic-ui-react";
import IngredientInput from "./Ingredient";
import SubHeader from "./SubHeader";
import agent from "superagent";
import { connect } from "react-redux";
import { GETRESULTRECIPE, STEP2 } from "../store/types";

class FormIngredients extends React.Component {
  state = {
    loading: false,
    disabled: false,
    ingredients: {},
    msgAlert: ""
  };

  SubmitRecipe() {
    const { alergie, cuisine } = this.props.steppings[0];
    const ingredients = this.props.ingredients.map(value => value.payload);
    if (ingredients[0].length === 0) {
      this.setState({
        msgAlert: "Please types ingredients!"
      });
      return;
    } else {
      this.setState({
        msgAlert: ""
      });
      const allergens = alergie;
      const cuisines = cuisine;
      agent
        .post(
          "https://ohmyrecipes-1.appspot.com/_ah/api/ohmyrecipesAPI/v1/getRecipes?userId=temp101"
        )
        .set("accept", "json")
        .send(
          JSON.stringify(
            Object.assign({ allergens }, { cuisines }, { ingredients })
          )
        )
        .use(() => this.setState({ loading: true, disabled: true }))
        .end((err, res) => {
          if (!err) {
            this.props.dispatch({
              type: GETRESULTRECIPE,
              payload: res.body.items
            });
            this.props.dispatch({
              type: STEP2,
              payload: this.props.ingredients
            });
            window.scrollTo(0, 550);
          }
        });
    }
  }

  render() {
    return (
      <SubHeader>
        <Form onSubmit={e => this.SubmitRecipe(e)}>
          <Form.Group grouped>
            {this.props.ingredients.map((value, index) => (
              <IngredientInput
                name={`ingrediant${value.id}`}
                placeholder={value.name}
                key={value.id}
                id={value.id}
              />
            ))}
            <Form.Button
              loading={this.state.loading}
              content="Submit"
              size="small"
              disabled={this.state.disabled}
            />
            <p style={{ color: "#db2828" }}>{this.state.msgAlert}</p>
          </Form.Group>
        </Form>
      </SubHeader>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.manageIngredients,
  validity: state.validity,
  steppings: state.stepping,
  results: state.result
});

propTypes.FormIngredients = {
  steppings: propTypes.object,
  ingredients: propTypes.arrayOf(propTypes.object),
  dispatch: propTypes.func,
  validity: propTypes.bool,
  results: propTypes.object
};

export default connect(mapStateToProps)(FormIngredients);
