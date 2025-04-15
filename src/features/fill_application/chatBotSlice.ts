import { createSlice } from '@reduxjs/toolkit';
import { fetchChatbotMessage } from '../../api/fill_application/chatBotApi';


interface ChatBotState {
    question: string;
    answer: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    application_id: string;
    error: string | null;
}

const initialState: ChatBotState = {
    question: '',
    answer: null,
    status: 'idle',
    application_id: '',
    error: null,
};

const chatBotSlice = createSlice({
    name: 'chatBot',
    initialState,
    reducers: {
        setQuestion(state, action) {
            state.question = action.payload;
        },
        setApplicationId(state, action) {
            state.application_id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatbotMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchChatbotMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.answer = action.payload.answer;
            })
            .addCase(fetchChatbotMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setQuestion, setApplicationId } = chatBotSlice.actions;

export default chatBotSlice.reducer;