
import { createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../constants/apiConstans';




const res={
    "status": "success",
    "application_id": "5a7f8eee-8b42-4a4b-90f4-5d7547d5532a",
    "data": "The annual report provides a detailed overview of the corporate governance framework and the composition of the Board of Directors at Emaar Properties PJSC. The Board is responsible for strategic direction, ensuring compliance with governance standards, and maintaining transparency and accountability. The Board comprises a mix of executive and independent directors, with a high percentage of independent members. The directors are required to disclose any conflicts of interest and adhere to strict governance policies. The Board is supported by various committees, including the Audit, Risk, Investment, and Nomination and Remuneration Committees, which ensure effective oversight and accountability. The report highlights the Board's commitment to upholding the interests of stakeholders and driving sustainable growth."
}

export const getManagement = async (
    applicationId: string,
    signal?: AbortSignal
  ) => {
  const response = await fetch(`${API_ENDPOINTS.POST_MANANGEMENT_QA}`, {
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
      throw new Error('Management API failed');
    }
   
    return response.json();
  };


export const fetchManagement = createAsyncThunk(
    'management/fetchManagement',
    async ({ applicationID }: { applicationID: string }, thunkAPI) => {
        try {
            const response = await getManagement(applicationID);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);