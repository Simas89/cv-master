import { ComponentType } from 'types';

interface ItemsData {
  [key: string]: {
    componentType: ComponentType;
    dimensions: {
      width: number;
      height: number;
      MIN_WIDTH: number;
      MAX_WIDTH: number;
      MIN_HEIGHT: number;
      MAX_HEIGHT: number;
    };
  };
}

export const itemsData: ItemsData = {
  ITEM_A: {
    componentType: ComponentType.ITEM_A,
    dimensions: {
      width: 5,
      height: 2,
      MIN_WIDTH: 3,
      MAX_WIDTH: 10,
      MIN_HEIGHT: 2,
      MAX_HEIGHT: 5,
    },
  },
  ITEM_B: {
    componentType: ComponentType.ITEM_B,
    dimensions: {
      width: 7,
      height: 3,
      MIN_WIDTH: 4,
      MAX_WIDTH: 12,
      MIN_HEIGHT: 2,
      MAX_HEIGHT: 7,
    },
  },
  ITEM_C: {
    componentType: ComponentType.ITEM_C,
    dimensions: {
      width: 10,
      height: 5,
      MIN_WIDTH: 6,
      MAX_WIDTH: 15,
      MIN_HEIGHT: 3,
      MAX_HEIGHT: 12,
    },
  },
};
