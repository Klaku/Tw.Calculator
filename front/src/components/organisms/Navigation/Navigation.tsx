import React from "react";
import { StyledLink, Wrapper } from "./Navigation.styles";

export default function () {
  return (
    <Wrapper>
      <StyledLink to="/home">TW Apki</StyledLink>
      <StyledLink to="/recruit">Rekrutacja</StyledLink>
      <StyledLink to="/plan">Planer</StyledLink>
    </Wrapper>
  );
}
