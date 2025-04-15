import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ENDPOINTS from '../../constants/apiConstans';


export const downloadDocxFile = async ( applicationID: string, date: string,credit_application_name: string, ): Promise<void> => {
    try {
        const response = await axios.get(`${API_ENDPOINTS.GET_DOWNLOAD}?application_id=${applicationID}&date=${date}&credit_application_name=${credit_application_name}`,{
            responseType: 'blob',
        });
        // Create a URL for the downloaded file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${credit_application_name}.docx`); // Set the file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading the document:', error);
        throw error;
    }
};


// Async thunk for downloading the document
export const downloadDocument = createAsyncThunk(
    'downloadDoc/downloadDocument',
    async ({ applicationID, date, credit_application_name }: { applicationID: string; date: string, credit_application_name:string }, { rejectWithValue }) => {
        try {
            await downloadDocxFile(applicationID,date,credit_application_name);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to download document');
        }
    }
);