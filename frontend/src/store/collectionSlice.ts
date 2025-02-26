import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollection } from "../collectionApi";

export interface CollectionState {
    status: "idle" | "pending" | "succeeded" | "failed";
    total: number;
    objectIDs: number[];
    currentIndex: number;
    error: string | null;
}

const initialState: CollectionState = {
    status: "idle",
    total: 0,
    objectIDs: [],
    currentIndex: 0,
    error: null,
};

export const fetchCollectionFromDepartmentID = createAsyncThunk(
    "collection/fetchCollection",
    async (paramObj: { metadataDate?: string; departmentId?: string }) => {
        return await getCollection(paramObj);
    }
);

export const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        resetCollection() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollectionFromDepartmentID.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(
            fetchCollectionFromDepartmentID.fulfilled,
            (state, action) => {
                state.status = "succeeded";
                state.total = action.payload.total;
                state.objectIDs = action.payload.objectIDs;
            }
        );
        builder.addCase(
            fetchCollectionFromDepartmentID.rejected,
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Unknown Error";
            }
        );
    },
});

export default collectionSlice.reducer;
export const collectionActions = collectionSlice.actions;
