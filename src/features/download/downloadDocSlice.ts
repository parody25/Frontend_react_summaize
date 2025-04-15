import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { downloadDocument, downloadDocxFile } from '../../api/download/downloadDocApi';

interface DownloadDocState {
    loading: boolean;
    error: string | null;
    complete: boolean; // Added complete property
}

const initialState: DownloadDocState = {
    loading: false,
    error: null,
    complete: false, // Initialize complete as false
};



const downloadDocSlice = createSlice({
    name: 'downloadDoc',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(downloadDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.complete = false; // Reset complete to false when loading starts
            })
            .addCase(downloadDocument.fulfilled, (state) => {
                state.loading = false;
                state.complete = true; // Set complete to true when fulfilled
            })
            .addCase(downloadDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.complete = false; // Ensure complete is false on error
            });
    },
});

export default downloadDocSlice.reducer;