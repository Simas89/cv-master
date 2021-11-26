import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from "reselect";
import { RootState } from "./store";
import isEqual from "lodash.isequal";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

interface BlockSelectorProps {
  hBlock: number;
  vBlock: number;
  pageId: string;
}

export const pagesSelector = createSelector(
  (state: RootState) => state.inventory.pages,
  (pages) =>
    Object.keys(pages)
      .map((k) => {
        return {
          pageId: k,
          order: pages[k].order,
        };
      })
      .sort((a, b) => a.order - b.order)
);

export const blockSelector = ({ hBlock, vBlock, pageId }: BlockSelectorProps) =>
  createSelector(
    (state: RootState) => state.field,
    (field) => {
      return {
        blockSize: field.blockSize,
        isOn: field.modifyMode.isOn,
        isPassing: field.modifyMode.isPassing,
        isInModifyMode:
          field.pages[pageId].field[hBlock][vBlock].isInModifyMode,
        isAlive: field.pages[pageId].field[hBlock][vBlock].isAlive,
        isFree: field.pages[pageId].field[hBlock][vBlock].isFree,
      };
    }
  );

export const placeholderSelector = createSelector(
  (state: RootState) => state.field,
  (field) => {
    return {
      blockSize: field.blockSize,
      hBlocks: field.modifyMode.width,
      vBlocks: field.modifyMode.height,
      isOn: field.modifyMode.isOn,
    };
  }
);

export const modifyModeHandlerSelector = createSelector(
  (state: RootState) => state.field,
  (field) => {
    return {
      modifyMode: field.modifyMode,
      pageNames: Object.keys(field.pages).map((k) => k),
    };
  }
);
