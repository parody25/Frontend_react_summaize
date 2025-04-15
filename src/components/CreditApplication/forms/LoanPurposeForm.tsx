import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { updateLoanPurposeForm, updateLoanPurposeDetails } from "../../../features/fill_application/fillApplicationFormSlice";
import { Grid, TextField, Typography, Box, Button, Divider } from "@mui/material";

const LoanPurposeForm: React.FC<{ isEditable: boolean }> = ({ isEditable }) => {
  const dispatch: AppDispatch = useDispatch();
  const { loanPurposeForm } = useSelector((state: RootState) => state.fillApplicationForm);

  const handleInputChange = (field: keyof typeof loanPurposeForm, value: string) => {
    dispatch(updateLoanPurposeForm({ field, value }));
  };

  const handleDetailsChange = (
    index: number,
    field: keyof typeof loanPurposeForm.details[0],
    value: string
  ) => {
    dispatch(updateLoanPurposeDetails({ index, field, value }));
  };

  const handleAddRow = () => {
    const newRow = {
      loanType: "",
      loanTerm: "",
      maxLoanAmount: "",
      amortization: "",
      paymentTerms: "",
      paymentAmount: "",
      interest: "",
      applicationFee: "",
      fees: "",
    };
    dispatch(updateLoanPurposeForm({ field: "details", value: [...loanPurposeForm.details, newRow] }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Loan Purpose Form
      </Typography>
      <Grid container spacing={2}>
        {/* Loan Purpose (Textarea) */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Loan Purpose"
            variant="outlined"
            multiline
            rows={4}
            value={loanPurposeForm.loanPurpose}
            onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
            disabled={!isEditable}
          />
        </Grid>

        {/* Loan Details */}
        {loanPurposeForm.details.map((detail, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Loan Type"
                variant="outlined"
                value={detail.loanType}
                onChange={(e) => handleDetailsChange(index, "loanType", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Loan Term"
                variant="outlined"
                value={detail.loanTerm}
                onChange={(e) => handleDetailsChange(index, "loanTerm", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Max Loan Amount"
                variant="outlined"
                value={detail.maxLoanAmount}
                onChange={(e) => handleDetailsChange(index, "maxLoanAmount", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Amortization"
                variant="outlined"
                value={detail.amortization}
                onChange={(e) => handleDetailsChange(index, "amortization", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Payment Terms"
                variant="outlined"
                value={detail.paymentTerms}
                onChange={(e) => handleDetailsChange(index, "paymentTerms", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Payment Amount"
                variant="outlined"
                value={detail.paymentAmount}
                onChange={(e) => handleDetailsChange(index, "paymentAmount", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Interest"
                variant="outlined"
                value={detail.interest}
                onChange={(e) => handleDetailsChange(index, "interest", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Application Fee"
                variant="outlined"
                value={detail.applicationFee}
                onChange={(e) => handleDetailsChange(index, "applicationFee", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Fees"
                variant="outlined"
                value={detail.fees}
                onChange={(e) => handleDetailsChange(index, "fees", e.target.value)}
                disabled={!isEditable}
              />
            </Grid>

            {/* Divider after each row */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
          </React.Fragment>
        ))}

        {/* Add Row Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRow}
            disabled={!isEditable}
          >
            Add Row
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanPurposeForm;