import { MiniMenu } from 'components/MiniMenu';
import React, { useState } from 'react';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled, { css } from 'styled-components';
import { ComponentType } from 'types';

const Div = styled.div<ComponentWrapperPosition>`
  position: absolute;
  border: 1px solid black;
  background-color: gray;

  ${({ blockSize, width, height, hLocation, vLocation, isModifyModeOn }) => css`
    width: ${blockSize * width}px;
    height: ${blockSize * height}px;
    left: ${blockSize * hLocation}px;
    top: ${blockSize * vLocation}px;
    z-index: ${isModifyModeOn ? -1 : 1};
  `};
`;

interface ComponentWrapperPosition {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
  blockSize: number;
  isModifyModeOn: boolean;
}
interface ComponentWrapperProps {
  pageId: string;
  componentType: ComponentType;
  componentId: string;
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  pageId,
  componentType,
  componentId,
  height,
  width,
  hLocation,
  vLocation,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const blockSize = useStateSelector(({ field }) => field.blockSize);
  const isModifyModeOn = useStateSelector(({ field }) => field.modifyMode.isOn);

  const { deleteComponent } = useActionsInventory();
  const { setComponentSpaceIsFree } = useActionsField();

  const removeComponent = () => {
    const componentsDimensions = [{ height, width, hLocation, vLocation }];
    setComponentSpaceIsFree({ isFree: true, pageId, componentsDimensions });
    deleteComponent({ pageId, componentId });
  };
  return (
    <Div
      blockSize={blockSize}
      height={height}
      width={width}
      hLocation={hLocation}
      vLocation={vLocation}
      isModifyModeOn={isModifyModeOn}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {showMenu && (
        <MiniMenu
          removeComponent={removeComponent}
          isShifted={vLocation === 0}
        />
      )}
    </Div>
  );
};

export default ComponentWrapper;
