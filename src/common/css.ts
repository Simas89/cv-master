import { css } from "styled-components";

export const flexCenterBetween = (direction = "row") => {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: space-between;
    align-items: center;
  `;
};

export const flexCenter = (direction = "row") => {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: center;
    align-items: center;
  `;
};
