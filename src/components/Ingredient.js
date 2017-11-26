import React, { Component } from "react";
import reactDOM from "react-dom";
import styled from "styled-components";
import { Icon, Popup, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { DELETEFIELD, FILLINGREDIENT } from "./../store/types";

const Ingredient = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
`;

class IngredientInput extends Component {
  render() {
    return (
      <Ingredient>
        <Icon name="wpforms" size="large" />
        <Form.Input
          name={this.props.name}
          placeholder={this.props.placeholder}
          key={this.props.id}
          onChange={e =>
            this.props.dispatch({
              type: FILLINGREDIENT,
              id: this.props.id,
              name: this.props.placeholder,
              payload: e.target.value
            })}
        />
        <Popup
          trigger={
            <Icon
              name="minus"
              bordered
              circular
              color="red"
              link
              onClick={() => {
                this.props.dispatch({ type: DELETEFIELD, id: this.props.id });
              }}
              style={{ marginLeft: "5px" }}
            />
          }
          content="Delete the ingredient"
        />
      </Ingredient>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.manageIngredients
});

export default connect(mapStateToProps)(IngredientInput);
