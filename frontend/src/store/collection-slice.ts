import { createSlice } from "@reduxjs/toolkit";

export interface CollectionState {
    total: number;
    objectIDs: number[];
    currentIndex: number;
}

const initialState: CollectionState = {
    total: 0,
    objectIDs: [],
    currentIndex: 0,
};

export const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {},
});

export default collectionSlice.reducer;
