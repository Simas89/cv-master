import React, { useEffect } from 'react';
import { modifyModeHandlerSelector, useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import isEqual from 'lodash.isequal';
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
    memoPageId,
  } = modifyMode;

  const { setModifyMode, resetSlotCheck } = useActionsField();
  const { addComponent, deleteComponent } = useActionsInventory();

  const setSpace = useCreateFreeSpace();

  const createComponent = () => {
    const component = {
      componentType,
      timeStamp: null,
      width,
      height,
      hLocation,
      vLocation,
    };
    const componentsDimensions = [{ height, width, hLocation, vLocation }];

    if (pageId) {
      addComponent({ pageId, componentId, component });
    } else {
      setSpace({ isFree: false, pageId, componentsDimensions });
    }

    // component moved outside the page and needs to be creared from the current
    if (memoPageId && memoPageId !== pageId) {
      setSpace({ isFree: true, pageId: memoPageId, componentsDimensions });
      deleteComponent({ pageId: memoPageId, componentId });
    }
  };

  const resetComponent = (pageId: string) => {
    const dimensions = {
      width,
      height,
      hLocation: memoHLocation,
      vLocation: memoVLocation,
    };
    const componentsDimensions = [dimensions];
    const component = {
      componentType,
      ...dimensions,
    };
    addComponent({ pageId, componentId, component });
    setSpace({ isFree: false, pageId, componentsDimensions });
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (isOn) {
        if (isPassing) {
          createComponent();
        }
        if (!isPassing && memoize) {
          console.log('Reset comp');
          resetComponent(pageId || memoPageId);
        }
        setModifyMode({
          isOn: false,
          pageId: '',
          componentId: '',
          componentType: ComponentType.NULL,
          isPassing: false,
          memoize: false,
          memoPageId: '',
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
  }, [
    setModifyMode,
    isOn,
    isPassing,
    createComponent,
    resetComponent,
    pageId,
    componentId,
  ]);
};

export default useModifyModeHandler;
