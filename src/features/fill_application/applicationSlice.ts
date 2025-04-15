import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../../components/CreditApplication/types';

interface ApplicationState {
  applications: Application[];
  activeView: 'dashboard' | 'create' | 'upload' | 'api-integration' | 'ai-analysis' | 'trend-analysis' |'download';
  currentApplication: Application | null;
}

const initialState: ApplicationState = {
  applications: [
    {
      name: "Dashboard",
      appNo: "9465 756 174",
      borrower: "National Industries Group Holding",
      status: "Completed",
      sources: "2 docs. 2 API",
    },
    {
      name: "Settings",
      appNo: "5356 353 535",
      borrower: "Jajabat Holdings PLC",
      status: "Review",
      sources: "1 doc. 1 API",
    },
    {
      name: "User Management",
      appNo: "4245 853 632",
      borrower: "Spinneys Holdings",
      status: "Submitted",
      sources: "5 docs. 3 API",
    },
  ],
  activeView: 'dashboard',
  currentApplication: null,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setActiveView(state, action: PayloadAction<'dashboard' | 'create' | 'upload' | 'api-integration' | 'ai-analysis' | 'trend-analysis' |'download'>) {
      state.activeView = action.payload;
    },
    addApplication(state, action: PayloadAction<Application>) {
      state.applications.push(action.payload);
    },
    startDocumentUpload(state, action: PayloadAction<Application>) {
      state.currentApplication = action.payload;
      state.activeView = 'upload';
    },
    completeDocumentUpload(state) {
      if (state.currentApplication) {
        state.currentApplication.status = 'Review';
        state.applications.push(state.currentApplication);
        state.currentApplication = null;
        state.activeView = 'dashboard';
      }
    },
    startApiIntegration(state) {
      state.activeView = 'api-integration';
    },
    completeApiIntegration(state) {
      if (state.currentApplication) {
        state.currentApplication.status = 'Completed';
        state.applications.push(state.currentApplication);
        state.currentApplication = null;
        state.activeView = 'ai-analysis';
      }
    },

  },
});







export const { setActiveView, addApplication,completeDocumentUpload,startDocumentUpload,startApiIntegration,completeApiIntegration } = applicationSlice.actions;
export default applicationSlice.reducer;