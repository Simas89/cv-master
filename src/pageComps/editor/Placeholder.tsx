import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import useMousePosition from "hooks/useMousePosition";
import { placeholderSelector, useStateSelector } from "state";
import useModifyModeHandler from "hooks/useModifyModeHandler";
import isEqual from "lodash.isequal";

interface DivProps {
  blockSize: number;
  width: number;
  height: number;
  zoom: number;
}

const Div = styled.div<DivProps>`
  pointer-events: none;
  /* border: 1px solid red; */
  position: absolute;
  z-index: 10;

  ${(p) => css`
    top: -${(p.blockSize / 2) * p.zoom}px;
    left: -${(p.blockSize / 2) * p.zoom}px;
  `}

  .item {
    height: 100%;
    width: 100%;
    border: 1px solid green;
    position: absolute;

    ${(p) => css`
      height: ${p.height}px;
      width: ${p.width}px;
      zoom: ${p.zoom * 100}%;
    `}
  }
`;

const MotionDiv = motion(Div);

const Placeholder = () => {
  const { blockSize, vBlocks, hBlocks, isOn } = useStateSelector(
    placeholderSelector,
    isEqual
  );
  const zoom = useStateSelector(({ field }) => field.zoom);
  const { x, y } = useMousePosition();

  useModifyModeHandler();

  if (!isOn) return null;
  return (
    <MotionDiv
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{ type: "spring", mass: 0.01, stiffness: 100, damping: 3 }}
      blockSize={blockSize}
      width={blockSize * hBlocks}
      height={blockSize * vBlocks}
      zoom={zoom}
    >
      <div className="item"></div>
    </MotionDiv>
  );
};

export default React.memo(Placeholder);
