// src/constants/apiConstants.ts
 
const BASE_URL = 'http://127.0.0.1:8000/api'; 
 
const API_ENDPOINTS = {
  GET_BORROWER_DETAILS: `${BASE_URL}/get_crm_value/`,
  POST_CHAT: `${BASE_URL}/collateral_chat/`,
  POST_COLLATERAL_QA: `${BASE_URL}/collateral_qa/`,
  GET_DOWNLOAD: `${BASE_URL}/download_doc/`,
  POST_SECTION: `${BASE_URL}/get_section/`,
  GET_RATIOS: `${BASE_URL}/get_financial_ratios/`,
  GET_FINANCIAL_ANALYSIS: `${BASE_URL}/get_financial_analysis/`,
  POST_MANANGEMENT_QA: `${BASE_URL}/management_qa/`,
  POST_UPLOAD_DOCUMENTS: `${BASE_URL}/upload_documents/`,
  POST_WEBSCRAPING: `${BASE_URL}/webscrapping/`,
  GET_RISKANALYSIS:`${BASE_URL}/risk_analysis/`,
  GET_JUSTIFICATION:`${BASE_URL}/get_justification/`

};
 
export default API_ENDPOINTS;