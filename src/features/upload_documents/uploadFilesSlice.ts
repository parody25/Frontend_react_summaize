import { createSlice } from '@reduxjs/toolkit';
import { uploadDocumentsAction } from '../../api/upload_documents/uploadFilesApi';



interface UploadDocumentsState {
    loadingUploadDoc: boolean,
    uploadDocError:  string |null |{},
    uploadDocStatus: string |null,
    message: string |null,
    application_id: string |null,
    uploadDocDocuments: any,
  }
  
  const initialState: UploadDocumentsState = {
    loadingUploadDoc: false,
    uploadDocError:  null,
    uploadDocStatus: null,
    message: null,
    application_id: null,
    uploadDocDocuments: [],
  };


const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loadingUploadDoc = false;
      state.uploadDocError = null;
      state.uploadDocStatus = null;
      state.message = null;
      state.application_id = null;
      state.uploadDocDocuments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocumentsAction.pending, (state) => {
        state.loadingUploadDoc = true;
        state.uploadDocError = null;
        state.uploadDocStatus = null;
      })
      .addCase(uploadDocumentsAction.fulfilled, (state, action) => {
        state.loadingUploadDoc = false;
        state.uploadDocStatus = action.payload.status;
        state.message = action.payload.message;
        state.application_id = action.payload.application_id;
        state.uploadDocDocuments = action.payload.documents;
      })
      .addCase(uploadDocumentsAction.rejected, (state, action) => {
        state.loadingUploadDoc = false;
        state.uploadDocError = action.payload || 'Failed to upload documents';
        state.uploadDocStatus = 'error';
      });
  },
});

// Export actions
export const { resetUploadState } = documentsSlice.actions;

// Export reducer
export default documentsSlice.reducer;