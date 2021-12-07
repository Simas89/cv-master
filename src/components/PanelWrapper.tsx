import styled, { css } from 'styled-components';

interface PanelWraperProps {
  side: 'LEFT' | 'RIGHT';
}
const PanelWraper = styled.div<PanelWraperProps>`
  padding: 15px;
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  /* background-color: #122c43;
  color: white; */
  ${({ side }) =>
    side === 'LEFT'
      ? css`
          border-right: 1px solid gray;
        `
      : css`
          border-left: 1px solid gray;
        `}
`;

export default PanelWraper;
