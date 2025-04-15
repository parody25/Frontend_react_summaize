import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Document } from '../../components/CreditApplication/types';
import API_ENDPOINTS from '../../constants/apiConstans';

const data = {
    "status": "success",
    "message": "Documents processed successfully",
    "application_id": "d5c7a661-cebc-452a-86ce-e4f4db6c019b",
    "documents": [
        {
            "document_name": "Emaar_Real_Estate_Appraisal_Report.docx",
            "embedding_file": "d5c7a661-cebc-452a-86ce-e4f4db6c019b_Emaar_Real_Estate_Appraisal_Report_embeddings.pkl",
            "document_id": "d5c7a661-cebc-452a-86ce-e4f4db6c019b_Emaar_Real_Estate_Appraisal_Report",
            "pdf_document_id": 56
        }
    ]
}

export const uploadDocuments = async (documents: Document[]) => {
    try {
        const formData = new FormData();

        // Append each file to the FormData under the 'pdfs' key
        documents.forEach((document: Document) => {
            formData.append('pdfs', document.file);
        });

        const response = await axios.post(
           `${API_ENDPOINTS.POST_UPLOAD_DOCUMENTS}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error uploading documents:', error);
        throw error;
    }
};

export const uploadDocumentsAction = createAsyncThunk(
    'documents/upload',
    async (documents: Document[], { rejectWithValue }) => {
        try {
            const response = await uploadDocuments(documents);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
       // return data;
    }
);