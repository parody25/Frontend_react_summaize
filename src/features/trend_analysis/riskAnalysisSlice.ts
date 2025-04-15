import { createSlice } from '@reduxjs/toolkit';
import { fetchRiskAnalysis } from '../../api/trend_analysis/riskAnalysisApi';

interface RiskAnalysisState {
    data: string;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: RiskAnalysisState = {
    data: '',
    status: 'idle',
};

const riskAnalysisSlice = createSlice({
    name: 'riskAnalysis',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRiskAnalysis.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRiskAnalysis.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchRiskAnalysis.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const { setData } = riskAnalysisSlice.actions;

export default riskAnalysisSlice.reducer;