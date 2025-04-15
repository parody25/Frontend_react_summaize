import React, { useState } from "react";
import { TextField, Box, CircularProgress, Typography, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store"; // Adjust the path based on your store location
import { formatText } from "../../../utilities/formatText";
import { fetchRiskAnalysis } from "../../../api/trend_analysis/riskAnalysisApi";
import ShimmerEffect from "../../common/ShimmerEffect";


const RiskAnalysis: React.FC<{ isEditable: boolean; }> = ({ isEditable }) => {
    const dispatch:AppDispatch = useDispatch();
    const { data,status } = useSelector((state: RootState) => state.riskAnalysis);
    const { application_id } = useSelector((state: RootState) => state.uploadFiles);
    
    const handlechange=()=>{
      dispatch(fetchRiskAnalysis(application_id!));
    }

    if (status === 'loading') {
      return <ShimmerEffect hieght={20} count={8}/>
      }
    
      if (status === 'failed') {
        return (
             <Typography color="error" variant="h6" align="center">
               Failed load the data...
             </Typography>
           );
      }

    return (
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          size='small'
          onClick={() => handlechange()}
          sx={{
            fontSize:'6', mb:2
          }}
           >
            Risk Bureau Report
        </Button>
        <Typography variant="h6"  sx={{ margin:'6px', fontWeight: 'bold' }}>
        Risk Analysis
         </Typography>
        <TextField
          label=""
          multiline
          rows={Math.max(1, Math.ceil((data || '').length / 50))}
          fullWidth
          value={(data ? formatText(data) : '')}
          onChange={()=>{}}
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

export default RiskAnalysis;