import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { updateBorrowerForm, updateRelatedBorrowing } from '../../../features/fill_application/fillApplicationFormSlice';
import { Grid, TextField, CircularProgress, Typography, Box } from '@mui/material';
import { convertDDMMYYYYToISO } from '../../../utilities/dateFormat';
import ShimmerEffect from '../../common/ShimmerEffect';
import { fetchBorrowerData } from '../../../api/fill_application/borrowerApi';
import { fetchAllFormsData } from '../../../api/fill_application/fetchAllFormsApi';

const BorrowerForm: React.FC<{ isEditable: boolean;}> = ({ isEditable }) => {
  const dispatch: AppDispatch = useDispatch();
  const { application_id} = useSelector((state: RootState) => state.uploadFiles);
  const { borrowerForm, loading, error } = useSelector((state: RootState) => state.fillApplicationForm);
  

  useEffect(() => {
    // Fetch borrower data when the component mounts
    const applicationId = application_id!; // Replace with dynamic ID if needed
   dispatch(fetchBorrowerData(applicationId));
   //dispatch(fetchAllFormsData({ applicationId: application_id!, section: 'borrower_details' }));
  }, [dispatch]);


  const handleInputChange = (field: keyof typeof borrowerForm, value: string) => {
    if (field === 'dateOfApplication') {
      // Convert "dd/mm/yyyy" to "yyyy-mm-dd" before updating the state
      const isoDate = convertDDMMYYYYToISO(value);
      dispatch(updateBorrowerForm({ field, value: isoDate }));
    } else {
      dispatch(updateBorrowerForm({ field, value }));
    }
  };

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Borrower Name"
          variant="outlined"
          value={borrowerForm.borrowerName}
          onChange={(e) => handleInputChange('borrowerName', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Date of Application"
          variant="outlined"
          type="date"
          value={borrowerForm.dateOfApplication}
          onChange={(e) => handleInputChange('dateOfApplication', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Type of Business"
          variant="outlined"
          value={borrowerForm.typeOfBusiness}
          onChange={(e) => handleInputChange('typeOfBusiness', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Risk Rating"
          variant="outlined"
          value={borrowerForm.riskRating}
          onChange={(e) => handleInputChange('riskRating', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="New or Existing Business Borrower"
          variant="outlined"
          value={borrowerForm.newOrExisting}
          onChange={(e) => handleInputChange('newOrExisting', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="NAICS Code"
          variant="outlined"
          value={borrowerForm.naicsCode}
          onChange={(e) => handleInputChange('naicsCode', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="Borrower Address"
          variant="outlined"
          value={borrowerForm.borrowerAddress}
          onChange={(e) => handleInputChange('borrowerAddress', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Telephone Number"
          variant="outlined"
          value={borrowerForm.telephoneNumber}
          onChange={(e) => handleInputChange('telephoneNumber', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Email Address"
          variant="outlined"
          value={borrowerForm.emailAddress}
          onChange={(e) => handleInputChange('emailAddress', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="Fax Number"
          variant="outlined"
          value={borrowerForm.faxNumber}
          onChange={(e) => handleInputChange('faxNumber', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Branch Number"
          variant="outlined"
          value={borrowerForm.branchNumber}
          onChange={(e) => handleInputChange('branchNumber', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Account Number"
          variant="outlined"
          value={borrowerForm.accountNumber}
          onChange={(e) => handleInputChange('accountNumber', e.target.value)}
          disabled={!isEditable}
        />
      </Grid>
      <Grid item xs={12}>
        {borrowerForm.relatedBorrowings.map((borrowing:any, index:number) => (
          <Grid container spacing={2} key={index}>
        <Grid item xs={6} sx={{mb:2}}>
          <TextField
            fullWidth
            size="small"
            label={`Contact Name`}
            variant="outlined"
            value={borrowing['Contact Name'] || ""}
            onChange={(e) =>
          dispatch(
            updateRelatedBorrowing({
              index,
              field: "contactName",
              value: e.target.value,
            })
          )
            }
            disabled={!isEditable}
          />
        </Grid>
        <Grid item xs={6}  sx={{mb:2}}>
          <TextField
            fullWidth
            size="small"
            label={`Borrowings`}
            variant="outlined"
            value={borrowing['Borrowings'] || ""}
            onChange={(e) =>
          dispatch(
            updateRelatedBorrowing({
              index,
              field: "borrower",
              value: e.target.value,
            })
          )
            }
            disabled={!isEditable}
          />
        </Grid>
          </Grid>
        ))}
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
        <button
          onClick={() =>
            dispatch(
              updateRelatedBorrowing({
                index: borrowerForm.relatedBorrowings.length,
                field: "addRow",
                value: { contactName: "", borrower: "" },
              })
            )
          }
          disabled={!isEditable}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isEditable ? 'pointer' : 'not-allowed',
          }}
        >
          Add Row
        </button>
      </Grid>
      </Grid>
    </Grid>
  );
};

export default BorrowerForm;