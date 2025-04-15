import { createSlice } from '@reduxjs/toolkit';
import { fetchJustification } from '../../api/trend_analysis/justifiactionApi';

interface JustifiactionState {
    data: string;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: JustifiactionState = {
    data: '',
    status: 'idle',
};

const JustifiactionSlice = createSlice({
    name: 'justifiaction',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJustification.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJustification.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.data;
            })
            .addCase(fetchJustification.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const { setData } = JustifiactionSlice.actions;

export default JustifiactionSlice.reducer;