import react from "react";
import styled, { ThemeProvider } from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Wrapper } from "./Root.styles";
import Main from "components/templates/Main/Main";
export default function Root() {
  return (
    <Main>
      <Wrapper>
          Hello World
      </Wrapper>
    </Main>
  );
}
