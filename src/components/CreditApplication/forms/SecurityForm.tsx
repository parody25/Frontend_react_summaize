import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { updateSecurityForm } from "../../../features/fill_application/fillApplicationFormSlice";
import { Grid, TextField, Box, Typography, CircularProgress } from "@mui/material";
import { fetchCollateralQA } from "../../../api/fill_application/collateralQAApi";


const SecurityForm: React.FC <{ isEditable: boolean;}> = ({ isEditable})=> {
    const dispatch: AppDispatch = useDispatch();
    const { securityForm } = useSelector((state: RootState) => state.fillApplicationForm);
    const { data ,status} = useSelector((state: RootState) => state.collaterQA);
    const { application_id} = useSelector((state: RootState) => state.uploadFiles);

    const handleInputChange = (field: keyof typeof securityForm, value: string) => {
        dispatch(updateSecurityForm({ field, value }));
    };

     useEffect(() => {
        const applicationId = application_id!; // Replace with dynamic ID if needed
       dispatch(fetchCollateralQA({applicationID: applicationId}));
      }, [dispatch]);



          if (status === 'loading') {
              return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              );
            }
          
            if (status === 'failed') {
              return (
                <Typography color="error" variant="h6" align="center">
                  Failed to fetch data
                </Typography>
              );
            }

    return (
        <Box>
            <Grid container spacing={2} sx={{ padding: 4, }}>
                {/* Personal Guarantee */}

                <TextField
                    fullWidth
                    size="small"
                    label="Personal Guarantee"
                    variant="outlined"
                    value={securityForm.personalGuarantee}
                    onChange={(e) => handleInputChange("personalGuarantee", e.target.value)}
                    style={{ marginBottom: "16px" }}
                    disabled={!isEditable}
                />


                {/* Real Estate */}

                <TextField
                    fullWidth
                    size="small"
                    label="Real Estate Security"
                    variant="outlined"
                    value={data}
                    rows={Math.max(1, Math.ceil((data || '').length / 50))} 
                    onChange={(e) => handleInputChange("realEstate", e.target.value)}
                    style={{ marginBottom: "16px" }}
                    disabled={!isEditable}
                />

                <TextField
                    fullWidth
                    size="small"
                    label="Equipment Security"
                    variant="outlined"
                    value={securityForm.equipment}
                    onChange={(e) => handleInputChange("equipment", e.target.value)}
                    style={{ marginBottom: "16px" }}
                    disabled={!isEditable}
                />

                <TextField
                    fullWidth
                    size="small"
                    label="Inventory and Accounts Receivable Security"
                    variant="outlined"
                    value={securityForm.inventoryAndAccounts}
                    onChange={(e) => handleInputChange("inventoryAndAccounts", e.target.value)}
                    style={{ marginBottom: "16px" }}
                    disabled={!isEditable}
                />

            </Grid>
        </Box>
    );
};

export default SecurityForm;