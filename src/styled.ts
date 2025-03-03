import styled from "styled-components";

export const ButtonStyled = styled.button<{ exclude?: boolean }>`
  all: unset;
  transition: 0.5s;
  cursor: pointer;
  background-color: ${(props) => (props.exclude ? "red" : "blue")};
  margin: 7px;
  border-radius: 20px;
  padding: 16px 20px;

  &:hover {
    background-color: red;
  }
`;

export const SpanStyled = styled.span``;
export const Box = styled.section``;
