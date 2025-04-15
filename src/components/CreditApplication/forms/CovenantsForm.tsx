import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { updateCovenantsForm, updateFinancialCovenants } from "../../../features/fill_application/fillApplicationFormSlice";
import { Grid, TextField, Typography, Box } from "@mui/material";

const CovenantsForm: React.FC <{ isEditable: boolean;}> = ({ isEditable})=> {
  const dispatch: AppDispatch = useDispatch();
  const { covenantsForm } = useSelector((state: RootState) => state.fillApplicationForm);

  const handleFinancialCovenantsChange = (field: keyof typeof covenantsForm.financialCovenants, value: string) => {
    dispatch(updateFinancialCovenants({ field, value }));
  };

  const handleCovenantsChange = (field: keyof typeof covenantsForm, value: string) => {
    dispatch(updateCovenantsForm({ field, value }));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Financial Covenants */}
        <Typography variant="h6"  sx={{ margin:'18px', fontWeight: 'bold' }}>
          Financial Covenants
        </Typography>
        <Grid item xs={12}></Grid>
          <table style={{ width: "100%", margin:'18px', borderCollapse: "collapse" }}>
            <tbody>
              {Object.keys(covenantsForm.financialCovenants).map((key) => (
            <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "1px", textAlign: "left", fontWeight: "bold" }}>
                {key.replace(/([A-Z])/g, " $1")} {/* Format label */}
              </td>
              <td style={{ padding: "8px" }}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={covenantsForm.financialCovenants[key as keyof typeof covenantsForm.financialCovenants]}
                  onChange={(e) =>
                  handleFinancialCovenantsChange(key as keyof typeof covenantsForm.financialCovenants, e.target.value)
                  }
                />
              </td>
            </tr>
              ))}
            </tbody>
          </table>
        </Grid>

        {/* Reporting Covenant */}
        <Grid item xs={12} sx={{ marginTop: '18px' }}>
          <TextField
            fullWidth
            size="small"
            label="Reporting Covenants"
            variant="outlined"
            value={covenantsForm.reportingCovenant}
            onChange={(e) => handleCovenantsChange("reportingCovenant", e.target.value)}
          />
        </Grid>

        {/* Terms and Conditions Details */}
        <Grid item xs={12} sx={{ marginTop: '18px' }}>
          <TextField
            fullWidth
            size="small"
            label="Terms and Conditions Details"
            variant="outlined"
            multiline
            rows={4}
            value={covenantsForm.termsAndConditionsDetails}
            onChange={(e) => handleCovenantsChange("termsAndConditionsDetails", e.target.value)}
            disabled={!isEditable}
          />
        </Grid>
    </Box>
  );
};

export default CovenantsForm;