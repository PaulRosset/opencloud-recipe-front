import React, { Component } from "react";
import styled from "styled-components";
import { Segment, Grid, Divider, Advertisement } from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";

import Form from "./Form";
import { Results } from "./Result";

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative:
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

class Body extends Component {
  render() {
    console.log("EHLLO", this.props.result.payload);
    return (
      <BodyContainer>
        <Advertisement
          unit="leaderboard"
          test="Oh my Recipe 🧐"
          style={{ margin: "20px auto", fontSize: "20px" }}
        />
        <Divider section />
        <Grid textAlign="center">
          <Grid.Column width={10} textAlign="center">
            <Segment size="tiny" padded={true} piled>
              <Form res={body => this.setState({ result: body })} />
            </Segment>
          </Grid.Column>
        </Grid>
        <Divider section />
        <Container>
          {this.props.result.length > 0 ? <h1>Results:</h1> : null}
          {_.map(this.props.result.payload, (recipe, index) => (
            <Results
              header={recipe.first_name}
              description={recipe.last_name}
              img={recipe.avatar}
            />
          ))}
        </Container>
      </BodyContainer>
    );
  }
}

const mapStateToProps = state => ({
  result: state.result
});

export default connect(mapStateToProps)(Body);
