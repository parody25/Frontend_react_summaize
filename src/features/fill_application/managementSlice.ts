import { createSlice } from '@reduxjs/toolkit';
import { fetchManagement } from '../../api/fill_application/managementApi';


interface ManagementState {
    data: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    application_id: string;
    error: string | null;
}

const initialState: ManagementState = {
    data: '',
    status: 'idle',
    application_id: '',
    error: null,
};

const managementSlice = createSlice({
    name: 'management',
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
            .addCase(fetchManagement.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchManagement.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
            })
            .addCase(fetchManagement.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setData, setApplicationId } = managementSlice.actions;

export default managementSlice.reducer;