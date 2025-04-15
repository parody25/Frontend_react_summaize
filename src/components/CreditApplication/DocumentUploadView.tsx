import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  AddLink as AddLinkIcon
} from "@mui/icons-material";
import { FormPaper } from "./styles";
import { UrlItem } from "./types";
import CommonStepper from "../common/Stepper";
import navigationTitle from "../common/NavigationTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchWebScrapingData } from "../../api/upload_documents/webScrapingApi";
import { resetForm } from "../../features/upload_documents/webScrapingSlice";
import { uploadDocumentsAction } from "../../api/upload_documents/uploadFilesApi";
import { resetUploadState } from "../../features/upload_documents/uploadFilesSlice";
import { red } from "@mui/material/colors";

type Document = {
  id: string;
  name: string;
  category: string;
  type: "PDF" | "Excel" | "Word";
  file: File;
  uploaded: boolean;
};

type DocumentCategory = {
  id: string;
  name: string;
};

const documentCategories: DocumentCategory[] = [
  { id: "1", name: "Account Receivable/Payables Aging Report" },
  { id: "2", name: "Annual Report" },
  { id: "3", name: "Audited Financial Statements" },
  { id: "4", name: "Business Profile" },
  { id: "5", name: "Business Plan and Business Strategy" },
  { id: "6", name: "Budgetary controls and accounting" },
  { id: "7", name: "Cash Flow Projections" },
  { id: "8", name: "Collateral and Security" },
  { id: "9", name: "Credit Bureau Reports" },
  { id: "10", name: "Details of professional advisors, attorneys and auditors" },
  { id: "11", name: "List of Officers and Directors" },
  { id: "12", name: "List of suppliers and customers" },
  { id: "13", name: "Management and manpower development plans" },
  { id: "14", name: "Ownership Structure" },
  { id: "15", name: "Policies, procedures and management info systems" },
  { id: "16", name: "Registration Documents and Trade Certificate" },
  { id: "17", name: "Unaudited Financial Statements" },
  { id: "18", name: "Tax returns" },
];

const documentTypes = ["PDF", "Excel", "Word"];

const DocumentUploadView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Partial<Document>>({
    name: "",
    category: "",
    type: "PDF",
  });
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const { summary: data, loading, error } = useSelector((state: RootState) => state.webScraping);
  const [url, setUrl] = useState("");
  const [urlItems, setUrlItems] = useState<UrlItem[]>([]);
  const [currentUrl, setCurrentUrl] = useState<Omit<UrlItem, 'id'>>({
    name: '',
    url: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { loadingUploadDoc, uploadDocError, uploadDocStatus, application_id, } = useSelector((state: RootState) => state.uploadFiles);
 



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentDocument({
        ...currentDocument,
        file: e.target.files[0],
      });
    }
  };

  const handleSubmitDocument = () => {
    if (currentDocument.name && currentDocument.category && currentDocument.file) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: currentDocument.name,
        category: currentDocument.category,
        type: currentDocument.type as "PDF" | "Excel" | "Word",
        file: currentDocument.file,
        uploaded: false,
      };
      setDocuments([...documents, newDocument]);
      setCurrentDocument({
        name: "",
        category: "",
        type: "PDF",
      });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUrl(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUrl  = async () => {
    console.log("outer")
    if (currentUrl.name && currentUrl.url) {
      console.log("inner")
      await dispatch(fetchWebScrapingData({applicationID:application_id!,URL:currentUrl.url})).then(res => {
          console.log("inner222")
          const newUrlItem = {
            id: Date.now().toString(),
            ...currentUrl
          };
          setUrlItems([...urlItems, newUrlItem]);
          setCurrentUrl({ name: '', url: '' });
      
    });
     
    }
  };

  const handlePreview = (doc: Document) => {
    setPreviewDocument(doc);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleUploadAll = async () => {
    setUploadProgress(0);
    const totalDocs = documents.length;
    let uploadedCount = 0;

    for (const doc of documents) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate upload delay
      uploadedCount++;
      setUploadProgress(Math.round((uploadedCount / totalDocs) * 100));
    }

    setDocuments(documents.map(doc => ({ ...doc, uploaded: true })));
    setUploadProgress(0);
  };



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(documents.length);
    if (documents.length === 0) return;
    
    try {
      await dispatch(uploadDocumentsAction(documents)).unwrap();
      setDocuments(documents.map(doc => ({ ...doc, uploaded: true })));
      // Success - you can now use application_id and documents in your UI
    } catch (err) {
      // Error is already handled by the reducer
    }
  };
 
  const handleReset = () => {
    dispatch(resetUploadState());
    setDocuments([]);
  };

  const handleComplete = () => {
    // Prepare final data
    const applicationData = {
      documents: documents,
      urls: urlItems,
      // ... any other data you need
    };

    console.log('Submitting:', applicationData);
    onComplete();
  };



  return (
    <Box>
      {/* navigationTitle */}
      {navigationTitle()}

      {/* Stepper */}
      <CommonStepper activeStep={0} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormPaper elevation={2} sx={{ backgroundColor: '#FCFCFCFF', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upload New Document
            </Typography>

            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Document Name"
                  value={currentDocument.name}
                  onChange={(e) => setCurrentDocument({ ...currentDocument, name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={{ mt: 2 }} >
                <FormControl fullWidth>
                  <InputLabel>Document Category</InputLabel>
                  <Select
                    value={currentDocument.category}
                    label="Document Category"
                    onChange={(e) => setCurrentDocument({ ...currentDocument, category: e.target.value as string })}
                  >
                    {documentCategories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    value={currentDocument.type}
                    label="Document Type"
                    onChange={(e) => setCurrentDocument({ ...currentDocument, type: e.target.value as "PDF" | "Excel" | "Word" })}
                  >
                    {documentTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mr: 2 }}
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </Button>
                {currentDocument.file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {currentDocument.file.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSubmitDocument}
                  disabled={!currentDocument.name || !currentDocument.category || !currentDocument.file}
                >
                  Add Document
                </Button>
              </Grid>
            </Grid>
          </FormPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormPaper elevation={2} sx={{ backgroundColor: '#FCFCFCFF', p: 2 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6">Documents</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={documents.length === 0 || documents.every(doc => doc.uploaded)}
                startIcon={<CloudUploadIcon />}
                sx={{ ml: 2 }}
              >
                Upload All
              </Button>
            </Box>

            {loadingUploadDoc && (
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Uploading...
                </Typography>
              </Box>
            )}

          {(uploadDocStatus==='error') && (
              <Box sx={{ width: '100%', mb: 2 }}>
              
                <Typography variant="caption" sx={{ mt: 1,color: red }}>
                Failed to upload documents
                </Typography>
              </Box>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No documents added yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handlePreview(doc)}

                            color="primary"
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>

                        </TableCell>
                        <TableCell>
                          {doc.uploaded ? (
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Uploaded"
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              label="Pending"
                              color="default"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          
            {uploadDocStatus==="success" && urlItems.length > 0 && documents.every(doc => doc.uploaded) && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleComplete}
                >
                  Next Step
                </Button>
              </Box>
            )}
          </FormPaper>
        </Grid>
      </Grid>

      {/* PDF Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {previewDocument?.name}
          <Button
            startIcon={<DownloadIcon />}
            variant="outlined"
            component="a"
            href={previewDocument ? URL.createObjectURL(previewDocument.file) : '#'}
            download={previewDocument?.name}
            size="small"
          >
            Download
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          {previewDocument && (
            previewDocument.type === 'PDF' ? (
              <iframe
                src={URL.createObjectURL(previewDocument.file)}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={`Preview of ${previewDocument.name}`}
              />
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                p: 4
              }}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Preview not available
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Please download the {previewDocument.type} file to view it.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  component="a"
                  href={URL.createObjectURL(previewDocument.file)}
                  download={previewDocument.name}
                >
                  Download File
                </Button>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} md={6}>
        <FormPaper elevation={2} sx={{ backgroundColor: '#FCFCFCFF', mt: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add Reference URLs
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL Name"
                name="name"
                value={currentUrl.name}
                onChange={handleUrlChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="URL"
                name="url"
                value={currentUrl.url}
                onChange={handleUrlChange}
                placeholder="https://example.com"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleAddUrl}
                disabled={!currentUrl.name || !currentUrl.url || loading || !!error || uploadDocStatus!=="success"||currentUrl.name===''||currentUrl.url===''}
                startIcon={<AddLinkIcon />}
              >
                Add URL
              </Button>
            </Grid>
          </Grid>



          {loading ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Loading URLs...
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[...Array(3)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 20,
                      backgroundColor: '#e0e0e0',
                      borderRadius: 4,
                      animation: 'shimmer 1.5s infinite',
                      '@keyframes shimmer': {
                        '0%': { backgroundPosition: '-200px 0' },
                        '100%': { backgroundPosition: '200px 0' },
                      },
                      background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
                      backgroundSize: '400px 100%',
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <>

              <Snackbar
                open={!!error}
                autoHideDuration={2000}
                message={error}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                action={
                  <Button color="inherit" size="small" onClick={() => dispatch(resetForm())}>
                    Close
                  </Button>
                }
              />

              {urlItems.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Added URLs:
                  </Typography>
                  <List dense>
                    {urlItems.map((item) => (
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setUrlItems(urlItems.filter((url) => url.id !== item.id));
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              {item.name}
                            </a>
                          }
                          secondary={item.url}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          )}


        </FormPaper>
      </Grid>

    </Box>
  );
};

export default DocumentUploadView;