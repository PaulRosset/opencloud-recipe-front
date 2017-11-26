import React from "react";
import { Item } from "semantic-ui-react";
import styled from "styled-components";

const ItemStyled = styled(Item)`display: flex;`;

export const Results = ({ header, description, img }) => (
  <ItemStyled>
    <Item.Image src={img || "http://via.placeholder.com/150x150"} />
    <Item.Content style={{ marginLeft: "25px" }}>
      <Item.Header className="marginBottom" as="a">
        {header}
      </Item.Header>
      <Item.Description className="marginBottom">
        {description}
      </Item.Description>
    </Item.Content>
  </ItemStyled>
);
