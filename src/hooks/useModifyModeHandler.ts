import { useEffect } from 'react';
import { modifyModeHandlerSelector, useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import isEqual from 'lodash.isequal';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import { ComponentType } from 'types';

const useModifyModeHandler = () => {
  const { modifyMode, pageNames } = useStateSelector(
    modifyModeHandlerSelector,
    isEqual
  );
  const {
    isOn,
    pageId,
    isAbsolute,
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
  const { setComponent, deleteComponent } = useActionsInventory();

  const createComponent = () => {
    const component = {
      componentType,
      isAbsolute,
      width,
      height,
      hLocation,
      vLocation,
    };

    if (pageId) {
      setComponent({ pageId, componentId, component });
    }

    // component moved outside the page and is over another page
    if (memoPageId && memoPageId !== pageId) {
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

    setComponent({ pageId, componentId, component: { ...dimensions } });
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
    isAbsolute,
    isPassing,
    createComponent,
    resetComponent,
    pageId,
    componentId,
  ]);
};

export default useModifyModeHandler;
