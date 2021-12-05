import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from 'types';
import { generateId } from 'util/generateId';

export interface Component {
  componentType: ComponentType;
  isAbsolute: boolean;
  width: number;
  height: number;
  hLocation: number;
  vLocation: number;
  timeStamp: number | null;
  zIndex: number;
}

interface AddComponentProps {
  pageId: string;
  component: Component;
}
interface SetComponentProps {
  componentId: string;
  pageId: string;
  memoPageId?: string;
  component: {
    isAbsolute?: boolean;
    width?: number;
    height?: number;
    hLocation?: number;
    vLocation?: number;
    zIndex?: number;
  };
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
  selectedComponent: {
    pageId: string;
    componentId: string;
  };
  isCreateAbsolute: boolean;
}

const initialState: InventoryState = {
  pages: {},
  selectedComponent: {
    pageId: '',
    componentId: '',
  },
  isCreateAbsolute: true,
};

interface LoadNewComponentsPageProps {
  pageId: string;
  components?: any;
}

export const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // PAGE
    loadNewComponentsPage: (
      state,
      action: PayloadAction<LoadNewComponentsPageProps>
    ) => {
      const pageId = action.payload.pageId;
      const components = action.payload.components || {};

      const length = Object.keys(state.pages).map((el) => el).length;
      state.pages[pageId] = {
        ...state.pages[pageId],
        order: length + 1,
        components,
      };
      state.selectedComponent.pageId = pageId;
      state.selectedComponent.componentId = '';
    },

    deleteComponentsPage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      const obj = current(state.pages);
      const currentOrder = state.pages[pageId].order;

      const belowPages = Object.keys(obj).filter(
        (el) => obj[el].order > currentOrder
      );
      belowPages.forEach((el) => state.pages[el].order--);

      delete state.pages[pageId];
      state.selectedComponent.pageId = '';
      state.selectedComponent.componentId = '';
    },

    swapPage: (
      state,
      action: PayloadAction<{ id: string; direction: 'UP' | 'DOWN' }>
    ) => {
      const pageId = action.payload.id;
      const direction = action.payload.direction;
      const obj = current(state.pages);
      const currentOrder = state.pages[pageId].order;

      if (direction === 'DOWN') {
        const neighbourId = Object.keys(obj).filter(
          (el) => obj[el].order === currentOrder + 1
        )[0];

        state.pages[pageId].order++;
        state.pages[neighbourId].order--;
      } else {
        const neighbourId = Object.keys(obj).filter(
          (el) => obj[el].order === currentOrder - 1
        )[0];

        state.pages[pageId].order--;
        state.pages[neighbourId].order++;
      }
    },

    // COMPONENT
    addComponent: (state, action: PayloadAction<AddComponentProps>) => {
      const pageId = action.payload.pageId;
      const component = action.payload.component;

      const componentId = generateId(component.componentType);

      const newComponent = { ...component, zIndex: 10 };

      // merge component
      state.pages[pageId].components[componentId] = { ...newComponent };
      state.selectedComponent.pageId = pageId;
      state.selectedComponent.componentId = componentId;
    },

    setComponent: (state, action: PayloadAction<SetComponentProps>) => {
      const pageId = action.payload.pageId;
      const memoPageId = action.payload.memoPageId;
      const componentId = action.payload.componentId;
      const component = action.payload.component;

      const currentComponent = current(state.pages[memoPageId || pageId])
        .components[componentId];

      // merge component
      state.pages[pageId].components[componentId] = {
        ...currentComponent,
        ...component,
      };
      state.selectedComponent.pageId = pageId;
      state.selectedComponent.componentId = componentId;
    },

    deleteComponent: (state, action: PayloadAction<DeleteComponentProps>) => {
      const pageId = action.payload.pageId;
      const componentId = action.payload.componentId;
      delete state.pages[pageId].components[componentId];
    },

    // SELECTED
    setSelectedComponent: (
      state,
      action: PayloadAction<{ pageId: string; componentId: string }>
    ) => {
      state.selectedComponent = action.payload;
    },

    setSelectedPage: (state, action: PayloadAction<string>) => {
      const pageId = action.payload;
      const currenPageId = current(state.selectedComponent).pageId;

      if (pageId !== currenPageId) {
        state.selectedComponent.componentId = '';
      }
      state.selectedComponent.pageId = pageId;
    },

    // OTHER
    setIsCreateAbsolute: (state, action: PayloadAction<boolean>) => {
      state.isCreateAbsolute = action.payload;
    },
  },
});

export const {
  loadNewComponentsPage,
  deleteComponentsPage,
  swapPage,
  addComponent,
  setComponent,
  deleteComponent,
  setSelectedComponent,
} = slice.actions;

export default slice.reducer;
