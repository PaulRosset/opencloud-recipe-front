import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { Segment, Grid, Divider, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import Stepping from "./Step";
import Form from "./Form";
import { ResultsAC, ResultsRecipes, ResultFinal } from "./Result";
import RecipeBook from "./../img/recipe.png";
import Recipe from "./../img/fruit-salad.png";

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative:
`;

const Spaned = styled.span`color: ${props => props.color};`;

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

const ImageRotating = styled(Image)`transform: rotate(${props => props.deg});`;

const HeaderH = styled.div`
  height: 3em;
  position: relative;
  width: 60%;
  margin: 30px auto;
`;

const VerticalAlign = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

class Body extends Component {
  resultToRender() {
    const { alergie, cuisine } = this.props.steppings[0];
    if (this.props.result.resultAC && this.props.steppings.length === 1) {
      return (
        <ResultsAC
          result={this.props.result.resultAC}
          name={<Spaned color="#fbbd08">Ingredients results</Spaned>}
        />
      );
    } else if (
      this.props.result.resultRecipe &&
      this.props.steppings.length === 2
    ) {
      return (
        <ResultsRecipes
          result={this.props.result.resultRecipe}
          name={<Spaned color="#db2828">Recipes results</Spaned>}
          desc="Choose your recipe! 🍽"
        />
      );
    } else if (this.props.steppings.length === 3) {
      return (
        <ResultFinal
          alergie={alergie}
          cuisine={cuisine}
          ingredients={this.props.steppings[1].ingredientsTitle}
          recipe={this.props.steppings[2].recipe}
          results={this.props.result.resultRecipe}
        />
      );
    }
  }

  render() {
    return (
      <BodyContainer>
        <HeaderH>
          <VerticalAlign>
            <Header as="h2" textAlign="center" style={{ marginTop: 15 }}>
              <ImageRotating
                deg="-18deg"
                src={RecipeBook}
                floated="left"
                size="huge"
              />Oh my Recipe 🧐
              <ImageRotating
                deg="18deg"
                src={Recipe}
                floated="right"
                size="huge"
              />{" "}
            </Header>
          </VerticalAlign>
        </HeaderH>
        <Stepping />
        <Divider section />
        <Grid textAlign="center">
          <Grid.Column width={10} textAlign="center">
            <Segment size="tiny" padded={true} piled>
              <Form />
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider section />
        <Container>{this.resultToRender()}</Container>
        <Container>
          {this.props.result.resultLastRecipe ? (
            <ResultsRecipes
              result={this.props.result.resultLastRecipe}
              name={<Spaned color="#db2828">Last Recipes saved</Spaned>}
              desc="Go up͎ ↑"
            />
          ) : null}
        </Container>
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  result: state.result,
  steppings: state.stepping
});

propTypes.Body = {
  result: propTypes.object,
  steppings: propTypes.arrayOf(propTypes.object)
};

export default connect(mapStateToProps)(Body);
