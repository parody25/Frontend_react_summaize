import { createSlice } from '@reduxjs/toolkit';
import { fetchCollateralQA } from '../../api/fill_application/collateralQAApi';

interface CollaterQAState {
    data: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    application_id: string;
    error: string | null;
}

const initialState: CollaterQAState = {
    data: '',
    status: 'idle',
    application_id: '',
    error: null,
};

const collaterQASlice = createSlice({
    name: 'collaterQA',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload.data;
        },
        setApplicationId(state, action) {
            state.application_id = action.payload.application_id;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollateralQA.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCollateralQA.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
            })
            .addCase(fetchCollateralQA.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setData, setApplicationId } = collaterQASlice.actions;

export default collaterQASlice.reducer;