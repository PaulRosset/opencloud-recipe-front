import React from "react";
import styled from "styled-components";
import { Header, Icon, Form } from "semantic-ui-react";
import agent from "superagent";
import { connect } from "react-redux";
import { STEP1, GETRESULTAC } from "../store/types";
import { optionsAlergies, optionsCuisines } from "./../options";

const InputContainer = styled.div`
  margin: 20px 0;
  border-bottom: 5px;
`;
const Separator = styled.hr`
  width: 25%;
  position: relative;
  top: 10px;
`;

export const InputSelect = props => (
  <InputContainer>
    <Header as="h5">
      <Icon name={props.icon} circular bordered link />
      {props.title}
    </Header>
    <Form.Select
      className={props.id}
      id={props.name}
      onChange={(e, { value }) => props.onChange(e, { value })}
      style={{ width: "50%" }}
      placeholder={props.desc}
      options={props.options}
    />
    <Separator />
  </InputContainer>
);

class FormStep1 extends React.Component {
  state = {
    loading: false,
    isDisabled: true
  };

  onChangeAlergie(e, { value }) {
    this.setState(
      {
        alergie: value
      },
      () => {
        this.state.cuisine && this.state.alergie
          ? this.setState({ isDisabled: false })
          : this.setState({ isDisabled: true });
      }
    );
  }

  onChangeCuisine(e, { value }) {
    this.setState(
      {
        cuisine: value
      },
      () => {
        this.state.cuisine && this.state.alergie
          ? this.setState({ isDisabled: false })
          : this.setState({ isDisabled: true });
      }
    );
  }

  onSubmit(e) {
    const { alergie, cuisine } = this.state;
    agent
      .post(
        "https://ohmyrecipes-1.appspot.com/_ah/api/ohmyrecipesAPI/v1/getIngredients"
      )
      .send(`allergens=${alergie}`)
      .send(`cuisines=${cuisine}`)
      .send(`userId=1`)
      .use(() => this.setState({ loading: true }))
      .end((err, res) => {
        if (!err) {
          this.props.dispatch({
            type: STEP1,
            payload: { alergie, cuisine, isSteped1: true }
          });
          this.props.dispatch({
            type: GETRESULTAC,
            payload: res.body.ingredients
          });
        }
        window.scrollTo(0, 550);
      });
  }

  render() {
    return (
      <div>
        <Header textAlign="left">Step 1</Header>
        <Form onSubmit={e => this.onSubmit(e)}>
          <InputSelect
            onChange={(e, { value }) => this.onChangeAlergie(e, { value })}
            id="alergie"
            icon="treatment"
            desc="Allergie"
            options={optionsAlergies}
            title="Tell us about your allergie"
          />
          <InputSelect
            onChange={(e, { value }) => this.onChangeCuisine(e, { value })}
            id="cuisine"
            icon="food"
            desc="Cuisine"
            options={optionsCuisines}
            title="Which kind of cuisine you want"
          />
          <Form.Button
            loading={this.state.loading}
            content="Submit"
            size="small"
            disabled={this.state.isDisabled}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  steppings: state.stepping
});

export default connect(mapStateToProps)(FormStep1);
