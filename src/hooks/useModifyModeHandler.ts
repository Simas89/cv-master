import { useEffect } from 'react';
import { modifyModeHandlerSelector, useStateSelector } from 'state';
import useActionsField from 'state/actionHooks/useActionsField';
import isEqual from 'lodash.isequal';
import useActionsInventory from 'state/actionHooks/useActionsInventory';
import useRecalculateSpace from './useRecalculateSpace';

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

  const { setModifyMode, resetBlockValue } = useActionsField();
  const { addComponent, setComponentDimensions, deleteComponent } =
    useActionsInventory();
  const recalculateSpace = useRecalculateSpace();

  const createNewComponent = () => {
    const component = {
      componentType,
      location: {
        hLocation,
        vLocation,
        isAbsolute,
      },
    };

    if (pageId) {
      addComponent({ pageId, component });
    }
  };

  const setOldComponent = () => {
    const dimensions = {
      hLocation,
      vLocation,
    };

    if (pageId) {
      setComponentDimensions({ pageId, memoPageId, componentId, dimensions });
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

    setComponentDimensions({
      pageId,
      componentId,
      dimensions,
    });
    recalculateSpace(pageId);
  };

  useEffect(() => {
    const onMouseUp = () => {
      if (!isOn) return;

      if (isPassing) {
        if (componentId) {
          setOldComponent();
        } else {
          createNewComponent();
        }
      }
      if (!isPassing && memoize) {
        // console.log('Reset comp');
        resetComponent(pageId || memoPageId);
      }
      setModifyMode({
        isOn: false,
        isPassing: false,
        pageId: '',
        componentId: '',
        memoize: false,
      });

      pageNames.forEach((el) =>
        resetBlockValue({
          pageId: el,
          blockKey: 'isInModifyMode',
          value: false,
        })
      );
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
    setOldComponent,
    createNewComponent,
    resetComponent,
    pageId,
    componentId,
  ]);
};

export default useModifyModeHandler;
