import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINTS from '../../constants/apiConstans';
 
 const data={
    "Working Capital (Current) Ratio": [
      { "year": 2024, "value": 2.4, "threshold": 0.0 },
      { "year": 2025, "value": 3.4, "threshold": 0.0 },
      { "year": 2026, "value": 4.0, "threshold": 3.0  },
      { "year": 2027, "value": 4.5, "threshold": 3.0  },
      { "year": 2028, "value": 5.0, "threshold": 3.0 },
      { "year": 2029, "value": 5.6, "threshold": 3.0  }
    ],
    "Total Liabilities/Equity": [
      { "year": 2025, "value": 3.4, "threshold": 3.0 },
      { "year": 2026, "value": 4.0, "threshold": 3.0  },
      { "year": 2027, "value": 4.5, "threshold": 3.0  },
      { "year": 2028, "value": 5.0, "threshold": 3.0  },
      { "year": 2029, "value": 5.6, "threshold": 3.0  }
    ],
    "Funded Debt/EBITDA": [
      { "year": 2025, "value": 3.4, "threshold": 3.0 },
      { "year": 2026, "value": 4.0, "threshold": 3.0  },
      { "year": 2027, "value": 4.5, "threshold": 3.0  },
      { "year": 2028, "value": 5.0, "threshold": 3.0 },
      { "year": 2029, "value": 5.6, "threshold": 3.0  }
    ],
    "Debt Service Coverage Ratio (DSCR)": [
      { "year": 2025, "value": 3.4, "threshold": 3.0 },
      { "year": 2026, "value": 4.0, "threshold": 3.0  },
      { "year": 2027, "value": 4.5, "threshold": 3.0  },
      { "year": 2028, "value": 5.0, "threshold": 3.0 },
      { "year": 2029, "value": 5.6, "threshold": 3.0  }
    ]
  }


  const res={
    "status": "success",
    "application_id": "1234",
    "data":{
      "Working Capital (Current) Ratio": [
        { "year": 2024, "value": 2.4, "threshold": 0.0 },
        { "year": 2025, "value": 3.4, "threshold": 0.0 },
        { "year": 2026, "value": 4.0, "threshold": 3.0  },
        { "year": 2027, "value": 4.5, "threshold": 3.0  },
        { "year": 2028, "value": 5.0, "threshold": 3.0 },
        { "year": 2029, "value": 5.6, "threshold": 3.0  }
      ],
      "Total Liabilities/Equity": [
        { "year": 2025, "value": 3.4, "threshold": 3.0 },
        { "year": 2026, "value": 4.0, "threshold": 3.0  },
        { "year": 2027, "value": 4.5, "threshold": 3.0  },
        { "year": 2028, "value": 5.0, "threshold": 3.0  },
        { "year": 2029, "value": 5.6, "threshold": 3.0  }
      ],
      "Funded Debt/EBITDA": [
        { "year": 2025, "value": 3.4, "threshold": 3.0 },
        { "year": 2026, "value": 4.0, "threshold": 3.0  },
        { "year": 2027, "value": 4.5, "threshold": 3.0  },
        { "year": 2028, "value": 5.0, "threshold": 3.0 },
        { "year": 2029, "value": 5.6, "threshold": 3.0  }
      ],
      "Debt Service Coverage Ratio (DSCR)": [
        { "year": 2025, "value": 3.4, "threshold": 3.0 },
        { "year": 2026, "value": 4.0, "threshold": 3.0  },
        { "year": 2027, "value": 4.5, "threshold": 3.0  },
        { "year": 2028, "value": 5.0, "threshold": 3.0 },
        { "year": 2029, "value": 5.6, "threshold": 3.0  }
      ]
    }
  }
export const getFetchRatios = async (
    applicationId: string,
    signal?: AbortSignal
  ) => {
    const response = await fetch(
      `${API_ENDPOINTS.GET_RATIOS}?application_id=${applicationId}`,
      {
        method: 'GET',
        signal,
      }
    );
  
    if (!response.ok) {
      throw new Error('Financial ratio API failed');
    }
  
    return response.json();
   // return res;
  };


export const fetchRatios = createAsyncThunk(
  'ratios/fetchRatios',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const data = await getFetchRatios(applicationId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const data2 ={
    'analysis':'analysis'
}

export const getFinancialAnalysis = async (
    applicationId: string,
    signal?: AbortSignal
  ) => {
    const response = await fetch(
      `${API_ENDPOINTS.GET_FINANCIAL_ANALYSIS}?application_id=${applicationId}`,
      {
        method: 'GET',
        signal,
      }
    );
  
    if (!response.ok) {
      throw new Error('Financial analysis API failed');
    }
  
   return response.json();

  // return data2;
  };


export const fetchFinancialAnalysis = createAsyncThunk(
  'financialCommentory/fetchFinancialAnalysis',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const data = await getFinancialAnalysis(applicationId);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);