import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADDFIELD } from "./../store/types";

const Title = styled.h5`
  text-align: left;
  margin-bottom: 20px !important;
`;

class SubHeader extends Component {
  render() {
    return (
      <div>
        <Title>
          Step 2{" "}
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
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.manageIngredients
});

SubHeader.propTypes = {
  ingredients: propTypes.arrayOf(propTypes.object),
  dispatch: propTypes.func,
  children: propTypes.node
};

export default connect(mapStateToProps)(SubHeader);
