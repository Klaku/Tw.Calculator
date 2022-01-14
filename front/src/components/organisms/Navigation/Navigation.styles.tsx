import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkGray};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px 0;
  grid-row: 1/1;
  grid-column: 1/2;
`;

const activeClassName = "active-link";
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  padding: 10px 20px;
  position: relative;

  &.${activeClassName} {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    content: "";
    position: absolute;
    width: 3px;
    height: 100%;
    right: 0;
    top: 0;
    background-color: ${({ theme }) => theme.colors.lightMain};
  }
`;
