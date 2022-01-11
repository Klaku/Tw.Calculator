import react from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <Wraper>
      <NavigationLink to="/">Home</NavigationLink>
      <NavigationLink to="/recruitment">Recruitment</NavigationLink>
    </Wraper>
  );
}

export const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: ${(props) => props.theme.main_color[4]};
  color: ${(props) => props.theme.light[0]};
  padding: 0;
  margin: 0;
  height: 100vh;
  max-height: 100vh;
  padding-top: 50px;
`;

export const NavigationLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.2rem;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.main_color[3]};
  }
`;
