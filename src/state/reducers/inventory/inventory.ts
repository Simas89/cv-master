import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from 'types';

export interface Component {
  componentType: ComponentType;
  width: number;
  height: number;
  hLocation: number;
  vLocation: number;
}

interface SetComponentProps {
  pageId: string;
  componentId: string;
  component: Component;
}
interface DeleteComponentProps {
  pageId: string;
  componentId: string;
}

interface InventoryState {
  pages: {
    [key: string]: {
      order: number;
      components: {
        [key: string]: Component;
      };
    };
  };
}

const initialState: InventoryState = {
  pages: {},
};

interface LoadNewComponentsPageProps {
  pageId: string;
  components?: any;
}

export const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    loadNewComponentsPage: (
      state,
      action: PayloadAction<LoadNewComponentsPageProps>
    ) => {
      const pageId = action.payload.pageId;
      const components = action.payload.components || {};

      const length = Object.keys(state.pages).map((k) => k).length;
      state.pages[pageId] = {
        ...state.pages[pageId],
        order: length + 1,
        components,
      };
    },

    deleteComponentsPage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      const obj = current(state.pages);
      const currentOrder = state.pages[pageId].order;

      const belowPages = Object.keys(obj).filter(
        (k) => obj[k].order > currentOrder
      );
      belowPages.forEach((el) => state.pages[el].order--);

      delete state.pages[pageId];
    },

    swapPage: (
      state,
      action: PayloadAction<{ id: string; direction: 'UP' | 'DOWN' }>
    ) => {
      const pageId = action.payload.id;
      const direction = action.payload.direction;
      const obj = current(state.pages);
      const currentOrder = state.pages[pageId].order;

      console.log(obj);

      if (direction === 'DOWN') {
        const neighbourId = Object.keys(obj).filter(
          (k) => obj[k].order === currentOrder + 1
        )[0];

        state.pages[pageId].order++;
        state.pages[neighbourId].order--;
      } else {
        const neighbourId = Object.keys(obj).filter(
          (k) => obj[k].order === currentOrder - 1
        )[0];

        state.pages[pageId].order--;
        state.pages[neighbourId].order++;
      }
    },
    addComponent: (state, action: PayloadAction<SetComponentProps>) => {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;

      state.pages[pageId].components[componentId] = {
        ...state.pages[pageId].components[componentId],
        ...action.payload.component,
      };
    },
    deleteComponent: (state, action: PayloadAction<DeleteComponentProps>) => {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;

      delete state.pages[pageId].components[componentId];
    },
  },
});

export const {
  loadNewComponentsPage,
  deleteComponentsPage,
  swapPage,
  addComponent,
  deleteComponent,
} = slice.actions;

export default slice.reducer;
