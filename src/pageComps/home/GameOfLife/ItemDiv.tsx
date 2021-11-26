import { flexCenter } from "common/css";
import React from "react";
import useActionsGameOfLife from "state/actionHooks/useActionsGameOfLife";
import { useStateSelector } from "state/typedHooks";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

interface ItemDivProps {
  isAlive: boolean;
  blockSize: number;
}

const ItemDiv = styled.div<ItemDivProps>`
  border-radius: 20%;
  ${flexCenter()};

  background-color: ${({ isAlive }) =>
    isAlive ? "RGBA(0, 171, 101,0.5)" : "rgba(0, 0, 0, 0)"};

  ${({ blockSize }) => css`
    width: ${blockSize}px;
    height: ${blockSize}px;
  `};
`;

const MotionItemDiv = motion(ItemDiv);

interface ItemProps {
  hBlock: number;
  vBlock: number;
}

const Item = React.memo<ItemProps>(({ hBlock, vBlock }) => {
  const isAlive = useStateSelector(
    ({ gameOfLife }) => gameOfLife.value[hBlock][vBlock].isAlive
  );
  const blockSize = useStateSelector(({ gameOfLife }) => gameOfLife.blockSize);
  const { setAlive } = useActionsGameOfLife();

  const handleMouseEnter = () => {
    setAlive({ vBlock, hBlock, alive: true });
  };

  return (
    <MotionItemDiv
      animate={{
        opacity: isAlive ? 1 : 0.3,
      }}
      transition={{ duration: isAlive ? 2 : 0 }}
      onMouseEnter={handleMouseEnter}
      isAlive={isAlive}
      blockSize={blockSize}
    ></MotionItemDiv>
  );
});

export default Item;
