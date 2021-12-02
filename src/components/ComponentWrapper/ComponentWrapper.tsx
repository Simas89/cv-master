import { MiniMenu } from './';
import React from 'react';
import { useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import styled, { css } from 'styled-components';
import isEqual from 'lodash.isequal';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import useCreateFreeSpace from 'hooks/useCreateFreeSpace';

interface ComponentWrapperPosition {
  height: number;
  width: number;
  hLocation: number;
  vLocation: number;
  blockSize: number;
  isModifyModeOn: boolean;
  isBeingDragged: boolean;
  isSelected: boolean;
}

const Div = styled.div<ComponentWrapperPosition>`
  position: absolute;
  background-color: lightgray;

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
        height: comp.height,
        width: comp.width,
        hLocation: comp.hLocation,
        vLocation: comp.vLocation,
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

  const { height, width, hLocation, vLocation, componentType } = component;

  const { setSelectedComponent } = useActionsInventory();
  const { setModifyMode } = useActionsField();
  const setSpace = useCreateFreeSpace();

  useIsomorphicLayoutEffect(() => {
    setSpace({ isFree: false, pageId, componentsDimensions });
  }, [height, width, hLocation, vLocation]);

  const onDragPulled = () => {
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
      onClick={selectComponent}
    >
      {checkIfSelected() && (
        <MiniMenu onDragPulled={onDragPulled} isShifted={vLocation === 0} />
      )}
    </Div>
  );
};

export default ComponentWrapper;
