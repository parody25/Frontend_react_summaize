import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CommonStepper from '../common/Stepper';
import navigationTitle from '../common/NavigationTitle';
import NavigationButtons from '../common/NavigationButtons';
import { setActiveView } from '../../features/fill_application/applicationSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { downloadDocument } from '../../api/download/downloadDocApi';

const DownloadApplicationView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const dispatch = useAppDispatch();
    const [applicationName, setApplicationName] = useState('');
    const [date, setDate] = useState('');
    const { loading, error, complete } = useAppSelector((state) => state.downloadDoc);
    const { application_id} = useSelector((state: RootState) => state.uploadFiles);
    const handleDownload = () => {
        dispatch(downloadDocument({applicationID:application_id!,date:date,credit_application_name:applicationName})); 
    };

    return (
        <Box>
            {/* navigationTitle */}
            {navigationTitle()}

            {/* Stepper */}
            <CommonStepper activeStep={4} />
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: '0 auto',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                }}
            >
                <TextField
                    label="Credit Application Name"
                    variant="outlined"
                    fullWidth
                    value={applicationName}
                    onChange={(e) => setApplicationName(e.target.value)}
                />
                <TextField
                    label="Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Downloading...' : 'Download'}
                </Button>
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
            </Box>
            <NavigationButtons
                onBack={() => dispatch(setActiveView('trend-analysis'))}
                onNext={() => dispatch(setActiveView('dashboard'))}
                nextButtonTitle="Done"
                isNextDisabled={!complete} // Disable "Done" button until download is complete
            />
        </Box>
    );
};

export default DownloadApplicationView;