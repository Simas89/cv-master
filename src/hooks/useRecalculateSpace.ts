import { store } from 'state';
import useCreateFreeSpace from './useCreateFreeSpace';

const getFilteredComps = (pageId: string) => {
  const comps = store.getState().inventory.pages[pageId].components;

  return Object.keys(comps).map((el) => {
    return {
      height: comps[el].dimensions.height,
      width: comps[el].dimensions.width,
      hLocation: comps[el].dimensions.hLocation,
      vLocation: comps[el].dimensions.vLocation,
      isAbsolute: comps[el].dimensions.isAbsolute,
    };
  });
};

const useRecalculateSpace = () => {
  const setSpace = useCreateFreeSpace();

  const recalculateSpace = (pageId: string) => {
    const filteredComps = getFilteredComps(pageId);
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
  };

  return recalculateSpace;
};

export default useRecalculateSpace;
