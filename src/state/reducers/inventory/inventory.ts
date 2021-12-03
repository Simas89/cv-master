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
}

interface SetComponentProps {
  pageId: string;
  componentId: string;
  component: {
    componentType?: ComponentType;
    isAbsolute?: boolean;
    width?: number;
    height?: number;
    hLocation?: number;
    vLocation?: number;
    timeStamp?: number | null;
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

      const length = Object.keys(state.pages).map((k) => k).length;
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
        (k) => obj[k].order > currentOrder
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

    // COMPONENT
    setComponent: (state, action: PayloadAction<SetComponentProps>) => {
      const pageId = action.payload.pageId;
      const component = action.payload.component;

      // always provide componentID, if not provided, means its a new component
      const componentId =
        action.payload.componentId || generateId(component.componentType);

      // if exists, hold a copy of the current component
      const currentComponent =
        current(state.pages[pageId]).components[componentId] || {};

      // add timestamp if component is new
      if (!currentComponent.timeStamp)
        component.timeStamp = new Date().getTime();

      // merge component
      state.pages[pageId].components[componentId] = {
        ...state.pages[pageId].components[componentId],
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
  setComponent,
  deleteComponent,
  setSelectedComponent,
} = slice.actions;

export default slice.reducer;
