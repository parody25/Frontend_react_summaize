import { createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../constants/apiConstans';

export const sendChatMessage = async (
    applicationId: string,
    question: string,
    signal?: AbortSignal
  ) => {
  const response = await fetch(`${API_ENDPOINTS.POST_CHAT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application_id: applicationId,
        question: question,
      }),
      signal, // Pass the AbortSignal to the fetch request
    });
   
    if (!response.ok) {
      throw new Error('Chat API failed');
    }
   
    return response.json();
  };


export const fetchChatbotMessage = createAsyncThunk(
    'chatbot/fetchMessage',
    async ({ applicationID, question }: { applicationID: string; question: string }, thunkAPI) => {
        try {
            const response = await sendChatMessage(applicationID, question);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);