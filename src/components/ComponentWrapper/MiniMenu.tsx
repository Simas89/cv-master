import React from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useStateSelector } from 'state';
import useDragItem from 'hooks/useDragItem';

interface DivProps {
  isShifted: boolean;
  blockSize: number;
}
const Div = styled.div<DivProps>`
  display: flex;
  border: 1px solid red;
  /* height: 50px; */
  width: 100px;
  position: relative;
  ${({ blockSize, isShifted }) =>
    css`
      height: ${isShifted ? blockSize - 10 : blockSize}px;
      top: ${isShifted ? 10 : 0}px;
    `}

  .MuiIconButton-root {
    background-color: rgba(0, 0, 0, 0);
  }

  .floating-btn {
    opacity: 0.5;
    transform: scale(0.8);
    transition: 0.1s;
    &:hover {
      opacity: 1;
    }
  }

  .delete-btn {
    color: black;
    &:hover {
      color: red;
    }
  }
  .drag-btn {
    transform: rotateZ(90deg);
  }
`;

interface MiniMenuProps {
  removeComponent: () => void;
  onDragPulled: () => void;
  isShifted: boolean;
}

export const MiniMenu: React.FC<MiniMenuProps> = ({
  isShifted,
  removeComponent,
  onDragPulled,
}) => {
  const blockSize = useStateSelector(({ field }) => field.blockSize);
  const { initMouse } = useDragItem(10, onDragPulled);

  return (
    <Div isShifted={isShifted} blockSize={blockSize}>
      {/* @ts-ignore */}
      <IconButton
        size='small'
        className='floating-btn drag-btn'
        color='secondary'
        onMouseDown={initMouse}
      >
        <DragIndicatorIcon />
      </IconButton>
      <IconButton
        size='small'
        onClick={removeComponent}
        className='floating-btn delete-btn'
        color='secondary'
      >
        <HighlightOffIcon />
      </IconButton>
    </Div>
  );
};
