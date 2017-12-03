import React from "react";
import styled from "styled-components";
import { Header, Form } from "semantic-ui-react";
import agent from "superagent";
import { connect } from "react-redux";
import { STEP3, GETRESULTRECIPE } from "../store/types";

const optionsRecipe = [
  { key: "1", value: "ag1", text: "Alergies 1" },
  { key: "2", value: "ag2", text: "Alergies 2" }
];

const Container = styled.div``;

class FormStep3 extends React.Component {
  state = { disabled: true };

  onChangeRecipe(e, { value }) {
    this.setState({
      recipe: value,
      disabled: false
    });
  }

  onSubmit() {
    const { recipe } = this.state;
    agent
      .get("https://reqres.in/api/users?page=2")
      .use(() => this.setState({ loading: true }))
      .set("Content-type", "application/json")
      .end((err, res) => {
        if (!err) {
          this.props.dispatch({
            type: GETRESULTRECIPE,
            payload: res.body.data
          });
          this.props.dispatch({ type: STEP3, payload: recipe });
          this.setState({ loading: false });
        }
      });
  }

  render() {
    console.log(this.props.results);
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
            options={optionsRecipe}
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
