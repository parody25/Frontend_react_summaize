import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { updateEnvironmentalConditionsForm } from "../../../features/fill_application/fillApplicationFormSlice";
import { Grid, TextField, Typography, Box } from "@mui/material";

const EnvironmentalConditionsForm: React.FC <{ isEditable: boolean;}> = ({ isEditable}) => {
  const dispatch: AppDispatch = useDispatch();
  const { environmentalConditionsForm } = useSelector((state: RootState) => state.fillApplicationForm);

  const handleInputChange = (field: keyof typeof environmentalConditionsForm, value: string) => {
    dispatch(updateEnvironmentalConditionsForm({ field, value }));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Field Visit Details */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Field Visit Details"
            variant="outlined"
            multiline
            rows={4}
            value={environmentalConditionsForm.fieldVisitDetails}
            onChange={(e) => handleInputChange("fieldVisitDetails", e.target.value)}
            disabled={!isEditable}
          />
        </Grid>

        {/* Environmental Considerations */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Environmental Considerations"
            variant="outlined"
            multiline
            rows={4}
            value={environmentalConditionsForm.EnvConsiderations}
            onChange={(e) => handleInputChange("EnvConsiderations", e.target.value)}
            disabled={!isEditable}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnvironmentalConditionsForm;