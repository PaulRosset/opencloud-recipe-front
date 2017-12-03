import React from "react";
import { Form } from "semantic-ui-react";
import IngredientInput from "./Ingredient";
import SubHeader from "./SubHeader";
import agent from "superagent";
import { connect } from "react-redux";
import { GETRESULT, STEP2 } from "../store/types";

class FormIngredients extends React.Component {
  state = {
    loading: false,
    disabled: true,
    ingredients: {}
  };

  SubmitRecipe(e) {
    agent
      .get("https://reqres.in/api/users?page=2")
      .use(() => {
        this.setState({ loading: true });
      })
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (err || !res.body) {
          this.setState({
            open: true,
            header: "Unfortunately, we encountered an error",
            message: "You can try again later, sorry 🤕",
            color: "red",
            loading: false
          });
        } else {
          this.props.dispatch({ type: GETRESULT, payload: res.body.data });
          this.props.dispatch({ type: STEP2, payload: this.props.ingredients });
          this.setState({
            open: true,
            header: "Here it is !",
            message:
              "You can find below all the recipe you can cook with your ingredients.",
            color: "green",
            loading: false
          });
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
  steppings: state.stepping
});

export default connect(mapStateToProps)(FormIngredients);
