import React, { useEffect } from 'react';
import { modifyModeHandlerSelector, useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import isEqual from 'lodash.isequal';
import generateId from 'util/generateId';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ComponentType } from 'types';
import useCreateFreeSpace from './useCreateFreeSpace';

const useModifyModeHandler = () => {
  const { modifyMode, pageNames } = useStateSelector(
    modifyModeHandlerSelector,
    isEqual
  );
  const {
    isOn,
    pageId,
    isPassing,
    componentId,
    componentType,
    memoize,
    width,
    height,
    hLocation,
    vLocation,
    memoHLocation,
    memoVLocation,
  } = modifyMode;

  const { setModifyMode, resetSlotCheck } = useActionsField();
  const { addComponent } = useActionsInventory();

  const setSpace = useCreateFreeSpace();

  const createComponent = () => {
    const componentIdChecked = componentId ? componentId : generateId();

    const component = {
      componentType,
      width,
      height,
      hLocation,
      vLocation,
    };
    addComponent({ pageId, componentId: componentIdChecked, component });
  };

  const resetComponent = () => {
    const dimensions = {
      width,
      height,
      hLocation: memoHLocation,
      vLocation: memoVLocation,
    };
    const component = {
      componentType,
      ...dimensions,
    };
    addComponent({ pageId, componentId, component });

    const componentsDimensions = [dimensions];
    setSpace({ isFree: false, pageId, componentsDimensions });
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (isPassing) {
        createComponent();
      }
      if (!isPassing && memoize) {
        console.log('Reset comp');
        resetComponent();
      }
      if (isOn) {
        setModifyMode({
          isOn: false,
          pageId: '',
          componentId: '',
          componentType: ComponentType.NULL,
          isPassing: false,
          memoize: false,
          width: 0,
          height: 0,
          hLocation: 0,
          vLocation: 0,
        });

        pageNames.forEach((el) => resetSlotCheck(el));
      }
    };

    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [setModifyMode, isOn, isPassing, createComponent, resetComponent]);
};

export default useModifyModeHandler;
