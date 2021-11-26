import { flexCenter } from "common/css";
import React from "react";
import { blockSelector } from "state";
import useActionsField from "state/actionHooks/useActionsField";
import { useStateSelector } from "state/typedHooks";
import styled, { css } from "styled-components";
import isEqual from "lodash.isequal";

interface DivProps {
  size: number;
  isAlive: boolean;
  isFree: boolean;
  highlightFreeSpace: boolean;
  isPassing: boolean;
  isInModifyMode: boolean;
}

const Div = styled.div<DivProps>`
  position: relative;
  display: grid;

  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `};

  ${flexCenter()};

  .indicator {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .isfree-indicator {
    background-color: ${({ isFree, highlightFreeSpace, isInModifyMode }) =>
      highlightFreeSpace && !isInModifyMode
        ? isFree
          ? "RGBA(0, 171, 101,0.1)"
          : "RGBA(227, 24, 54,0.1)"
        : "RGBA(0, 0, 0,0)"};
  }

  .ispassing-indicator {
    background-color: ${({ isPassing, highlightFreeSpace, isInModifyMode }) =>
      highlightFreeSpace && isInModifyMode
        ? isPassing
          ? "RGBA(0, 171, 101,0.3)"
          : "RGBA(227, 24, 54,0.3)"
        : "RGBA(0, 0, 0,0)"};
  }
`;

interface BlockProps {
  hBlock: number;
  vBlock: number;
  pageId: string;
}

export const Block = React.memo<BlockProps>(({ hBlock, vBlock, pageId }) => {
  const { blockSize, isOn, isPassing, isInModifyMode, isAlive, isFree } =
    useStateSelector(blockSelector({ hBlock, vBlock, pageId }), isEqual);

  const { checkSlot, setIsFree } = useActionsField();

  const handleClick = () => {
    setIsFree({ vBlock, hBlock, pageId, free: !isFree });
  };

  const handleMouseEnter = () => {
    if (isOn) {
      checkSlot({ pageId, vBlock, hBlock });
    }
  };

  return (
    <Div
      size={blockSize}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      isAlive={isAlive}
      isFree={isFree}
      isInModifyMode={isInModifyMode}
      highlightFreeSpace={isOn}
      isPassing={isPassing}
    >
      <div className="isfree-indicator indicator" />
      <div className="ispassing-indicator indicator" />
    </Div>
  );
});
