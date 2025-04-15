import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { addOwnershipRow, updateOwnershipRow } from '../../../features/fill_application/fillApplicationFormSlice';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from '@mui/material';

interface OwnershipRow {
  name: string;
  position: string;
  dob: string;
  ownership: string;
  netWorth: string;
}

const OwnershipForm: React.FC <{ isEditable: boolean;}> = ({ isEditable})=> {
  const dispatch = useDispatch();
  const rows: OwnershipRow[] = useSelector((state: RootState) => state.fillApplicationForm.ownershipRows);

  const handleAddRow = () => {
    dispatch(addOwnershipRow());
  };

  const handleInputChange = (index: number, field: keyof OwnershipRow, value: string) => {
    dispatch(updateOwnershipRow({ index, field, value }));
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
        <TableRow>
          <TableCell sx={{ px: 0, py: 0.5 }}>Name</TableCell>
          <TableCell sx={{ px: 0, py: 0.5 }}>Position</TableCell>
          <TableCell sx={{ px: 0, py: 0.5 }}>Date of Birth</TableCell>
          <TableCell sx={{ px: 0, py: 0.5 }}>% Ownership</TableCell>
          <TableCell sx={{ px: 0, py: 0.5 }}>Net Worth</TableCell>
        </TableRow>
          </TableHead>
          <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell sx={{ px: 0, py: 0.5 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={row.name}
            onChange={(e) =>
              handleInputChange(index, 'name', e.target.value)
            }
            InputProps={{
              style: { fontSize: '12px' }, // Adjust input text font size
            }}
            InputLabelProps={{  

              style: { fontSize: '12px' }, // Adjust placeholder font size
            }}
            disabled={!isEditable}
         
          />
            </TableCell>
            <TableCell sx={{ px: 0.5, py: 0.5 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={row.position}
            onChange={(e) =>
              handleInputChange(index, 'position', e.target.value)
            }
            sx={{
              width: '120px',
            }}
            InputProps={{
              style: { fontSize: '12px' }, // Adjust input text font size
            }}
            InputLabelProps={{  

              style: { fontSize: '12px' }, // Adjust placeholder font size
            }}
            disabled={!isEditable}
          />
            </TableCell>
            <TableCell sx={{ px: 0.5, py: 0.5 }}>
            <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="date"
            value={row.dob}
            onChange={(e) =>
              handleInputChange(index, 'dob', e.target.value)
            }
            InputProps={{
              style: { fontSize: '12px', borderWidth: '2px' }, // Adjust input text font size and border width
            }}
            InputLabelProps={{
              style: { fontSize: '12px' }, // Adjust placeholder font size
            }}
            sx={{
              width: '140px',
              '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderWidth: '2px', // Increase border width
              },
              },
            }}
            disabled={!isEditable}
            />
            </TableCell>
            <TableCell sx={{ px: 0.5, py: 0.5 }}>
            <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={row.ownership}
            onChange={(e) =>
              handleInputChange(index, 'ownership', e.target.value)
            }
            InputProps={{
              style: { fontSize: '12px' }, // Adjust input text font size
            }}
            InputLabelProps={{
              style: { fontSize: '12px' }, // Adjust placeholder font size
            }}
            disabled={!isEditable}
            />
            </TableCell>
            <TableCell sx={{ px: 0.5, py: 0.5 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={row.netWorth}
            onChange={(e) =>
              handleInputChange(index, 'netWorth', e.target.value)
            }
            InputProps={{
              style: { fontSize: '12px' }, // Adjust input text font size
            }}
            InputLabelProps={{  

              style: { fontSize: '12px' }, // Adjust placeholder font size
            }}
            disabled={!isEditable}
          
          />
            </TableCell>
          </TableRow>
        ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        sx={{ mt: 2 }}
      >
        Add Row
      </Button>
    </Box>
  );
};

export default OwnershipForm;