import React from "react";
import styled from "styled-components";
import { Icon, Image } from "semantic-ui-react";
import Kent from "./../img/kent.png";

const HeaderBar = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #2196f3;
  position: relative;
`;

const AlignVertical = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${props => props.size || "auto"};
`;

const Title = styled.span`
  color: white;
  margin-left: 2rem;
  font-size: 16px;
`;

export const Header = () => (
  <HeaderBar>
    <AlignVertical>
      <Title>
        <Icon name="cloud" />Open Cloud Platform
      </Title>
    </AlignVertical>
    <AlignVertical size="100%" space="1em">
      <Image
        src={Kent}
        size="tiny"
        floated="right"
        style={{ marginRight: "1em" }}
      />
    </AlignVertical>
  </HeaderBar>
);
