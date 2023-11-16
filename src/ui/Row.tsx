import styled, { css } from "styled-components";

export const Row = styled.div<{
  type?: "horizontal" | "vertical";
}>`
  display: flex;
  ${(props) =>
    props.type === "horizontal"
      ? css`
          align-items: center;
          justify-content: space-between;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;

Row.defaultProps = {
  type: "vertical",
};
