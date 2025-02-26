import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Object, getObject } from "../collectionApi";

export interface ObjectState {
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    objectData: Object | undefined;
}

const initialState: ObjectState = {
    status: "idle",
    error: null,
    objectData: undefined,
};

export const fetchObjectFromCollection = createAsyncThunk(
    "object/fetchObject",
    async (objectId: number) => {
        return await getObject(objectId);
    }
);

export const objectSlice = createSlice({
    name: "object",
    initialState,
    reducers: {
        resetObject() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchObjectFromCollection.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(
            fetchObjectFromCollection.fulfilled,
            (state, action) => {
                state.status = "succeeded";
                state.objectData = action.payload;
            }
        );
        builder.addCase(fetchObjectFromCollection.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Unknown Error";
        });
    },
});

export default objectSlice.reducer;
export const objectActions = objectSlice.actions;
