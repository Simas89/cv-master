import { MiniMenu } from './';
import React, { useState } from 'react';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled, { css } from 'styled-components';
import isEqual from 'lodash.isequal';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';

const Div = styled.div<ComponentWrapperPosition>`
  position: absolute;
  border: 1px solid black;
  background-color: gray;

  ${({
    blockSize,
    width,
    height,
    hLocation,
    vLocation,
    isModifyModeOn,
    isBeingDragged,
  }) => css`
    width: ${blockSize * width}px;
    height: ${blockSize * height}px;
    left: ${blockSize * hLocation}px;
    top: ${blockSize * vLocation}px;
    z-index: ${isModifyModeOn ? -1 : 1};
    opacity: ${isBeingDragged ? 0.5 : 1};
  `};

  transition: 0.2s;
`;

interface ComponentWrapperPosition {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
  blockSize: number;
  isModifyModeOn: boolean;
  isBeingDragged: boolean;
}
interface ComponentWrapperProps {
  pageId: string;
  componentId: string;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  pageId,
  componentId,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const { blockSize, isModifyModeOn, isBeingDragged, component } =
    useStateSelector(({ inventory, field }) => {
      const comp = inventory.pages[pageId].components[componentId];
      return {
        blockSize: field.blockSize,
        isModifyModeOn: field.modifyMode.isOn,
        isBeingDragged: field.modifyMode.componentId === componentId,
        component: {
          componentType: comp.componentType,
          height: comp.height,
          width: comp.width,
          hLocation: comp.hLocation,
          vLocation: comp.vLocation,
        },
      };
    }, isEqual);

  const { height, width, hLocation, vLocation, componentType } = component;

  const { deleteComponent } = useActionsInventory();
  const { setModifyMode } = useActionsField();

  const setSpace = useCreateFreeSpace();

  useIsomorphicLayoutEffect(() => {
    const componentsDimensions = [
      {
        height,
        width,
        hLocation,
        vLocation,
      },
    ];
    setSpace({ isFree: false, pageId, componentsDimensions });
  }, [height, width, hLocation, vLocation]);

  const removeComponent = () => {
    const componentsDimensions = [{ height, width, hLocation, vLocation }];
    setSpace({ isFree: true, pageId, componentsDimensions });
    deleteComponent({ pageId, componentId });
  };

  const onDragPulled = () => {
    const componentsDimensions = [{ height, width, hLocation, vLocation }];
    setSpace({ isFree: true, pageId, componentsDimensions });

    setModifyMode({
      isOn: true,
      memoize: true,
      componentId,
      pageId,
      componentType,
      height,
      width,
      hLocation,
      vLocation,
    });
  };

  return (
    <Div
      blockSize={blockSize}
      height={height}
      width={width}
      hLocation={hLocation}
      vLocation={vLocation}
      isModifyModeOn={isModifyModeOn}
      isBeingDragged={isBeingDragged}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {showMenu && (
        <MiniMenu
          removeComponent={removeComponent}
          onDragPulled={onDragPulled}
          isShifted={vLocation === 0}
        />
      )}
    </Div>
  );
};

export default ComponentWrapper;
