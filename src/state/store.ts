import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fieldReducer from "./reducers/field";
import inventoryReducer from "./reducers/inventory";
import gameOfLifeReducer from "./reducers/gameOfLife";
// ...

export const store = configureStore({
  reducer: {
    field: fieldReducer,
    inventory: inventoryReducer,
    gameOfLife: gameOfLifeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useStateDispatch = () => useDispatch<AppDispatch>();
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
