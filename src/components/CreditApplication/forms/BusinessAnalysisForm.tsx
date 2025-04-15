import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { updateBusinessModelAnalysisForm } from "../../../features/fill_application/fillApplicationFormSlice";
import { TextField, Grid, Box } from "@mui/material";

const BusinessAnalysisForm: React.FC<{ isEditable: boolean;}> = ({ isEditable})=> {
    const dispatch = useDispatch();
    const businessModelAnalysisForm = useSelector(
        (state: RootState) => state.fillApplicationForm.businessModelAnalysisForm
    );

    const handleChange = (field: keyof typeof businessModelAnalysisForm) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(
            updateBusinessModelAnalysisForm({
                field,
                value: event.target.value,
            })
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Competitors"
                        value={businessModelAnalysisForm.competitors}
                        onChange={handleChange("competitors")}
                        variant="outlined"
                        disabled={!isEditable}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Suppliers"
                        value={businessModelAnalysisForm.suppliers}
                        onChange={handleChange("suppliers")}
                        variant="outlined"
                        disabled={!isEditable}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Customers"
                        value={businessModelAnalysisForm.customers}
                        onChange={handleChange("customers")}
                        variant="outlined"
                        disabled={!isEditable}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Strategy"
                        value={businessModelAnalysisForm.strategy}
                        onChange={handleChange("strategy")}
                        variant="outlined"
                        disabled={!isEditable}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default BusinessAnalysisForm;