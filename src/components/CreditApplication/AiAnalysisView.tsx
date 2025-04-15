import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  List,
  ListItem,
  IconButton,
  InputAdornment,
  Drawer,
  ListItemButton,
  ListItemText,
  useTheme,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@mui/material';
import {
  Send as SendIcon,
  AccountCircle as UserIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Menu as MenuIcon,
  SmartToy as SmartToyIcon,
  Chat as ChatIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import BorrowerForm from './forms/BorrowerForm';
import OwnershipForm from './forms/OwnershipForm';
import CommonStepper from '../common/Stepper';
import NavigationButtons from '../common/NavigationButtons';
import {
  setActiveView,
} from "../../features/fill_application/applicationSlice";
import { useAppDispatch } from '../../app/hooks';
import navigationTitle from '../common/NavigationTitle';
import BorrowerHistoryForm from './forms/BorrowerHistory';
import LoanPurposeForm from './forms/LoanPurposeForm';
import IndustryAnalysisForm from './forms/IndusrtyAnalysisForm';
import BusinessAnalysisForm from './forms/BusinessAnalysisForm';
import ManagementAnalysis from './forms/ManagementAnalysis';
import FinancialAnalysisForm from './forms/FinancialAnalysisForm';
import SecurityForm from './forms/SecurityForm';
import CovenantsForm from './forms/CovenantsForm';
import PolicyExceptionForm from './forms/PolicyExceptionForm';
import EnvironmentalConditionsForm from './forms/EnvironmentalConditionsForm';
import ConclusionForm from './trendAnalysisForms/ConclusionForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchChatbotMessage } from '../../api/fill_application/chatBotApi';
import RiskAnalysis from './forms/RiskAnalysisForm';

const menuItems = [
  {
    text: "Borrower Details",
    view: "borrower",
  },
  {
    text: "Ownership",
    view: "ownership",
  },
  {
    text: "Loan Purpose and Structure",
    view: "loanPurpose",
  },
  {
    text: "Borrower History and Background",
    view: "borrowerHistory",
  },
  {
    text: "Industry Analysis",
    view: "industryAnalysis",
  },
  {
    text: "Business Model Analysis",
    view: "businessModel",
  },
  {
    text: "Management Analysis",
    view: "managementAnalysis",
  },
  {
    text: "Financial Analysis",
    view: "financialAnalysis",
  },
  {
    text: "Security",
    view: "security",
  },
  {
    text: "Terms and Conditions",
    view: "covenants",
  },
  {
    text: "Policy Exceptions",
    view: "policyExceptions",
  },
  {
    text: "Environmental Conditions",
    view: "environmentalConditions",
  },
  {
    text: "Risk Analysis",
    view: "riskAnalysis",
  }
];

const AiAnalysisView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: "Hello! I'm your credit analysis assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [dataSource, setDataSource] =useState<String>('CRM');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [activeForm, setActiveForm] = useState<String>('borrower');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const dispatch = useAppDispatch();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length >1) {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatOpen]); // Trigger scroll when the chatbot is opened

  const { application_id} = useSelector((state: RootState) => state.uploadFiles);

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setIsLoading(true);
        dispatch(fetchChatbotMessage({ question: input, applicationID: application_id! }))
          .unwrap()
          .then((response) => {
            setMessages((prev) => [
              ...prev,
              { text: response.answer, sender: 'bot' },
            ]);
          })
          .catch((error) => {
            setMessages((prev) => [
              ...prev,
              { text: `Error: ${error}`, sender: 'bot' },
            ]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      //}, 1500);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'borrower':
        return <BorrowerForm isEditable={isEditable ? true : false} />;
      case 'ownership':
        return <OwnershipForm isEditable={isEditable ? true : false} />;
      case 'loanPurpose':
        return <LoanPurposeForm isEditable={isEditable ? true : false} />;
      case 'borrowerHistory':
        return <BorrowerHistoryForm isEditable={isEditable ? true : false} />;
      case 'industryAnalysis':
        return <IndustryAnalysisForm isEditable={isEditable ? true : false} />;
      case 'businessModel':
        return <BusinessAnalysisForm isEditable={isEditable ? true : false} />;
      case 'managementAnalysis':
        return <ManagementAnalysis isEditable={isEditable ? true : false} />;
      case 'financialAnalysis':
        return <FinancialAnalysisForm isEditable={isEditable ? true : false} />;
      case 'security':
        return <SecurityForm isEditable={isEditable ? true : false} />;
      case 'covenants':
        return <CovenantsForm isEditable={isEditable ? true : false} />;
      case 'policyExceptions':
        return <PolicyExceptionForm isEditable={isEditable ? true : false} />;
      case 'environmentalConditions':
        return <EnvironmentalConditionsForm isEditable={isEditable ? true : false} />;
      case 'riskAnalysis':
        return <RiskAnalysis isEditable={isEditable ? true : false} />;
      // Add cases for other forms
      default:
        return null;
    }
  };


  const renderDataSourceTitle = () => {
    switch (activeForm) {
      case 'borrower':
        return 'CRM';
      case 'ownership':
        return 'SharePoint';
      case 'loanPurpose':
        return 'CRM';
      case 'borrowerHistory':
        return 'Public Web Info';
      case 'industryAnalysis':
        return 'SharePoint';
      case 'businessModel':
        return 'SharePoint';
      case 'managementAnalysis':
        return 'SharePoint';
      case 'financialAnalysis':
        return 'Credit lens';
      case 'security':
        return 'SharePoint';
      case 'covenants':
        return 'Data Warehouse';
      case 'policyExceptions':
        return 'Data Warehouse';
      case 'environmentalConditions':
        return 'CRM';
      case 'riskAnalysis':
        return null;
      default:
        return null;
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left Sidebar */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <Box sx={{ p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              selected={activeForm === item.view}
              onClick={() => {
                if (!isEditable) {
                  setActiveForm(item.view);
                } else {
                  setDialogOpen(true);

                }
              }}
              sx={{
                paddingBottom: 2,
                "&.Mui-selected": {
                  backgroundColor: colors.grey[200],
                  color: theme.palette.primary.dark,
                  fontWeight: "bold",
                  boxShadow: theme.shadows[3], // Added elevation
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.dark,
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: "bold",
                  },
                },
                "&.Mui-selected:hover": {
                  backgroundColor: colors.grey[100],
                  boxShadow: theme.shadows[4], // Slightly increased elevation on hover
                },
              }}
            >

              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: {
                    style: {
                      fontWeight:
                        activeForm === item.view
                          ? "bold"
                          : "normal",
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, ml: 3 }}>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unsaved Changes"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have unsaved changes. Please save your changes before navigating to another section.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                setEditable(false);
              }}
              color="primary"
              autoFocus
            >
              Discard Changes
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: '2', flexDirection: 'row' }}>
          {!drawerOpen && (<IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 1, mb: 3 }}
          >
            <MenuIcon />
          </IconButton>)}

          {/* navigationTitle */}
          {navigationTitle()}
        </Box>


        {/* Stepper */}
        <CommonStepper activeStep={2} />


        <Grid container spacing={4}>
          {/* Left Column - Form */}
          <Grid item xs={12} md={13}>
            <Paper elevation={2} sx={{ p: 1, border: '1px solid #e0e0e0', height: 'auto' }}>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {menuItems.map((item, index) => (
                    (item.view === activeForm) && (item.text)
                  ))}
                </Typography>
                {renderDataSourceTitle()!==null &&(<Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    padding: '8px 12px',
                    minWidth: 120,
                    display: 'inline-block',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {renderDataSourceTitle()}
                  </Typography> 
                </Box>)}
              </Box>

              <Divider sx={{ mb: 3 }} />

              {renderForm()}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setEditable(true)}
                  disabled={isEditable}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (isEditable) {
                      // Add save logic here
                      setEditable(false);
                    }
                  }}
                  disabled={!isEditable}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - AI Chat */}


          {/* <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 0, border: '1px solid #e0e0e0', height: 'auto', borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ p: 3, backgroundColor: '#1565C0', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                  AI Chat Assistant
                </Typography>
              </Box>

              <Box sx={{ height: '400px', overflowY: 'auto', p: 2, backgroundColor: '#f9f9f9' }}>
                <List>
                  {messages.map((message, index) => (
                    <ListItem key={index} sx={{
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}>
                      {message.sender === 'bot' && (
                        <Avatar sx={{ mr: 1, bgcolor: 'primary.main', boxShadow: 2 }}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/ai.avif`}
                            alt='AI'
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </Avatar>
                      )}
                      <Card
                        sx={{
                          maxWidth: '70%',
                          bgcolor: message.sender === 'user' ? '#e3f2fd' : 'primary.light',
                          color: message.sender === 'user' ? 'text.primary' : 'primary.contrastText',
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                      >
                        <CardContent>
                          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                            {message.text}
                          </Typography>
                        </CardContent>
                      </Card>
                      {message.sender === 'user' && (
                        <Avatar sx={{ ml: 1, bgcolor: 'grey.500', boxShadow: 2 }}>
                          <UserIcon />
                        </Avatar>
                      )}
                    </ListItem>
                  ))}
                  {isLoading && (
                    <ListItem sx={{ justifyContent: 'flex-start' }}>
                      <Avatar sx={{ mr: 1, bgcolor: 'primary.main', boxShadow: 2 }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/ai.avif`}
                          alt='AI'
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </Avatar>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            animation: 'bounce 1.5s infinite ease-in-out',
                            '@keyframes bounce': {
                              '0%, 80%, 100%': { transform: 'scale(0)' },
                              '40%': { transform: 'scale(1)' },
                            },
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            animation: 'bounce 1.5s infinite ease-in-out',
                            animationDelay: '0.2s',
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            animation: 'bounce 1.5s infinite ease-in-out',
                            animationDelay: '0.4s',
                          }}
                        />
                      </Box>
                    </ListItem>
                  )}
                  <div ref={chatEndRef} />
                </List>
              </Box>

              <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#f1f1f1' }}>

                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={activeForm === 'borrower'
                    ? "Ask about this borrower..."
                    : "Ask about this customer..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="primary"
                          onClick={handleSendMessage}
                          disabled={!input.trim() || isLoading}
                          sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    borderRadius: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>*/}


        </Grid> 

        <NavigationButtons
          onBack={() => dispatch(setActiveView('api-integration'))}
          onNext={() => dispatch(setActiveView('trend-analysis'))}
          isNextDisabled={false}></NavigationButtons>

            {/* Floating Chatbot */}
        <Fab
          color="primary"
          aria-label="chat"
          onClick={() => setChatOpen(!chatOpen)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1300,
            animation: 'fab-hero 0.6s ease-in-out',
            '@keyframes fab-hero': {
              '0%': {
                transform: 'scale(0)',
                opacity: 0,
              },
              '50%': {
                transform: 'scale(1.2)',
                opacity: 0.8,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        >
          <ChatIcon />
        </Fab>

        {chatOpen && (
          <Paper
            elevation={5}
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              width: '50vw',
              height: '100vh',
              maxHeight: 500,
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              overflow: 'hidden',
              zIndex: 1300,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ p: 2, backgroundColor: '#1565C0', color: 'white', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                AI Chat Assistant
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, backgroundColor: '#f9f9f9' }}>
              <List>
                {messages.map((message, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-start',
                      mb: 1,
                    }}
                  >
                    {message.sender === 'bot' && (
                      <Avatar sx={{ mr: 1, bgcolor: 'primary.main', boxShadow: 2 }}>
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/images/ai.avif`}
                          alt="AI"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </Avatar>
                    )}
                    <Card
                      sx={{
                        maxWidth: '70%',
                        bgcolor: message.sender === 'user' ? '#e3f2fd' : 'primary.light',
                        color: message.sender === 'user' ? 'text.primary' : 'primary.contrastText',
                        borderRadius: 2,
                        boxShadow: 3,
                        position: 'relative',
                      }}
                    >
                      <CardContent sx={{ position: 'relative', paddingBottom: '32px' }}>
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' ,padding: 1}}>
                          {message.text}
                        </Typography>
                        {message.sender === 'bot' && (
                          <IconButton
                            size="small"
                            onClick={() => handleCopyText(message.text)}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              right: 4,
                              color: 'grey',
                              borderColor: 'primary.main',
                              borderRadius: '50%',
                              margin: 0.5,
                              width: 20,
                              height: 20,
                              '&:hover': { bgcolor: 'primary.light' },
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        )}
                      </CardContent>
                    </Card>
                    {message.sender === 'user' && (
                      <Avatar sx={{ ml: 1, bgcolor: 'grey.500', boxShadow: 2 }}>
                        <UserIcon />
                      </Avatar>
                    )}
                  </ListItem>
                ))}
                {isLoading && (
                  <ListItem sx={{ justifyContent: 'flex-start' }}>
                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main', boxShadow: 2 }}>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/ai.avif`}
                        alt="AI"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Avatar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          animation: 'bounce 1.5s infinite ease-in-out',
                          '@keyframes bounce': {
                            '0%, 80%, 100%': { transform: 'scale(0)' },
                            '40%': { transform: 'scale(1)' },
                          },
                        }}
                      />
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          animation: 'bounce 1.5s infinite ease-in-out',
                          animationDelay: '0.2s',
                        }}
                      />
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          animation: 'bounce 1.5s infinite ease-in-out',
                          animationDelay: '0.4s',
                        }}
                      />
                    </Box>
                  </ListItem>
                )}
                <div ref={chatEndRef} />
              </List>
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#f1f1f1' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={activeForm === 'borrower' ? 'Ask about this borrower...' : 'Ask about this customer...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading}
                        sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Paper>
        )}

      </Box>


    </Box>

  );
};

export default AiAnalysisView;
