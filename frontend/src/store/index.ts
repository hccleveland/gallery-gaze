import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./collectionSlice";
import objectReducer from "./objectSlice";

export const store = configureStore({
    reducer: {
        collection: collectionReducer,
        object: objectReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
