import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { Grid, TextField, Box, Typography, Button } from "@mui/material";
import ShimmerEffect from "../../common/ShimmerEffect";
import { formatText } from "../../../utilities/formatText";
import { fetchJustification } from "../../../api/trend_analysis/justifiactionApi";

const ConclusionForm: React.FC<{ isEditable: boolean; }> = ({ isEditable }) => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status } = useSelector((state: RootState) => state.justifiaction);
  const { application_id } = useSelector((state: RootState) => state.uploadFiles);


  useEffect(() => {
    dispatch(fetchJustification(application_id!));
  }, [dispatch]);


  if (status === 'loading') {
    return <ShimmerEffect hieght={20} count={8} />
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
      <Typography variant="h6" sx={{ margin: '6px', fontWeight: 'bold' }}>
        Conclusion
      </Typography>
      <TextField
        label=""
        multiline
        rows={Math.max(1, Math.ceil((data || '').length / 50))}
        fullWidth
        value={(data ? formatText(data) : '')}
        onChange={() => { }}
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

export default ConclusionForm;