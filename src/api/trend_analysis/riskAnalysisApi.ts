import { createAsyncThunk } from "@reduxjs/toolkit";
import API_ENDPOINTS from "../../constants/apiConstans";

const data={
  "status": "success",
  "data": "**Company Report: Emaar Properties**\n\n**Company Profile:**\n- **Name:** Emaar Properties\n- **Address:** Level 7, Dubai Hills Business, Park Building 1, +971 4 366 1688\n- **Experian ID:** 12345678\n- **Subsidiaries:** Emaar Malls, Emaar Hospitality, Emaar Entertainment, Emaar Technologies, Emaar Commercial Leasing\n- **Branches:** Middle East, North Africa, Europe, North America\n- **Ultimate Parent:** Emaar Properties\n- **SIC Code:** 1520 – Real Estate Construction\n- **Business Type:** Incorporated\n- **Experian File Established:** January 1997\n- **Years in Business:** More than 28 years\n- **Total Employees:** 500\n- **Date of Incorporation:** 2nd October 1997\n\n**Experian Credit Score:**\n- **Current Score:** 60 (Low to Medium Risk)\n- **Score Range and Risk Level:**\n  - 1-10: High Risk\n  - 11-25: Medium to High Risk\n  - 26-50: Medium Risk\n  - 51-75: Low to Medium Risk\n  - 76-100: Low Risk\n- **Score Comparisons:**\n  - This company: 60\n  - All scored companies: 48\n  - Same industry group: 48\n  - Same asset size group: 46\n\n**Experian Financial Stability Risk:**\n- **Rating:** 1 (Low Risk)\n- **Risk Rating and Level:**\n  - High Risk: 35.27%\n  - Medium to High Risk: 10.00%\n  - Medium Risk: 2.95%\n  - Low to Medium Risk: 1.11%\n  - Low Risk: 55%\n\n**Days Beyond Terms (DBT):**\n- **Current DBT:** 60 days\n- **Average Industry DBT:** 15 days\n\n**Credit Utilization:**\n- **Total Credit Limit:** AED 60,000\n- **Available Credit:** AED 19,673 (33% available)\n- **Credit Line Utilized:** AED 40,327 (67% utilized)\n\n**Payment Trends:**\n- **Monthly Payment Trends:**\n  - Feb’25: Balance AED 1,346,600, 98% current, 2% 31"
}

export const getRiskAnalysis = async (
    applicationId: string,
    signal?: AbortSignal
   ) => {
    const response = await fetch(
      `${API_ENDPOINTS.GET_RISKANALYSIS}?application_id=${applicationId}`,
      {
        method: 'GET',
        signal,
      }
    );
  
    if (!response.ok) {
      throw new Error(' Risk Analysis API failed');
    }
  
    return response.json();
   // return data;
  };


export const fetchRiskAnalysis = createAsyncThunk(
  'riskAnalysis/fetchRiskAnalysis',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const data = await getRiskAnalysis(applicationId);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);