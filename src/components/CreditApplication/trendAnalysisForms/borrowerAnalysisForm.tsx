import React, { useEffect } from "react";
import { TextField, Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store"; // Adjust the path based on your store location
import { updateManagementForm } from "../../../features/fill_application/fillApplicationFormSlice"; // Adjust the path based on your slice location
import { fetchManagement } from "../../../api/fill_application/managementApi";



const BorrowerAnalysis: React.FC<{ isEditable: boolean; }> = ({ isEditable }) => {
    const dispatch:AppDispatch = useDispatch();
    const { data,status } = useSelector((state: RootState) => state.management);
    const { application_id } = useSelector((state: RootState) => state.uploadFiles);
    const managementForm = useSelector(
        (state: RootState) => state.fillApplicationForm.managementForm
    );

    const handleChange = (field: keyof typeof managementForm, value: string) => {
        dispatch(updateManagementForm({ field, value }));
    };


    useEffect(() => {
        
        dispatch(fetchManagement({applicationID:application_id!}));
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
        <Box sx={{ padding: 2 }}>
            <TextField
                label="Board of Directors Profile"
                multiline
                rows={Math.max(1, Math.ceil((data || '').length / 50))} 
                fullWidth
                value={data}
                onChange={(e) => handleChange("boardOfDirectorsProfile", e.target.value)}
                variant="outlined"
                slotProps={{
                    input: {
                        style: { resize: "vertical" },
                    },
                }}
                sx={{
                    "& .MuiInputBase-root": {
                        overflow: "auto",
                    },
                }}
                disabled={!isEditable}
            />
        </Box>
    );
};

export default BorrowerAnalysis;