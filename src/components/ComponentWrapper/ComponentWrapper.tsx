import React from 'react';
import { MiniMenu } from './';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled, { css } from 'styled-components';
import isEqual from 'lodash.isequal';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';
import { flexCenter } from 'common/css';

interface WrapperPosition {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
  blockSize: number;
  isBeingDragged: boolean;
}
interface ComponentWrapperPosition extends WrapperPosition {
  isModifyModeOn: boolean;
  isAbsolute: boolean;
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
    zIndex,
  }) => css`
    width: ${blockSize * width}px;
    height: ${blockSize * height}px;
    left: ${blockSize * hLocation}px;
    top: ${blockSize * vLocation}px;

    opacity: ${isBeingDragged ? 0.5 : 1};
    z-index: ${isModifyModeOn ? zIndex - 100 : zIndex + 1};
    pointer-events: ${isModifyModeOn && 'none'};
  `};

  .background {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background-color: ${({ isAbsolute }) =>
      isAbsolute ? '#D9DDDC' : '#999DA0'};
  }
  .body {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    ${flexCenter()}
  }
`;

const Menu = styled.div<WrapperPosition>`
  position: absolute;
  z-index: 1000;

  ${({ blockSize, width, height, hLocation, vLocation, isBeingDragged }) => css`
    left: ${blockSize * hLocation}px;
    top: ${blockSize * vLocation}px;
    opacity: 1;
    ${isBeingDragged &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};

    .select-indicator {
      position: absolute;
      border: 1px solid green;

      width: ${blockSize * width}px;
      height: ${blockSize * height}px;
      pointer-events: none;
    }
  `};
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

  const { setSelectedComponent } = useActionsInventory();
  const { setModifyMode } = useActionsField();
  const setSpace = useCreateFreeSpace();

  const onDragPulled = () => {
    setSpace({ isFree: true, pageId, componentsDimensions });

    setModifyMode({
      isOn: true,
      memoize: true,
      isAbsolute,
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
    <>
      {checkIfSelected() && (
        <Menu
          blockSize={blockSize}
          height={height}
          width={width}
          hLocation={hLocation}
          vLocation={vLocation}
          isBeingDragged={isBeingDragged}
        >
          <MiniMenu onDragPulled={onDragPulled} isShifted={vLocation === 0} />
          <div className='select-indicator' />
        </Menu>
      )}
      <Div
        blockSize={blockSize}
        height={height}
        width={width}
        hLocation={hLocation}
        vLocation={vLocation}
        isModifyModeOn={isModifyModeOn}
        isBeingDragged={isBeingDragged}
        isAbsolute={isAbsolute}
        zIndex={zIndex}
        onClick={selectComponent}
      >
        <div className='background'></div>
        <div className='body'>BODY</div>
      </Div>
    </>
  );
};

export default ComponentWrapper;
