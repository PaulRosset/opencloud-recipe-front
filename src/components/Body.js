import React, { Component } from "react";
import styled from "styled-components";
import { Segment, Grid, Divider, Advertisement } from "semantic-ui-react";
import { connect } from "react-redux";
import Stepping from "./Step";

import Form from "./Form";
import { ResultsAC, ResultFinal } from "./Result";

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
        <ResultsAC
          result={this.props.result.resultRecipe}
          name={<Spaned color="#db2828">Recipes results</Spaned>}
        />
      );
    } else if (this.props.steppings.length === 3) {
      return (
        <ResultFinal
          alergie={alergie}
          cuisine={cuisine}
          ingredients={this.props.steppings[1].ingredientsTitle}
          recipe={this.props.steppings[2].recipe}
        />
      );
    }
  }

  render() {
    console.log("STEP", this.props.steppings);
    return (
      <BodyContainer>
        <Advertisement
          unit="leaderboard"
          test="Oh my Recipe 🧐"
          style={{ margin: "20px auto", fontSize: "20px" }}
        />
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
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  result: state.result,
  steppings: state.stepping
});

export default connect(mapStateToProps)(Body);
