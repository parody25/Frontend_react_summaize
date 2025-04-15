import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateFormField, resetForm } from "../../features/fill_application/formSlice";
import { FormPaper } from "./styles";
import { Application } from "./types";

const borrowerTypes = [
  { value: "existing", label: "Existing Customer" },
  { value: "new", label: "New Customer" },
];
interface CreateApplicationViewProps {
  onCancel: () => void;
  onSubmit: (application: Application) => void;
}

const CreateApplicationView: React.FC<CreateApplicationViewProps> = ({ onCancel, onSubmit }) => {
  
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name as keyof typeof formData, value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name as keyof typeof formData, value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newApplication = {
  //     name: "New Application",
  //     appNo: Math.floor(100000 + Math.random() * 900000).toString(),
  //     borrower: formData.borrowerName,
  //     status: "Submitted" as "Submitted",
  //     sources: "0 docs. 0 API",
  //   };
  //   dispatch(addApplication(newApplication));
  //   dispatch(resetForm());
  //   onCancel();
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApplication = {
      name: "New Application",
      appNo: Math.floor(100000 + Math.random() * 900000).toString(),
      borrower: formData.borrowerName,
      status: "Submitted" as "Submitted",
      sources: "0 docs. 0 API",
    };

    onSubmit(newApplication);
    dispatch(resetForm());
  };

  return (
    <Box>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Button
          onClick={onCancel}
          sx={{ p: 0, textTransform: "uppercase" }}
          color="inherit"
        >
          Dashboard
        </Button>
        <Typography color="text.primary">CREATE NEW CREDIT APPLICATION</Typography>
      </Breadcrumbs>

      <FormPaper elevation={2} sx={{backgroundColor: '#f9f9f9'}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Borrower Name"
                name="borrowerName"
                value={formData.borrowerName}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Borrower Registration Number/RIM"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Borrower Type</InputLabel>
                <Select
                  name="borrowerType"
                  value={formData.borrowerType}
                  onChange={handleSelectChange}
                  required
                  label="Borrower Type"
                >
                  {borrowerTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormPaper>
    </Box>
  );
};

export default CreateApplicationView;