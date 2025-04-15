
import { createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../constants/apiConstans';


export const getCollateralQA = async (
    applicationId: string,
    signal?: AbortSignal
  ) => {
  const response = await fetch(`${API_ENDPOINTS.POST_COLLATERAL_QA}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application_id: applicationId,
      }),
      signal, // Pass the AbortSignal to the fetch request
    });
   
    if (!response.ok) {
      throw new Error('Chat API failed');
    }
   
    return response.json();
  };


export const fetchCollateralQA = createAsyncThunk(
    'collateralQA/fetchCollateralQA',
    async ({ applicationID }: { applicationID: string }, thunkAPI) => {
        try {
            const response = await getCollateralQA(applicationID);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);