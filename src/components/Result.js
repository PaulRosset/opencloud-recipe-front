import React from "react";
import {
  Item,
  Segment,
  Header,
  List,
  Icon,
  Divider,
  Popup
} from "semantic-ui-react";
import propTypes from "prop-types";
import styled from "styled-components";
import { optionsIngredientsDevColor } from "./../options";
import _upperFirst from "lodash/upperFirst";
import _camelCase from "lodash/camelCase";
import _find from "lodash/find";

import fruits from "./../img/fruits.png";
import vegetables from "./../img/vegetables.png";
import meat from "./../img/meat.png";
import spicesHerbs from "./../img/spices-herbs.png";
import cerealAndSeeds from "./../img/cereal-and-seeds.png";
import dairy from "./../img/dairy.png";
import sweet from "./../img/sweet.png";
import seafood from "./../img/seafood.png";
import other from "./../img/other.png";

const optionsIngredientsDev = {
  fruits,
  vegetables,
  meat,
  spicesHerbs,
  cerealAndSeeds,
  dairy,
  sweet,
  seafood,
  other
};

const Fragment = React.Fragment;

const ItemStyled = styled(Item)`display: flex;`;
const Spaned = styled.span`color: ${props => props.color};`;
const Bolded = styled.b`color: ${props => props.color};`;

const secToMin = sec => sec / 60;

export const ResultsAC = props => {
  const resultingAC = props.result.map(value => JSON.parse(value));
  return (
    <Segment style={{ marginBottom: "30px" }}>
      <h1>
        {props.name}
        <Popup
          trigger={
            <Icon
              name="chevron circle up"
              color="orange"
              style={{ float: "right" }}
              link
              rounded
              circular
              onClick={() => window.scrollTo(0, 0)}
              size="small"
            />
          }
          content="Enter ingredients! 🌽"
        />
      </h1>
      {resultingAC.map((value, index) => (
        <Fragment key={index}>
          <ItemStyled>
            <Item.Image
              size="tiny"
              src={optionsIngredientsDev[_camelCase(value.type)] || other}
            />
            <Item.Content style={{ marginLeft: "25px", alignSelf: "center" }}>
              <Item.Header as="a" style={{ color: "#000" }}>
                Ingredient:{" "}
                <Bolded color="#545454">{_upperFirst(value.name)}</Bolded>
              </Item.Header>
              <Item.Description>
                Type of ingredient:{" "}
                <Bolded
                  color={optionsIngredientsDevColor[_camelCase(value.type)]}
                >
                  {_upperFirst(value.type)}
                </Bolded>
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
};

export const ResultsRecipes = props => (
  <Segment style={{ marginBottom: "30px" }}>
    <h1>
      {props.name}
      <Popup
        trigger={
          <Icon
            name="chevron circle up"
            color="red"
            style={{ float: "right" }}
            link
            rounded
            circular
            onClick={() => window.scrollTo(0, 0)}
            size="small"
          />
        }
        content={props.desc}
      />
    </h1>
    {props.result.map((value, index) => (
      <Fragment key={index}>
        <ItemStyled>
          <Item.Image rounded size="tiny" src={value.imgUrl || other} />
          <Item.Content style={{ marginLeft: "25px", alignSelf: "center" }}>
            <Item.Header as="a" style={{ color: "#000" }}>
              Recipe name: <b>{value.name}</b>
            </Item.Header>
            <Item.Description>
              <ul>
                <b style={{ position: "relative", right: "10px" }}>
                  Ingredients:
                </b>
                {JSON.parse(value.ingredients).map((ingredient, index) => (
                  <li key={index}>{_upperFirst(ingredient)}</li>
                ))}
              </ul>
            </Item.Description>
            <Item.Extra>
              <Icon name="wait" />
              {secToMin(value.prepTime)} min
            </Item.Extra>
            <Item.Extra>
              <a href={value.instructions} style={{ color: "#f2711c" }}>
                <Icon name="unordered list" color="orange" />See the entire
                recipe
              </a>
            </Item.Extra>
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
      <Header as="h3" textAlign="left">
        Here is the resume of your recipe that you saved!
      </Header>
      <List>
        <Header as="h4" style={{ marginBottom: "5px" }}>
          <Icon name="treatment" color="blue" />Allergy and Cuisine
        </Header>
        <List.Item>
          <List.Content>
            <List.Header>
              Allergy:{" "}
              <Spaned color="#2185d0">{_upperFirst(props.alergie)}</Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              Cuisine:{" "}
              <Spaned color="#2185d0">{_upperFirst(props.cuisine)}</Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
      <List>
        <Header as="h4" style={{ marginBottom: "5px" }}>
          <Icon name="lemon" color="yellow" /> Ingredients you choose!
        </Header>
        {props.ingredients.map((value, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                Ingredient:{" "}
                <Spaned color="#fbbd08">{_upperFirst(value.ingredient)}</Spaned>
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <List>
        <Header as="h4" style={{ margin: "3px 0" }}>
          <Icon name="lemon" color="yellow" /> Additional ingredients you need!
        </Header>
        {JSON.parse(
          _find(props.results, { id: props.recipe }).ingredients
        ).map((value, index) => (
          <List.Item key={index}>
            <List.Content>
              <List.Header>
                Ingredient:{" "}
                <Spaned color="#fbbd08">{_upperFirst(value)}</Spaned>
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <List>
        <Header as="h4" style={{ marginBottom: "5px" }}>
          <Icon name="food" color="red" /> Recipe
        </Header>
        <List.Item>
          <List.Content>
            <List.Header>
              Recipe:{" "}
              <Spaned color="#db2828">
                {_find(props.results, { id: props.recipe }).name}
              </Spaned>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  </Fragment>
);

ResultsAC.propTypes = {
  result: propTypes.array,
  name: propTypes.node
};

ResultsRecipes.propTypes = {
  name: propTypes.node,
  desc: propTypes.string
};

ResultFinal.propTypes = {
  alergie: propTypes.array,
  cuisine: propTypes.string,
  ingredients: propTypes.arrayOf(propTypes.object),
  results: propTypes.array
};
