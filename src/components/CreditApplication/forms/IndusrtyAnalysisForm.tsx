import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { AppDispatch, RootState } from '../../../app/store';
import { updateIndustryAnalysisForm } from "../../../features/fill_application/fillApplicationFormSlice";

const IndustryAnalysisForm: React.FC <{ isEditable: boolean;}> = ({ isEditable})=> {
    const dispatch: AppDispatch = useDispatch();
    const industryAnalysisForm = useSelector(
        (state: RootState) => state.fillApplicationForm.industryAnalysisForm
    );

    const handleChange = (field: keyof typeof industryAnalysisForm, value: string) => {
        dispatch(updateIndustryAnalysisForm({ field, value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", industryAnalysisForm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {Object.keys(industryAnalysisForm).map((key) => (
                    <Grid item xs={12} sm={6} key={key}>
                        <TextField
                            fullWidth
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={(industryAnalysisForm as any)[key]}
                            onChange={(e) => handleChange(key as keyof typeof industryAnalysisForm, e.target.value)}
                            variant="outlined"
                            size="small"
                            disabled={!isEditable}
                        />
                    </Grid>
                ))}

            </Grid>
        </form>
    );
};

export default IndustryAnalysisForm;