import { useEffect } from 'react';
import { useStateSelector } from 'state';
import isEqual from 'lodash.isequal';
import useCreateFreeSpace from './useCreateFreeSpace';
import useActionsField from 'state/actionHooks/useActionsField';

const useRecalculateSpaceListener = (pageId: string) => {
  const filteredComps = useStateSelector(({ inventory }) => {
    const comps = inventory.pages[pageId].components;
    const filteredComps = Object.keys(comps).map((el) => {
      return {
        height: comps[el].dimensions.height,
        width: comps[el].dimensions.width,
        hLocation: comps[el].dimensions.hLocation,
        vLocation: comps[el].dimensions.vLocation,
        isAbsolute: comps[el].dimensions.isAbsolute,
      };
    });

    return filteredComps;
  }, isEqual);

  const setSpace = useCreateFreeSpace();
  const { resetBlockValue } = useActionsField();

  useEffect(() => {
    resetBlockValue({ pageId, blockKey: 'isFree', value: true });

    filteredComps
      .filter((el) => el.isAbsolute === false)
      .forEach((el) => {
        const componentsDimensions = [
          {
            height: el.height,
            width: el.width,
            hLocation: el.hLocation,
            vLocation: el.vLocation,
          },
        ];

        setSpace({ isFree: false, pageId, componentsDimensions });
      });
  }, [filteredComps]);
};

export default useRecalculateSpaceListener;
