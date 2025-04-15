import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";  // Adjust the path based on your store location
import { updateFinancialAnalysisForm } from "../../../features/fill_application/fillApplicationFormSlice"; // Adjust the path based on your slice location
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { mapRatiosToList } from "../../../utilities/ratioConvertor";
import ShimmerEffect from "../../common/ShimmerEffect";
import { formatText } from "../../../utilities/formatText";
import { fetchFinancialAnalysis, fetchRatios } from "../../../api/fill_application/financialAnalysisApi";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: 'Financial Ratio Data'
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
      opacity: {
        from: 0,
        to: 1
      }
    }
  },

};


const FinancialAnalysisFormView: React.FC<{ isEditable: boolean; }> = ({ isEditable }) => {
  const dispatch: AppDispatch = useDispatch();
  const { application_id} = useSelector((state: RootState) => state.uploadFiles);

  const ratios = useSelector(
    (state: RootState) => state.ratios
  );

  const { financialAnalysisForm, loading, error } = useSelector((state: RootState) => state.fillApplicationForm);

  const ratioList = mapRatiosToList(ratios.data);

  const data = ratioList.map((item, index) => {
    return {
      labels: item.value.map((entry) => entry.year),
      datasets: [
        {
          label: item.label,
          data: item.value.map((entry) => entry.value),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
        },
        {
          label: "Threshold ",
          data: item.value.map((entry)=> {
            if(entry.threshold!==0)
             return entry.threshold;
          }),
          borderColor: 'rgb(11, 8, 147)',
          backgroundColor: 'rgba(8, 16, 121, 0.1)',
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgb(28, 8, 84)',
          tension: 0.1,
          fill: true,
        },
      ]
    }
  });

  const handlechange=()=>{
    dispatch(fetchRatios(application_id!));
    dispatch(fetchFinancialAnalysis(application_id!));
  }

  if(ratios.loading){
    return <ShimmerEffect hieght={20} count={8}/>
  }

  if(loading){
    return <ShimmerEffect hieght={20} count={8}/>
  }

  if (error) {
      return (
        <Typography color="error" variant="h6" align="center">
          {error}
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
          AUTOMATED SPREADING
      </Button>
      <Typography variant="h6"  sx={{ margin:'6px', fontWeight: 'bold' }}>
      Financial Analysis
       </Typography>
      <TextField
        label=""
        multiline
        rows={Math.max(1, Math.ceil((financialAnalysisForm.data || '').length / 50))}
        fullWidth
        value={(financialAnalysisForm.data ? formatText(financialAnalysisForm.data) : '')}
        onChange={(e) => dispatch(
          updateFinancialAnalysisForm({ field: "data", value: e.target.value })
        )}
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

      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6}>
            <Line data={item} options={options} />
          </Grid>
        ))}
      </Grid>
    </Box>

  );
};

export default FinancialAnalysisFormView;