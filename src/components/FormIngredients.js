import React from "react";
import { Form } from "semantic-ui-react";
import IngredientInput from "./Ingredient";
import SubHeader from "./SubHeader";
import agent from "superagent";
import { connect } from "react-redux";
import { GETRESULTRECIPE, STEP2 } from "../store/types";

class FormIngredients extends React.Component {
  state = {
    loading: false,
    disabled: true,
    open: false,
    ingredients: {}
  };

  SubmitRecipe(e) {
    const { alergie, cuisine } = this.props.steppings[0];
    const ingredients = this.props.ingredients.map(value => value.payload);
    agent
      .post(
        "https://ohmyrecipes-1.appspot.com/_ah/api/ohmyrecipesAPI/v1/getRecipes"
      )
      .send(`allergens=${alergie}`)
      .send(`cuisines=${cuisine}`)
      .send(`ingredients=${JSON.stringify(ingredients)}`)
      .send(`userId=1`)
      .use(() => this.setState({ loading: true }))
      .end((err, res) => {
        if (!err) {
          this.props.dispatch({
            type: GETRESULTRECIPE,
            payload: res.body.items
          });
          this.props.dispatch({ type: STEP2, payload: this.props.ingredients });
          window.scrollTo(0, 550);
        }
      });
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
              disabled={this.props.validity}
            />
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

export default connect(mapStateToProps)(FormIngredients);
