import React, { useEffect } from 'react';
import { modifyModeHandlerSelector, useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import isEqual from 'lodash.isequal';
import generateId from 'util/generateId';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ComponentType } from 'types';

const useModifyModeHandler = () => {
  const { modifyMode, pageNames } = useStateSelector(
    modifyModeHandlerSelector,
    isEqual
  );
  const {
    isOn,
    isPassing,
    componentType,
    pageId,
    width,
    height,
    hLocation,
    vLocation,
  } = modifyMode;

  const { setModifyMode, resetSlotCheck } = useActionsField();
  const { addComponent } = useActionsInventory();

  const createComponent = () => {
    const component = {
      componentType,
      width,
      height,
      hLocation,
      vLocation,
    };
    addComponent({ pageId, componentId: generateId(), component });
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (isPassing) {
        createComponent();
      }
      if (isOn) {
        setModifyMode({
          isOn: false,
          isPassing: false,
          componentType: ComponentType.NULL,
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
  }, [setModifyMode, isOn, isPassing, createComponent]);
};

export default useModifyModeHandler;
