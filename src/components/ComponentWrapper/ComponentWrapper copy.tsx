import React from 'react';
import { MiniMenu } from './';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled, { css } from 'styled-components';
import isEqual from 'lodash.isequal';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';

interface ComponentWrapperPosition {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
  blockSize: number;
  isModifyModeOn: boolean;
  isBeingDragged: boolean;
  isAbsolute: boolean;
  isSelected: boolean;
  zIndex: number;
}

const Div = styled.div<ComponentWrapperPosition>`
  position: absolute;

  ${({
    blockSize,
    width,
    height,
    hLocation,
    vLocation,
    isModifyModeOn,
    isBeingDragged,
    isSelected,
  }) => css`
    width: ${blockSize * width}px;
    height: ${blockSize * height}px;
    left: ${blockSize * hLocation}px;
    top: ${blockSize * vLocation}px;
    z-index: ${isModifyModeOn ? -1 : 1};
    opacity: ${isBeingDragged ? 0.5 : 1};
    border: ${isSelected ? '1px solid green' : 'none'};
  `};

  .background {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: ${({ isAbsolute }) =>
      isAbsolute ? '#D9DDDC' : '#999DA0'};
  }
  z-index: ${({ zIndex }) => zIndex};

  /* transition: 0.2s; */
`;

interface ComponentWrapperProps {
  pageId: string;
  componentId: string;
  printMode: boolean | undefined;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  pageId,
  componentId,
  printMode,
}) => {
  const {
    blockSize,
    isModifyModeOn,
    isBeingDragged,
    selectedComponent,
    component,
    componentsDimensions,
  } = useStateSelector(({ inventory, field }) => {
    const comp = inventory.pages[pageId].components[componentId];
    return {
      blockSize: field.blockSize,
      isModifyModeOn: field.modifyMode.isOn,
      isBeingDragged: field.modifyMode.componentId === componentId,
      selectedComponent: inventory.selectedComponent,
      component: {
        componentType: comp.componentType,
        isAbsolute: comp.isAbsolute,
        height: comp.height,
        width: comp.width,
        hLocation: comp.hLocation,
        vLocation: comp.vLocation,
        zIndex: comp.zIndex,
      },
      componentsDimensions: [
        {
          height: comp.height,
          width: comp.width,
          hLocation: comp.hLocation,
          vLocation: comp.vLocation,
        },
      ],
    };
  }, isEqual);

  const { height, width, hLocation, vLocation, isAbsolute, zIndex } = component;

  console.log(zIndex);

  const { setSelectedComponent } = useActionsInventory();
  const { setModifyMode } = useActionsField();
  const setSpace = useCreateFreeSpace();

  const onDragPulled = () => {
    setSpace({ isFree: true, pageId, componentsDimensions });

    setModifyMode({
      isOn: true,
      memoize: true,
      componentId,
      pageId,
      height,
      width,
      hLocation,
      vLocation,
    });
  };

  const selectComponent = () => {
    setSelectedComponent({ pageId, componentId });
  };

  const checkIfSelected = () => {
    if (printMode) return false;
    if (
      componentId === selectedComponent.componentId &&
      pageId === selectedComponent.pageId
    )
      return true;
    return false;
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
      isSelected={checkIfSelected()}
      isAbsolute={isAbsolute}
      zIndex={zIndex}
      onClick={selectComponent}
    >
      <div className='background'></div>
      {checkIfSelected() && (
        <MiniMenu onDragPulled={onDragPulled} isShifted={vLocation === 0} />
      )}
    </Div>
  );
};

export default ComponentWrapper;
