import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWebScrapingData } from "../../api/upload_documents/webScrapingApi";

interface WebScrapingState {
  summary: string | null; // Store the response string
  loading: boolean;
  error: string | null;
}

const initialState: WebScrapingState = {
  summary: null,
  loading: false,
  error: null,
};

const webScrapingSlice = createSlice({
  name: "webScraping",
  initialState,
  reducers: {
    resetForm(state) {
      state.summary= null;
      state.loading= false; 
      state.error= null;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebScrapingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebScrapingData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.summary = action.payload.summary; // Store the response data
      })
      .addCase(fetchWebScrapingData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForm } = webScrapingSlice.actions;
export default webScrapingSlice.reducer;