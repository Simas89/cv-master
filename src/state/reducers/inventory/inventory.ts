import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { itemsData } from 'config/itemsData';
import { ComponentType } from 'types';
import { generateId } from 'util/generateId';

export interface Component {
  componentType: ComponentType;
  timeStamp: number | null;
  dimensions: {
    width: number;
    height: number;
    hLocation: number;
    vLocation: number;
    isAbsolute: boolean;
    zIndex: number;
  };
}

interface AddComponentProps {
  pageId: string;
  component: {
    componentType: ComponentType;
    location: {
      hLocation: number;
      vLocation: number;
      isAbsolute: boolean;
    };
  };
}

interface SetComponentDimensionsProps {
  componentId: string;
  pageId: string;
  memoPageId?: string;
  dimensions: {
    width?: number;
    height?: number;
    hLocation?: number;
    vLocation?: number;
    isAbsolute?: boolean;
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
      const componentType = action.payload.component.componentType;
      const location = action.payload.component.location;

      const defaultData = itemsData[componentType];

      const newComponent: Component = {
        componentType,
        timeStamp: new Date().getTime(),
        dimensions: {
          width: defaultData.dimensions.width,
          height: defaultData.dimensions.height,
          ...location,
          zIndex: 10,
        },
      };

      const componentId = generateId(componentType);

      state.pages[pageId].components[componentId] = { ...newComponent };
      state.selectedComponent.pageId = pageId;
      state.selectedComponent.componentId = componentId;
    },

    setComponentDimensions: (
      state,
      action: PayloadAction<SetComponentDimensionsProps>
    ) => {
      const pageId = action.payload.pageId;
      const memoPageId = action.payload.memoPageId;
      const componentId = action.payload.componentId;
      const dimensions = action.payload.dimensions;

      // if memoPageID - copy the previous page component over to a new page
      if (memoPageId) {
        state.pages[pageId].components[componentId] = {
          ...state.pages[memoPageId].components[componentId],
        };
      }

      const currentDimensions = current(state.pages[memoPageId || pageId])
        .components[componentId].dimensions;

      // merge component
      state.pages[pageId].components[componentId].dimensions = {
        ...currentDimensions,
        ...dimensions,
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
  // setComponent,
  setComponentDimensions,
  deleteComponent,
  setSelectedComponent,
} = slice.actions;

export default slice.reducer;
