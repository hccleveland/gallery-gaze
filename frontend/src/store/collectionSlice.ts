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

const randomizeMoveIndex = (arrayTotal: number) => {
    let pickedNumber = 1;
    if (arrayTotal < 1000) {
        const upperRange = Math.round(arrayTotal * 0.025);
        pickedNumber = Math.floor(Math.random() * upperRange) + 1;
    } else if (arrayTotal < 10000) {
        const upperRange = Math.round(arrayTotal * 0.01);
        pickedNumber = Math.floor(Math.random() * upperRange) + 1;
    } else {
        const upperRange = Math.round(arrayTotal * 0.005);
        pickedNumber = Math.floor(Math.random() * upperRange) + 1;
    }
    return pickedNumber;
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
        resetCurrentIndex(state) {
            state.currentIndex = 0;
        },
        moveNextIndex(state) {
            state.currentIndex =
                state.currentIndex === state.objectIDs.length - 1
                    ? 0
                    : state.currentIndex + 1;
        },
        movePrevIndex(state) {
            state.currentIndex =
                state.currentIndex === 0
                    ? state.objectIDs.length - 1
                    : state.currentIndex - 1;
        },
        moveNextRandomizedIndex(state) {
            const randomizedStep = randomizeMoveIndex(
                state.objectIDs.length - 1
            );
            const newPosition = state.currentIndex + randomizedStep;
            if (newPosition <= state.objectIDs.length - 1) {
                state.currentIndex = newPosition;
            } else {
                const correctedIndex =
                    newPosition - (state.objectIDs.length - 1);
                state.currentIndex = correctedIndex;
            }
        },
        movePrevRandomizedIndex(state) {
            const randomizedStep = randomizeMoveIndex(
                state.objectIDs.length - 1
            );
            const newPosition = state.currentIndex - randomizedStep;
            if (newPosition >= 0) {
                state.currentIndex = newPosition;
            } else {
                const correctedStep = randomizedStep - state.currentIndex;
                state.currentIndex = state.objectIDs.length - 1 - correctedStep;
            }
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
