import React from "react";
import styled from "styled-components";

export const Input = styled.input`
  color: ${(props) => props.theme.dark[1]};
  font-weight: 500;
  padding: 5px 10px;
  margin: 10px 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  border: 0;
  border-radius: 3px;
  border-bottom: 2px solid ${(props) => props.theme.dark[2]};
  background-color: ${(props) => props.theme.light[1]};
  &:focus {
    border-color: ${(props) => props.theme.dark[0]};
    background-color: ${(props) => props.theme.light[0]};
  }
`;
