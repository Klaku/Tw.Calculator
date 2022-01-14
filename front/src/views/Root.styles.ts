import styled from "styled-components";

export const Wrapper = styled.div`
  grid-template-columns: 2/2;
  grid-template-rows: 1/1;
  display: flex;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
`;
