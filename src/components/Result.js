import React from "react";
import {
  Item,
  Segment,
  Dimmer,
  Loader,
  Header,
  List,
  Icon,
  Divider
} from "semantic-ui-react";
import styled from "styled-components";

const Fragment = React.Fragment;

const ItemStyled = styled(Item)`display: flex;`;
const Spaned = styled.span`color: ${props => props.color};`;

export const Loading = props => (
  <Segment>
    <Dimmer active={props.active} inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  </Segment>
);

export const ResultsAC = props => (
  <Segment style={{ marginBottom: "30px" }}>
    <h1>{props.name}</h1>
    {props.result.map((value, index) => (
      <Fragment>
        <ItemStyled key={value.id}>
          <Item.Image
            src={value.avatar || "http://via.placeholder.com/150x150"}
          />
          <Item.Content style={{ marginLeft: "25px", alignSelf: "center" }}>
            <Item.Header className="marginBottom" as="a">
              Ingredients name: <b>{value.first_name}</b>
            </Item.Header>
            <Item.Description className="marginBottom">
              Description: <b>{value.last_name}</b>
            </Item.Description>
          </Item.Content>
        </ItemStyled>
        <Divider horizontal>
          <Icon name="chevron circle up" size="huge" color="yellow" />
        </Divider>
      </Fragment>
    ))}
  </Segment>
);

export const ResultFinal = props => (
  <Fragment>
    <Header as="h3">
      Thanks!{" "}
      <span role="img" aria-label="icon-happy">
        😁
      </span>
    </Header>
    <Segment style={{ marginBottom: "30px" }}>
      <Header as="h4" textAlign="left">
        Here is your recipe!
      </Header>
      <List>
        <Header as="h5">
          <Icon name="treatment" color="blue" />Alergie and Cuisine
        </Header>
        <List.Item>
          <List.Content>
            <List.Header>
              Alergie: <Spaned color="#2185d0">{props.alergie}</Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              Cuisine: <Spaned color="#2185d0">{props.cuisine}</Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
      <List>
        <Header as="h5">
          <Icon name="lemon" color="yellow" /> Ingredients
        </Header>
        {props.ingredients.map((value, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                Ingredient: <Spaned color="#fbbd08">{value.ingredient}</Spaned>
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <List>
        <Header as="h5">
          <Icon name="food" color="red" /> Recipe
        </Header>
        <List.Item>
          <List.Content>
            <List.Header>
              Recipe: <Spaned color="#db2828">{props.recipe}</Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  </Fragment>
);
