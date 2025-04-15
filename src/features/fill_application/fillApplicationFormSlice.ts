import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { parseDate } from "../../utilities/dateFormat";
import { fetchBorrowerData } from "../../api/fill_application/borrowerApi";
import { fetchFinancialAnalysis } from "../../api/fill_application/financialAnalysisApi";
import { fetchAllFormsData } from "../../api/fill_application/fetchAllFormsApi";


interface BorrowerForm {
  borrowerName: string;
  dateOfApplication: string;
  typeOfBusiness: string;
  riskRating: string;
  newOrExisting: string;
  naicsCode: string;
  borrowerAddress: string;
  telephoneNumber: string;
  emailAddress: string;
  faxNumber: string;
  branchNumber: string;
  accountNumber: string;
  relatedBorrowings: any; // Changed to store array directly
}

interface OwnershipRow {
  name: string;
  position: string;
  dob: string;
  ownership: string;
  netWorth: string;
}

interface LoanPurposeForm {
  loanPurpose: string;
  details: {
    loanType: string;
    loanTerm: string;
    maxLoanAmount: string;
    amortization: string;
    paymentTerms: string;
    paymentAmount: string;
    interest: string;
    applicationFee: string;
    fees: string;
  }[];
}

interface BorrowerProfileForm {
  borrowerProfile: string;
}

interface IndustryAnalysisForm {
  political: string;
  economic: string;
  social: string;
  technological: string;
  environmental: string;
  legal: string;
}

interface BusinessModelAnalysisForm {
  competitors: string;
  suppliers: string;
  customers: string;
  strategy: string;
}

interface ManagementForm {
  boardOfDirectorsProfile: string;
}

interface FinancialAnalysisForm {
  data: string;
}

interface SecurityForm {
  personalGuarantee: string;
  realEstate: string;
  equipment: string;
  inventoryAndAccounts: string;
}

interface FinancialCovenants {
  debtToEquityRatio: string;
  workingCapitalByCurrentRatio: string;
  debtServiceCoverageRatio: string;
  minimumShareHolderEquity: string;
  fundedDebtByEBITDARatio: string;
}

interface CovenantsForm {
  financialCovenants: FinancialCovenants;
  reportingCovenant: string; // New field
  termsAndConditionsDetails: string; // New field
}

interface PolicyExceptionForm {
  policyException: string;
}

interface EnvironmentalConditionsForm {
  fieldVisitDetails: string;
  EnvConsiderations: string;
}

interface ConclusionForm {
  relationshipManagersComments: string;
}

interface FormState {
  borrowerForm: BorrowerForm;
  ownershipRows: OwnershipRow[];
  loanPurposeForm: LoanPurposeForm;
  borrowerProfileForm: BorrowerProfileForm;
  industryAnalysisForm: IndustryAnalysisForm;
  businessModelAnalysisForm: BusinessModelAnalysisForm;
  managementForm: ManagementForm;
  financialAnalysisForm: FinancialAnalysisForm;
  securityForm: SecurityForm;
  covenantsForm: CovenantsForm;
  policyExceptionForm: PolicyExceptionForm;
  environmentalConditionsForm: EnvironmentalConditionsForm;
  conclusionForm: ConclusionForm;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  ownershipRows: [
    { name: "", position: "", dob: "", ownership: "", netWorth: "" },
    { name: "", position: "", dob: "", ownership: "", netWorth: "" },
    { name: "", position: "", dob: "", ownership: "", netWorth: "" },
    { name: "", position: "", dob: "", ownership: "", netWorth: "" },
  ],
  borrowerForm: {
    borrowerName: "",
    dateOfApplication: "",
    typeOfBusiness: "",
    riskRating: "",
    newOrExisting: "",
    naicsCode: "",
    borrowerAddress: "",
    telephoneNumber: "",
    emailAddress: "",
    faxNumber: "",
    branchNumber: "",
    accountNumber: "",
    relatedBorrowings: [], // Changed to store array directly
  },
  loanPurposeForm: {
    loanPurpose: "",
    details: [
      {
        loanType: "",
        loanTerm: "",
        maxLoanAmount: "",
        amortization: "",
        paymentTerms: "",
        paymentAmount: "",
        interest: "",
        applicationFee: "",
        fees: "",
      },
    ],
  },
  borrowerProfileForm: {
    borrowerProfile: "",
  },
  industryAnalysisForm: {
    political: "",
    economic: "",
    social: "",
    technological: "",
    environmental: "",
    legal: "",
  },
  businessModelAnalysisForm: {
    competitors: "",
    suppliers: "",
    customers: "",
    strategy: "",
  },
  managementForm: {
    boardOfDirectorsProfile: "",
  },
  financialAnalysisForm: {
    data: "",
  },
  securityForm: {
    personalGuarantee: "",
    realEstate: "",
    equipment: "",
    inventoryAndAccounts: "",
  },
  covenantsForm: {
    financialCovenants: {
      debtToEquityRatio: "",
      workingCapitalByCurrentRatio: "",
      debtServiceCoverageRatio: "",
      minimumShareHolderEquity: "",
      fundedDebtByEBITDARatio: "",
    },
    reportingCovenant: "", // Default value for the new field
    termsAndConditionsDetails: "", // Default value for the new field
  },
  policyExceptionForm: {
    policyException: "",
  },
  environmentalConditionsForm: {
    fieldVisitDetails: "",
    EnvConsiderations: "",
  },
  conclusionForm: {
    relationshipManagersComments: "",
  },
  loading: false,
  error: null,
};

const fillApplicationFormSlice = createSlice({
  name: "fillApplicationForm",
  initialState,
  reducers: {
    // Actions for OwnershipForm
    addOwnershipRow(state) {
      state.ownershipRows.push({
        name: "",
        position: "",
        dob: "",
        ownership: "",
        netWorth: "",
      });
    },
    updateOwnershipRow(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof OwnershipRow;
        value: string;
      }>
    ) {
      const { index, field, value } = action.payload;
      state.ownershipRows[index][field] = value;
    },

    // Actions for BorrowerForm
    updateBorrowerForm(
      state,
      action: PayloadAction<{ field: keyof BorrowerForm; value: any }>
    ) {
      const { field, value } = action.payload;
      state.borrowerForm[field] = value;
    },

  // Actions for relatedBorrowings
  updateRelatedBorrowing(
    state,
    action: PayloadAction<{ index: number; field: string; value: string | { contactName: string; borrower: string } }>
  ) {
    const { index, field, value } = action.payload;
    if (field === "addRow" && typeof value === "object") {
      state.borrowerForm.relatedBorrowings.push(value);
    } else {
      state.borrowerForm.relatedBorrowings[index][field] = value as string;
    }
  },

    // Actions for LoanPurposeForm
    updateLoanPurposeForm(
      state,
      action: PayloadAction<{ field: keyof LoanPurposeForm; value: any }>
    ) {
      const { field, value } = action.payload;
      if (field === "details") {
        state.loanPurposeForm.details = value;
      } else {
        state.loanPurposeForm[field] = value;
      }
    },
    updateLoanPurposeDetails(
      state,
      action: PayloadAction<{ index: number; field: keyof LoanPurposeForm["details"][0]; value: string }>
    ) {
      const { index, field, value } = action.payload;
      state.loanPurposeForm.details[index][field] = value;
    },
    
    // Actions for BorrowerProfileForm
    updateBorrowerProfileForm(
      state,
      action: PayloadAction<{ field: keyof BorrowerProfileForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.borrowerProfileForm[field] = value;
    },

    // Actions for IndustryAnalysis
    updateIndustryAnalysisForm(
      state,
      action: PayloadAction<{
        field: keyof IndustryAnalysisForm;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.industryAnalysisForm[field] = value;
    },

    // Actions for BusinessModelAnalysisForm
    updateBusinessModelAnalysisForm(
      state,
      action: PayloadAction<{
        field: keyof BusinessModelAnalysisForm;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.businessModelAnalysisForm[field] = value;
    },

     // Actions for ManagementForm
     updateManagementForm(
      state,
      action: PayloadAction<{ field: keyof ManagementForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.managementForm[field] = value;
    },

    // Actions for FinancialAnalysisForm
    updateFinancialAnalysisForm(
      state,
      action: PayloadAction<{ field: keyof FinancialAnalysisForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.financialAnalysisForm[field] = value;
    },

    // Actions for SecurityForm
    updateSecurityForm(
      state,
      action: PayloadAction<{ field: keyof SecurityForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.securityForm[field] = value;
    },
    // Actions for ConvenantsForm
    updateCovenantsForm(
      state,
      action: PayloadAction<{
        field: keyof CovenantsForm;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      if (field === "financialCovenants") {
        throw new Error(
          "Use a separate action to update financialCovenants fields."
        );
      }
      state.covenantsForm[field] = value;
    },
    updateFinancialCovenants(
      state,
      action: PayloadAction<{
        field: keyof FinancialCovenants;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.covenantsForm.financialCovenants[field] = value;
    },

    // Actions for PolicyExceptionForm
    updatePolicyExceptionForm(
      state,
      action: PayloadAction<{ field: keyof PolicyExceptionForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.policyExceptionForm[field] = value;
    },

    // Actions for EnvironmentalConditionsForm
    updateEnvironmentalConditionsForm(
      state,
      action: PayloadAction<{
        field: keyof EnvironmentalConditionsForm;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.environmentalConditionsForm[field] = value;
    },
     // Actions for ConclusionForm
     updateConclusionForm(
      state,
      action: PayloadAction<{ field: keyof ConclusionForm; value: string }>
    ) {
      const { field, value } = action.payload;
      state.conclusionForm[field] = value;
    },

    // Add a new reducer to handle the API response for all forms
    updateAllForms(
      state,
      action: PayloadAction<{
        borrowerForm: BorrowerForm;
        ownershipRows: OwnershipRow[];
        loanPurposeForm: LoanPurposeForm;
        borrowerProfileForm: BorrowerProfileForm;
        industryAnalysisForm: IndustryAnalysisForm;
        businessModelAnalysisForm: BusinessModelAnalysisForm;
        managementForm: ManagementForm;
        financialAnalysisForm: FinancialAnalysisForm;
        securityForm: SecurityForm;
        covenantsForm: CovenantsForm;
        policyExceptionForm: PolicyExceptionForm;
        environmentalConditionsForm: EnvironmentalConditionsForm;
        conclusionForm: ConclusionForm;
      }>
    ) {
      const {
        borrowerForm,
        ownershipRows,
        loanPurposeForm,
        borrowerProfileForm,
        industryAnalysisForm,
        businessModelAnalysisForm,
        managementForm,
        financialAnalysisForm,
        securityForm,
        covenantsForm,
        policyExceptionForm,
        environmentalConditionsForm,
        conclusionForm,
      } = action.payload;

      state.borrowerForm = borrowerForm;
      state.ownershipRows = ownershipRows;
      state.loanPurposeForm = loanPurposeForm;
      state.borrowerProfileForm = borrowerProfileForm;
      state.industryAnalysisForm = industryAnalysisForm;
      state.businessModelAnalysisForm = businessModelAnalysisForm;
      state.managementForm = managementForm;
      state.financialAnalysisForm = financialAnalysisForm;
      state.securityForm = securityForm;
      state.covenantsForm = covenantsForm;
      state.policyExceptionForm = policyExceptionForm;
      state.environmentalConditionsForm = environmentalConditionsForm;
      state.conclusionForm = conclusionForm;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorrowerData.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowerForm = {
          borrowerName: action.payload.borrower_name,
          dateOfApplication: parseDate(action.payload.date_of_application),
          typeOfBusiness: action.payload.type_of_business,
          riskRating: action.payload.risk_rating,
          newOrExisting: action.payload.new_or_existing,
          naicsCode: action.payload.naics_code,
          borrowerAddress: action.payload.borrower_address,
          telephoneNumber: action.payload.telephone,
          emailAddress: action.payload.email_address,
          faxNumber: action.payload.fax_number,
          branchNumber: action.payload.branch_number,
          accountNumber: action.payload.account_number,
          relatedBorrowings: action.payload.related_borrowings, // Store the array directly
        };
      })
      .addCase(fetchBorrowerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchFinancialAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchFinancialAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.financialAnalysisForm = {
            data: action.payload,
        };
    })
    .addCase(fetchFinancialAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    

    .addCase(fetchAllFormsData.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchAllFormsData.fulfilled, (state, action: PayloadAction<{
        borrowerForm: BorrowerForm;
        ownershipRows: OwnershipRow[];
        loanPurposeForm: LoanPurposeForm;
        borrowerProfileForm: BorrowerProfileForm;
        industryAnalysisForm: IndustryAnalysisForm;
        businessModelAnalysisForm: BusinessModelAnalysisForm;
        managementForm: ManagementForm;
        financialAnalysisForm: FinancialAnalysisForm;
        securityForm: SecurityForm;
        covenantsForm: CovenantsForm;
        policyExceptionForm: PolicyExceptionForm;
        environmentalConditionsForm: EnvironmentalConditionsForm;
        conclusionForm: ConclusionForm;
    }>) => {
        state.loading = false;
        const {
            borrowerForm,
            ownershipRows,
            loanPurposeForm,
            borrowerProfileForm,
            industryAnalysisForm,
            businessModelAnalysisForm,
            managementForm,
            financialAnalysisForm,
            securityForm,
            covenantsForm,
            policyExceptionForm,
            environmentalConditionsForm,
            conclusionForm,
        } = action.payload;

        state.borrowerForm = borrowerForm;
        state.ownershipRows = ownershipRows;
        state.loanPurposeForm = loanPurposeForm;
        state.borrowerProfileForm = borrowerProfileForm;
        state.industryAnalysisForm = industryAnalysisForm;
        state.businessModelAnalysisForm = businessModelAnalysisForm;
        state.managementForm = managementForm;
        state.financialAnalysisForm = financialAnalysisForm;
        state.securityForm = securityForm;
        state.covenantsForm = covenantsForm;
        state.policyExceptionForm = policyExceptionForm;
        state.environmentalConditionsForm = environmentalConditionsForm;
        state.conclusionForm = conclusionForm;
    })
    .addCase(fetchAllFormsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    });
  },
});



export const {
  addOwnershipRow,
  updateOwnershipRow,
  updateBorrowerForm,
  updateRelatedBorrowing,
  updateLoanPurposeForm,
  updateLoanPurposeDetails,
  updateBorrowerProfileForm,
  updateIndustryAnalysisForm,
  updateBusinessModelAnalysisForm,
  updateManagementForm,
  updateFinancialAnalysisForm,
  updateSecurityForm,
  updateCovenantsForm,
  updateFinancialCovenants,
  updatePolicyExceptionForm,
  updateEnvironmentalConditionsForm,
  updateConclusionForm,
  updateAllForms,
} = fillApplicationFormSlice.actions;

export default fillApplicationFormSlice.reducer;
