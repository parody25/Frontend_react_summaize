import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const CommonStepper: React.FC<{ activeStep: number }> = ({ activeStep }) => {
  const steps = [
    'Upload Documents',
    'Select Integration',
    'Fill application',
    'Trend Analysis',
    'Download',
  ];

  return (
    <Box sx={{ width: '100%', paddingBottom: '40px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CommonStepper;