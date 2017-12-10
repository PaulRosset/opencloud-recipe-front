import React from "react";
import propTypes from "prop-types";
import { Header, Form, Icon, Popup, Confirm } from "semantic-ui-react";
import agent from "superagent";
import { connect } from "react-redux";
import { STEP3, GETRECIPE } from "../store/types";

const Fragment = React.Fragment;

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
    this.setState({
      recipe: value,
      disabled: false
    });
  }

  onSubmit() {
    const { recipe } = this.state;
    agent
      .post(
        "https://projectcloud-186319.appspot.com/_ah/api/ohmyrecipesAPI/v1/saveUserRecipes?userId=temp101"
      )
      .set("accept", "json")
      .send({
        recipeIds: [`${recipe}`]
      })
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

  show() {
    this.setState({
      open: true
    });
  }

  handleConfirm() {
    this.setState(
      {
        open: false
      },
      () => (window.location.pathname = "/")
    );
  }

  handleCancel() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <Header as="h4" textAlign="left">
          Finally, choose your recipe!
          {this.props.steppings[2] ? (
            <Fragment>
              <Popup
                trigger={
                  <Icon
                    name="refresh"
                    rounded
                    circular
                    link
                    size="tiny"
                    style={{ float: "right" }}
                    onClick={this.show.bind(this)}
                  />
                }
                content="Refresh and load a new recipe!"
              />
              <Confirm
                open={this.state.open}
                onCancel={this.handleCancel.bind(this)}
                onConfirm={this.handleConfirm.bind(this)}
              />
            </Fragment>
          ) : null}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  steppings: state.stepping,
  results: state.result
});

propTypes.FormStep3 = {
  resultRecipe: propTypes.arrayOf(propTypes.object),
  disabled: propTypes.func,
  steppings: propTypes.arrayOf(propTypes.object),
  results: propTypes.object,
  dispatch: propTypes.func
};

export default connect(mapStateToProps)(FormStep3);
