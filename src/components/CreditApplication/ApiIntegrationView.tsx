import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  Storage as ServerIcon,
  Cloud as CloudIcon,
  Dns as CustomIcon,
} from '@mui/icons-material';
import CommonStepper from '../common/Stepper';
import {
  completeApiIntegration,
  setActiveView,
} from "../../features/fill_application/applicationSlice";
import { useAppDispatch } from '../../app/hooks';
import NavigationButtons from '../common/NavigationButtons';

type ApiConnection = {
  id: string;
  name: string;
  type: 'internal' | 'external' | 'custom';
  endpoint?: string;
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  img: string;
};

const ApiIntegrationView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [connections, setConnections] = useState<ApiConnection[]>([
    // Internal APIs
    {
      id: '1',
      name: 'CRM',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/crm.png`,
    },
    {
      id: '2',
      name: 'Enterprise Data Warehouse',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/edw.png`,
    },
    {
      id: '3',
      name: 'SharePoint Document Storage',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/sharepoint.webp`,
    },
    {
      id: '4',
      name: 'Loan Origination System',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/los.png`,
    },
    {
      id: '5',
      name: 'Core Banking System',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/core-banking.png`,
    },
    {
      id: '6',
      name: 'Financial Spreading',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/financial-spreading.png`,
    },
    {
      id: '7',
      name: 'Risk Rating Tool',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/risk-rating.png`,
    },
    {
      id: '8',
      name: 'RAROC Engine',
      type: 'internal',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/raroc.png`,
    },

    // Third-party APIs
    {
      id: '9',
      name: 'Analyst Report Subscription',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/analyst-reports.png`,
    },
    {
      id: '10',
      name: 'Central Bank Portal',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/central-bank.webp`,
    },
    {
      id: '11',
      name: 'Credit Bureau',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/credit-bureau.png`,
    },
    {
      id: '12',
      name: 'Collateral Valuation',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/collateral.jpeg`,
    },
    {
      id: '13',
      name: 'News',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/news.jpg`,
    },
    {
      id: '14',
      name: 'Trade Registry',
      type: 'external',
      status: 'disconnected',
      img: `${process.env.PUBLIC_URL}/assets/images/api-icons/trade-registry.png`,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const connectApi = async (id: string) => {
    setIsLoading(true);
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, status: 'connecting' } : conn
    ));

    // Simulate API connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    setConnections(connections.map(conn =>
      conn.id === id ? {
        ...conn,
        status: Math.random() > 0.2 ? 'connected' : 'error'
      } : conn
    ));
    setIsLoading(false);
  };

  const disconnectApi = (id: string) => {
    setConnections(connections.map(conn =>
      conn.id === id ? { ...conn, status: 'disconnected' } : conn
    ));
  };



  const getConnectionIcon = (type: ApiConnection['type']) => {
    switch (type) {
      case 'internal': return <ServerIcon color="primary" />;
      case 'external': return <CloudIcon color="secondary" />;
      case 'custom': return <CustomIcon color="action" />;
      default: return <ServerIcon />;
    }
  };


  return (
    <Box>
      {isLoading && <LinearProgress sx={{ width: '100%', position: 'fixed', top: 0, left: 0 }} />}

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <Typography color="text.primary">HOME PAGE (DASHBOARD)</Typography>
        <Typography color="text.primary">CREATE NEW CREDIT APPLICATION</Typography>
      </Breadcrumbs>

      {/* Stepper */}
      <CommonStepper activeStep={1} />


      <Grid container spacing={4}>
        {/* API Connections List */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" gutterBottom>
              Internal API Services
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <List>
              {connections.filter(conn => conn.type === 'internal').map(conn => (
                <ListItem
                  key={conn.id}
                  sx={{
                    bgcolor: conn.status === 'connected' ? 'success.light' : 'grey.100',
                    boxShadow: conn.status === 'connected' ? 3 : 0,
                    borderRadius: 1,
                    mb: 1,
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {conn.status === 'connected' ? (
                        <Button
                          variant="outlined"
                          sx={{
                            bgcolor: 'red',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'red',
                            },
                            '& .MuiButton-startIcon': {
                              color: 'white',
                            },
                          }}
                          startIcon={<LinkOffIcon />}
                          onClick={() => disconnectApi(conn.id)}
                          size="small"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={conn.status === 'connecting' ?
                            <CircularProgress size={19} color="inherit" /> :
                            <LinkIcon />}
                          onClick={() => connectApi(conn.id)}
                          disabled={conn.status === 'connecting'}
                          size="small"
                        >
                          {conn.status === 'connecting' ? 'Connecting' : 'Connect'}
                        </Button>
                      )}
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.light',
                        width: 35,
                        height: 35,
                        overflow: 'visible',
                      }}
                    >
                      <img
                        src={conn.img || `${process.env.PUBLIC_URL}/assets/images/default-api-icon.png`}
                        alt={conn.name}
                        style={{ width: '100%', height: '100%', objectFit: 'inherit' }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conn.name}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" gutterBottom>
              External API Services
            </Typography>
            <Divider sx={{ mb: 1 }} />

            <List>
              {connections.filter(conn => conn.type === 'external').map(conn => (
                <ListItem
                  key={conn.id}
                  sx={{
                    bgcolor: conn.status === 'connected' ? 'success.light' : 'grey.100',
                    boxShadow: conn.status === 'connected' ? 3 : 0,
                    borderRadius: 1,
                    mb: 1,
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {conn.status === 'connected' ? (
                        <Button
                          variant="outlined"
                          sx={{
                            bgcolor: 'red',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'red',
                            },
                            '& .MuiButton-startIcon': {
                              color: 'white',
                            },
                          }}
                          startIcon={<LinkOffIcon />}
                          onClick={() => disconnectApi(conn.id)}
                          size="small"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={conn.status === 'connecting' ?
                            <CircularProgress size={19} color="inherit" /> :
                            <LinkIcon />}
                          onClick={() => connectApi(conn.id)}
                          disabled={conn.status === 'connecting'}
                          size="small"
                        >
                          {conn.status === 'connecting' ? 'Connecting' : 'Connect'}
                        </Button>
                      )}
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: 'transparent',
                        width: 35,
                        height: 35,
                        overflow: 'visible',
                      }}
                    >
                      <img
                        src={conn.img || `${process.env.PUBLIC_URL}/assets/images/default-api-icon.png`}
                        alt={conn.name}
                        style={{ width: '100%', height: '100%', objectFit: 'inherit' }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conn.name}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <NavigationButtons
        onBack={() => dispatch(setActiveView('upload'))}
        onNext={() => dispatch(setActiveView('ai-analysis'))}
        isNextDisabled={!connections.some(c => c.status === 'connected')}></NavigationButtons>

    </Box>
  );
};

export default ApiIntegrationView;