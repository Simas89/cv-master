import { store } from 'state';
import useCreateFreeSpace from './useCreateFreeSpace';

const getFilteredComps = (pageId: string) => {
  const comps = store.getState().inventory.pages[pageId].components;

  return (
    Object.keys(comps)
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
      .sort((a, b) => b.isAbsolute - a.isAbsolute)
  );
};

const useRecalculateSpace = () => {
  const setSpace = useCreateFreeSpace();

  const recalculateSpace = (pageId: string) => {
    const filteredComps = getFilteredComps(pageId);
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
  };

  return recalculateSpace;
};

export default useRecalculateSpace;
