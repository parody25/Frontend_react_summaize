import { configureStore } from '@reduxjs/toolkit';
import applicationReducer from '../features/fill_application/applicationSlice';
import formReducer from '../features/fill_application/formSlice';
import fillApplicationFormReducer from '../features/fill_application/fillApplicationFormSlice';
import authSliceReducer from '../features/auth/authSlice';
import webScrapingReducer from '../features/upload_documents/webScrapingSlice';
import uploadFilesReducer from '../features/upload_documents/uploadFilesSlice';
import chatBotSliceReducer from '../features/fill_application/chatBotSlice';
import downloadDocumentReducer from '../features/download/downloadDocSlice';
import collaterQAReducer from  '../features/fill_application/collarterQASlice';
import managementReducer from  '../features/fill_application/managementSlice';
import financialRatio from '../features/fill_application/financialRatioSlice';
import riskAnalysisReducer from '../features/trend_analysis/riskAnalysisSlice';
import justifiactionReducer from '../features/trend_analysis/justificationSlice';

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    form: formReducer,
    fillApplicationForm: fillApplicationFormReducer,
    auth: authSliceReducer,
    webScraping: webScrapingReducer,
    uploadFiles:uploadFilesReducer,
    chatBot: chatBotSliceReducer,
    downloadDoc:downloadDocumentReducer,
    collaterQA:collaterQAReducer,
    management:managementReducer,
    ratios:financialRatio,
    riskAnalysis:riskAnalysisReducer,
    justifiaction:justifiactionReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;