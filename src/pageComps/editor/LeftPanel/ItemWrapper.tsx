import styled, { css } from 'styled-components';
import useDragItem from 'hooks/useDragItem';
import { Paper } from '@mui/material';
import { flexCenter } from 'common/css';
import { motion } from 'framer-motion';
import useActionsField from 'state/actionHooks/useActionsField';
import { ComponentType } from 'types';

const Div = styled(Paper).attrs({ elevation: 6 })`
  position: relative;
  height: 80px;
  user-select: none;
  margin: 10px 0;

  ${flexCenter()};
`;

const MotionDiv = motion(Div);

interface ItemWrapperProps {
  children: React.ReactNode;
  item: { width: number; height: number; componentType: ComponentType };
}

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
  item,
  children,
  ...rest
}) => {
  const { setModifyMode } = useActionsField();

  const onDragPulled = () => {
    setModifyMode({ isOn: true, ...item });
  };

  const { initMouse, isDrag } = useDragItem(onDragPulled);

  return (
    <MotionDiv
      animate={{ scale: isDrag ? 1.05 : 1 }}
      transition={{
        type: 'spring',
        mass: 1,
        stiffness: 400,
        damping: 15,
        restSpeed: 0.0001,
        restDelta: 0.0001,
      }}
      // @ts-ignore
      onMouseDown={initMouse}
      {...rest}
    >
      {children}
    </MotionDiv>
  );
};
