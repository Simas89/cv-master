import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from 'types';

interface Block {
  isFree: boolean;
  isAlive: boolean;
  isNew: boolean;
  isInModifyMode: boolean;
}

interface SetModifyModeProps {
  isOn?: boolean;
  pageId?: string;
  componentId?: string;
  componentType?: ComponentType;
  isPassing?: boolean;
  memoize?: boolean;
  memoPageId?: string;
  width?: number;
  height?: number;
  hLocation?: number;
  vLocation?: number;
}

interface ComponentDimensions {
  pageId: string;
  isFree: boolean;
  componentsDimensions: {
    height: number;
    width: number;
    hLocation: number;
    vLocation: number;
  }[];
}

enum fieldDimensionsWidth {
  MEDIUM = 794, //96 - 794
  LARGE = 992, //120 - 992
}
enum fieldDimensionsHeight {
  MEDIUM = 1123, //96 - 1123
  LARGE = 1403, //120 - 1403
}

interface FieldState {
  pages: {
    [key: string]: { field: Block[][] };
  };
  fieldDimensions: {
    width: fieldDimensionsWidth;
    height: fieldDimensionsHeight;
  };
  blockSize: number;
  modifyMode: {
    isOn: boolean;
    pageId: string;
    componentId: string;
    componentType: ComponentType;
    isPassing: boolean;
    width: number;
    height: number;
    hLocation: number;
    vLocation: number;
    memoize: boolean;
    memoPageId: string;
    memoHLocation: number;
    memoVLocation: number;
  };
  zoom: number;
  showGrid: boolean;
}

export const H_BLOCKS = 16;
export const V_BLOCKS = 23;
export const BLOCK_SIZE = 62;

const emptyBlock: Block = {
  isFree: true,
  isAlive: false,
  isNew: false,
  isInModifyMode: false,
};

const generateNewField = (): Block[][] => {
  const arr: any = [];
  for (let i = 0; i < H_BLOCKS; i++) {
    arr.push([emptyBlock]);
    for (let j = 1; j < V_BLOCKS; j++) {
      arr[i].push(emptyBlock);
    }
  }
  return arr;
};

const initialState: FieldState = {
  pages: {},
  fieldDimensions: {
    width: fieldDimensionsWidth.LARGE,
    height: fieldDimensionsHeight.LARGE,
  },
  blockSize: 62,
  modifyMode: {
    isOn: false,
    pageId: '',
    componentId: '',
    componentType: ComponentType.NULL,
    isPassing: false,
    width: 0,
    height: 0,
    hLocation: 0,
    vLocation: 0,
    memoize: false,
    memoPageId: '',
    memoHLocation: 0,
    memoVLocation: 0,
  },
  zoom: 0.5,
  showGrid: true,
};

export const slice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    addNewFieldPage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      const page = {
        field: generateNewField(),
      };
      state.pages[pageId] = page;
    },

    deletePage: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.pages[id];
    },

    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },

    setShowGrid: (state, action: PayloadAction<boolean>) => {
      state.showGrid = action.payload;
    },

    setBlockSize: (state, action: PayloadAction<number>) => {
      state.blockSize = action.payload;
    },

    setModifyMode: (state, action: PayloadAction<SetModifyModeProps>) => {
      const currentModifyMode = current(state.modifyMode);

      const memoInit: {
        memoPageId?: string;
        memoHLocation?: number;
        memoVLocation?: number;
      } = {};
      const memoize = action.payload.memoize;
      if (memoize) {
        memoInit.memoPageId = action.payload.pageId;
        memoInit.memoHLocation = action.payload.hLocation;
        memoInit.memoVLocation = action.payload.vLocation;
      }

      state.modifyMode = {
        ...currentModifyMode,
        ...action.payload,
        ...memoInit,
      };
    },

    checkSlot: (
      state,
      action: PayloadAction<{ pageId: string; hBlock: number; vBlock: number }>
    ) => {
      const { pageId, hBlock, vBlock } = action.payload;
      const placeholderWidth = state.modifyMode.width;
      const placeholderHeight = state.modifyMode.height;
      const currentField = state.pages[pageId].field;

      let checkTestPassing = true;

      // Test outside bounds
      if (hBlock + placeholderWidth > H_BLOCKS) {
        checkTestPassing = false;
      }
      if (vBlock + placeholderHeight > V_BLOCKS) {
        checkTestPassing = false;
      }

      for (let i = 0; i < H_BLOCKS; i++) {
        for (let j = 0; j < V_BLOCKS; j++) {
          const conditionHor = i - hBlock < placeholderWidth && i >= hBlock;
          const conditionVer = j - vBlock < placeholderHeight && j >= vBlock;

          // Reset previous
          currentField[i][j].isInModifyMode = false;

          // Test if all blocks free
          if (conditionHor && conditionVer) {
            currentField[i][j].isInModifyMode = true;
            if (!currentField[i][j].isFree) {
              checkTestPassing = false;
            }
          }
        }
      }

      state.modifyMode.hLocation = hBlock;
      state.modifyMode.vLocation = vBlock;
      state.modifyMode.isPassing = checkTestPassing;
    },

    setComponentSpaceIsFree: (
      state,
      action: PayloadAction<ComponentDimensions>
    ) => {
      const componentsDimensions = action.payload.componentsDimensions;
      const pageId = action.payload.pageId;
      const isFree = action.payload.isFree;

      componentsDimensions.forEach((el) => {
        const height = el.height;
        const width = el.width;
        const hLocation = el.hLocation;
        const vLocation = el.vLocation;

        // console.log(el);

        for (let i = 0; i < H_BLOCKS; i++) {
          for (let j = 0; j < V_BLOCKS; j++) {
            const conditionHor = i - hLocation < width && i >= hLocation;
            const conditionVer = j - vLocation < height && j >= vLocation;

            if (conditionHor && conditionVer) {
              state.pages[pageId].field[i][j].isFree = isFree;
            }
          }
        }
      });
    },

    resetSlotCheck: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      const currentField = state.pages[pageId].field;
      for (let i = 0; i < H_BLOCKS; i++) {
        for (let j = 0; j < V_BLOCKS; j++) {
          currentField[i][j].isInModifyMode = false;
        }
      }
    },
  },
});

export const {
  addNewFieldPage,
  deletePage,
  setZoom,
  setShowGrid,
  setBlockSize,
  setModifyMode,
  checkSlot,
  setComponentSpaceIsFree,
  resetSlotCheck,
} = slice.actions;

export default slice.reducer;
