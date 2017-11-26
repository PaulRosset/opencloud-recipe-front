import React, { Component } from "react";
import agent from "superagent";
import styled from "styled-components";
import { Icon, Form } from "semantic-ui-react";
import IngredientInput from "./Ingredient";
import SubHeader from "./SubHeader";
import Portal from "./Advert";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { GETRESULT } from "../store/types";

const Advert = styled.p`
  font-size: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  width: 100%;
  text-align: center;
`;

class FormUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      open: false
    };
  }

  SubmitRecipe(e) {
    agent
      .get("https://reqres.in/api/users?page=2")
      .use(() => this.setState({ loading: true }))
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
          this.props.dispatch({ type: GETRESULT, payload: res.body });
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
      <div className="form-container">
        <SubHeader />
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
            />
          </Form.Group>
        </Form>
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
  ingredients: state.manageIngredients
});

export default connect(mapStateToProps)(FormUpload);
