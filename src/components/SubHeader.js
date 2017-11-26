import React, { Component } from "react";
import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADDFIELD } from "./../store/types";

const Title = styled.h5`
  text-align: left;
  margin-bottom: 20px !important;
`;

class SubHeader extends Component {
  addIngredient() {}

  render() {
    return (
      <div>
        <Title>
          Tell us about the ingredients that you have ?{" "}
          <Popup
            trigger={
              <Icon
                name="plus"
                bordered
                circular
                link
                onClick={() => {
                  this.props.dispatch({ type: ADDFIELD });
                }}
                style={{ float: "right" }}
              />
            }
            content="Add another ingredient 🍎"
          />
        </Title>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.manageIngredients
});

export default connect(mapStateToProps)(SubHeader);
