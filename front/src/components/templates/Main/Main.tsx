import React from "react";
import Navigation from "../../organisms/Navigation/Navigation";
import { Wrapper } from "./Main.styles";

const Main = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Wrapper>
      <Navigation></Navigation>
      {children}
    </Wrapper>
  );
};
export default Main;
