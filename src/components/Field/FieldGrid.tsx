import React from 'react';
import { H_BLOCKS, V_BLOCKS } from 'state/reducers/field';
import { useStateSelector } from 'state/typedHooks';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  position: absolute;
  /* border: 1px solid gray; */
  z-index: -1;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  line {
    shape-rendering: crispEdges !important;
    stroke-width: 1px !important;
    stroke: rgba(0, 0, 0, 0.1);
  }
`;

const shift = (idx: number, size: number) => {
  if (idx === 0) {
    return '0px';
  }
  return `${idx * size}px`;
};

export const FieldGrid = () => {
  const blockSize = useStateSelector(({ field }) => field.blockSize);
  const showGrid = useStateSelector(({ field }) => field.showGrid);

  if (!showGrid) return null;

  return (
    <StyledSvg>
      {Array.apply(null, Array(H_BLOCKS + 1)).map((_, idx) => {
        return (
          <line
            key={'hKey' + idx}
            x1={shift(idx, blockSize)}
            y1='0'
            x2={shift(idx, blockSize)}
            y2={V_BLOCKS * blockSize}
          />
        );
      })}
      {Array.apply(null, Array(V_BLOCKS + 1)).map((_, idx) => {
        return (
          <line
            key={'hKey' + idx}
            x1='0'
            y1={shift(idx, blockSize)}
            x2={H_BLOCKS * blockSize}
            y2={shift(idx, blockSize)}
          />
        );
      })}
    </StyledSvg>
  );
};
