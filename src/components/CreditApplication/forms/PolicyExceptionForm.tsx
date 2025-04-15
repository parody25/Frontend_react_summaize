import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { updatePolicyExceptionForm } from "../../../features/fill_application/fillApplicationFormSlice";
import { Grid, TextField, Box } from "@mui/material";

const PolicyExceptionForm: React.FC<{ isEditable: boolean;}> = ({ isEditable})=> {
  const dispatch: AppDispatch = useDispatch();
  const { policyExceptionForm } = useSelector((state: RootState) => state.fillApplicationForm);

  const handleInputChange = (field: keyof typeof policyExceptionForm, value: string) => {
    dispatch(updatePolicyExceptionForm({ field, value }));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Policy Exception */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Policy Exception"
            variant="outlined"
            multiline
            rows={4}
            value={policyExceptionForm.policyException}
            onChange={(e) => handleInputChange("policyException", e.target.value)}
            disabled={!isEditable}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PolicyExceptionForm;