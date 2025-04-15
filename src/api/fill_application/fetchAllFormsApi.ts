import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from '../../constants/apiConstans';


 const fetchForms = async (
    applicationId: string,
    section: string,
    signal?: AbortSignal
  ) => {
  const response = await fetch(`${API_ENDPOINTS.POST_SECTION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application_id: applicationId,
        section: section,
      }),
      signal, // Pass the AbortSignal to the fetch request
    });
   
    if (!response.ok) {
      throw new Error('Chat API failed');
    }
   
    return response.json();
  };



// Thunk to fetch all forms data
export const fetchAllFormsData = createAsyncThunk(
    "fillApplicationForm/fetchAllFormsData",
    async ({ applicationId, section }: { applicationId: string; section: string }, { dispatch, rejectWithValue }) => {
      try {
        const response = await fetchForms(applicationId,section); // Replace with your API endpoint
        return response.data; // Dispatch the action with the API response
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch forms data");
      }
    }
  );