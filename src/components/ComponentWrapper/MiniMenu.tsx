import React from 'react';
import styled from 'styled-components';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import useDragItem from 'hooks/useDragItem';
import { flexCenter } from 'common/css';

const Div = styled.div`
  width: 60px;
  height: 60px;
  position: absolute;
  ${flexCenter()};

  /* border: 1px solid black; */
  opacity: 0.5;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  .icon {
    transform: scale(1.5) rotateZ(90deg);
  }
`;

interface MiniMenuProps {
  onDragPulled: () => void;
  isShifted: boolean;
}

export const MiniMenu: React.FC<MiniMenuProps> = ({ onDragPulled }) => {
  const { initMouse } = useDragItem(5, onDragPulled);

  return (
    <Div
      className='floating-btn drag-btn'
      // @ts-ignore
      onMouseDown={initMouse}
    >
      <DragIndicatorIcon className='icon' />
    </Div>
  );
};
