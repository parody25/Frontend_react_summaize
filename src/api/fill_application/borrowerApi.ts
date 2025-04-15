import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ENDPOINTS from '../../constants/apiConstans';

const res={
  "status": "success",
  "data": {
      "application_id": "a20bd6a6-d426-4c77-9803-8d894cd32c8a",
      "borrower_name": "Emaar Properties",
      "date_of_application": "1st March 2025",
      "type_of_business": "Commercial and residential real property development",
      "risk_rating": "Cold",
      "new_or_existing": "Existing Customer",
      "naics_code": "6551 – developers, Real Estate",
      "borrower_address": "Level 7, Dubai Hills Business, Park Building 1",
      "telephone": "+971 4 366 1688",
      "email_address": "info@emaar.ae",
      "fax_number": "(123)-456-7890",
      "branch_number": "AT6789",
      "account_number": "DB14789",
      "related_borrowings": [
          {
              "Contact Name": "Emaar Malls Management LLC",
              "Account Name": "Emaar Properties",
              "Designation": "Subsidiary",
              "Phone Number": "534 478 446",
              "Borrowings": "Real estate term loan of USD $500,000 for developing a new mall in Dubai"
          },
          {
              "Contact Name": "Emaar Entertainment LLC",
              "Account Name": "Emaar Properties",
              "Designation": "Subsidiary",
              "Phone Number": "837 563 173",
              "Borrowings": "Real estate term loan of USD $450,000 for developing a new cinema complex in Dubai"
          }
      ]
  }
};
// Thunk to fetch borrower data
export const fetchBorrowerData = createAsyncThunk(
    'fillApplicationForm/fetchBorrowerData',
    async (applicationId: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.GET_BORROWER_DETAILS}?application_id=${applicationId}`);
        return response.data.data; // Return the "data" object from the API response
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch borrower data');
      }
      //return res.data;
    }
  );