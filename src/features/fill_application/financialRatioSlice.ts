import { createSlice } from "@reduxjs/toolkit";
import { fetchRatios } from "../../api/fill_application/financialAnalysisApi";


interface RatiosState {
    data: { [key: string]: { year: number; value: number; threshold:number }[] };
    loading: boolean;
    error: string | null;
  }
   
  const initialState: RatiosState = {
    data: {},
    loading: false,
    error: null,
  };
   
  const ratiosSlice = createSlice({
    name: 'ratios',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRatios.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchRatios.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data;
        })
        .addCase(fetchRatios.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
   
  export default ratiosSlice.reducer;