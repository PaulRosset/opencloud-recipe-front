import React from "react";
import { Icon, Step } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";

const Fragment = React.Fragment;
const Container = styled.div`text-align: center;`;
const Smaller = styled.div`
  font-size: 12px;
  margin: 5px 0;
`;

const ResumeAC = props => (
  <Fragment>
    {props.alergie && props.cuisine ? (
      <Fragment>
        <Smaller>
          <b>Alergie: </b>
          {props.alergie}
          <br />
          <b>Cuisine: </b>
          {props.cuisine}
        </Smaller>
      </Fragment>
    ) : null}
  </Fragment>
);

const ResumeIngredients = props => (
  <Smaller>
    {props.ingredients.map((value, index) => (
      <Fragment key={index}>
        <b>Ingredient:</b> {value.ingredient}
        <br />
      </Fragment>
    ))}
  </Smaller>
);

const ResumeRecipe = props => (
  <Smaller>
    <b>Recipe:</b> {props.recipe}
  </Smaller>
);

const Stepping = props => (
  <Container>
    <Step.Group>
      <Step
        active={!!!props.steppings[0].isSteped1 && !props.steppings[1]}
        completed={props.steppings[0].isSteped1}
        link
      >
        <Icon name="treatment" color="blue" />
        <Step.Content>
          <Step.Title>Alergie & Cuisine</Step.Title>
          <Step.Content>
            Tell us about you!<br />
            <ResumeAC
              alergie={props.steppings[0].alergie}
              cuisine={props.steppings[0].cuisine}
            />
          </Step.Content>
        </Step.Content>
      </Step>
      <Step
        active={props.steppings[0].isSteped1 && !props.steppings[1]}
        completed={props.steppings[1] ? props.steppings[1].isSteped2 : false}
        link
      >
        <Icon name="lemon" color="yellow" />
        <Step.Content>
          <Step.Title>Ingredient</Step.Title>
          <Step.Content>
            Tell us the ingredient you want!<br />
            {props.steppings[1] ? (
              <ResumeIngredients
                ingredients={props.steppings[1].ingredientsTitle}
              />
            ) : null}
          </Step.Content>
        </Step.Content>
      </Step>
      <Step
        active={
          props.steppings[1] &&
          props.steppings[1].isSteped2 &&
          !props.steppings[2]
        }
        completed={props.steppings[2] ? props.steppings[2].isSteped3 : false}
        link
      >
        <Icon name="food" color="red" />
        <Step.Content>
          <Step.Title>Recipe</Step.Title>
          <Step.Content>
            Get the list of recipe!<br />
            {props.steppings[2] ? (
              <ResumeRecipe recipe={props.steppings[2].recipe} />
            ) : null}
          </Step.Content>
        </Step.Content>
      </Step>
    </Step.Group>
  </Container>
);

const mapStateToProps = state => ({
  steppings: state.stepping
});

export default connect(mapStateToProps)(Stepping);
