import { useEffect } from 'react';
import { useStateSelector } from 'state';
import isEqual from 'lodash.isequal';
import useCreateFreeSpace from './useCreateFreeSpace';

const useRecalculateSpaceListener = (pageId: string) => {
  const filteredComps = useStateSelector(({ inventory }) => {
    const comps = inventory.pages[pageId].components;
    const filteredComps = Object.keys(comps)
      .map((el) => {
        return {
          height: comps[el].height,
          width: comps[el].width,
          hLocation: comps[el].hLocation,
          vLocation: comps[el].vLocation,
          isAbsolute: comps[el].isAbsolute,
        };
      })
      //   @ts-ignore
      .sort((a, b) => b.isAbsolute - a.isAbsolute);

    return filteredComps;
  }, isEqual);

  const setSpace = useCreateFreeSpace();

  useEffect(() => {
    filteredComps.forEach((el) => {
      const componentsDimensions = [
        {
          height: el.height,
          width: el.width,
          hLocation: el.hLocation,
          vLocation: el.vLocation,
        },
      ];

      setSpace({ isFree: el.isAbsolute, pageId, componentsDimensions });
    });
  }, [filteredComps]);
};

export default useRecalculateSpaceListener;
