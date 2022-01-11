import react from "react";
import styled, { ThemeProvider } from "styled-components";
import Navigation from "./../templates/navigation/Navigation";
import Panel from "../templates/panel/Panel";
import { theme as lightTheme } from "./../../providers/light.theme";
import { Switch, Route } from "react-router-dom";
import Recruitment from "./../organisms/Recruitment/Recruitment";
export default function Layout() {
  return (
    <Wraper>
      <ThemeProvider theme={lightTheme}>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Panel Title="Home">This is HomePage</Panel>
          </Route>
          <Route exact path="/recruitment">
            <Panel Title="Recruitment">
              <Recruitment />
            </Panel>
          </Route>
        </Switch>
      </ThemeProvider>
    </Wraper>
  );
}

export const Wraper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
