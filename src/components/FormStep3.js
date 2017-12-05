import React from "react";
import styled from "styled-components";
import { Header, Form } from "semantic-ui-react";
import agent from "superagent";
import { connect } from "react-redux";
import { STEP3, GETRECIPE } from "../store/types";

const Container = styled.div``;

class FormStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      optionsRecipe: this.props.results.resultRecipe.map((value, index) => ({
        key: index,
        value: value.id,
        text: value.name
      }))
    };
  }

  onChangeRecipe(e, { value }) {
    this.setState(
      {
        recipe: value,
        disabled: false
      },
      () => console.log("RECIPED", this.state.recipe)
    );
  }

  onSubmit() {
    const { recipe } = this.state;
    agent
      .post(
        "https://ohmyrecipes-1.appspot.com/_ah/api/ohmyrecipesAPI/v1/saveUserRecipes"
      )
      .send(`recipeIds=${recipe}`)
      .send("userId=temp101")
      .use(() => this.setState({ loading: true }))
      .end((err, res) => {
        if (!err) {
          this.props.dispatch({
            type: GETRECIPE,
            payload: res.body
          });
          this.props.dispatch({ type: STEP3, payload: recipe });
          this.setState({ loading: false });
        }
      });
  }

  render() {
    console.log(GETRECIPE, this.props.results.resultRecipe);
    return (
      <Container>
        <Header as="h4" textAlign="left">
          Finally, choose your recipe!
        </Header>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Select
            onChange={(e, { value }) => this.onChangeRecipe(e, { value })}
            style={{ width: "60%" }}
            placeholder="Choose the recipe you want!"
            options={this.state.optionsRecipe}
          />
          <Form.Button
            loading={this.state.loading}
            content="Submit"
            size="small"
            disabled={this.state.disabled}
          />
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  steppings: state.stepping,
  results: state.result
});

export default connect(mapStateToProps)(FormStep3);
