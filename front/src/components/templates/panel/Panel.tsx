import React from "react";
import react from "react";
import styled from "styled-components";

interface IProps {
  Title: string;
}
export default function Panel(props: React.PropsWithChildren<IProps>) {
  return (
    <Wraper>
      <TitleContainer>{props.Title}</TitleContainer>
      {props.children}
    </Wraper>
  );
}

export const Wraper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: calc(100vw - 200px);
  background-color: ${(props) => props.theme.light[3]};
  padding: 25px 15px;
`;
export const TitleContainer = styled.div`
  display: flex;
  font-size: 2rem;
  padding-bottom: 20px;
  margin: 0 -15px;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.dark[4]};
`;
