import React from 'react';
import { Box, Button } from '@mui/material';

interface NavigationButtonsProps {
    onBack: () => void;
    onNext: () => void;
    isBackDisabled?: boolean;
    isNextDisabled?: boolean;
    backButtonTitle?: string;
    nextButtonTitle?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    onBack,
    onNext,
    isBackDisabled = false,
    isNextDisabled = false,
    backButtonTitle = 'Back to Previous Step',
    nextButtonTitle = 'Next Step',
}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 10 }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={onBack}
                disabled={isBackDisabled}
            >
                {backButtonTitle}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={onNext}
                disabled={isNextDisabled}
            >
                {nextButtonTitle}
            </Button>
        </Box>
    );
};

export default NavigationButtons;