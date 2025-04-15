import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StatusPill, Header } from "./styles";
import { useAppSelector } from "../../app/hooks";

interface DashboardViewProps {
  onCreateNew: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onCreateNew }) => {
  const applications = useAppSelector((state) => state.application.applications);

  return (
    <>
      <Header>
        <Typography variant="h5" fontWeight="600">
          ALL APPLICATIONS
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateNew}
          sx={{
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            fontWeight: "500",
          }}
        >
          CREATE NEW CREDIT APPLICATION
        </Button>
      </Header>

      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <Table>
            <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#d6d6d6" }}>Application No.</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#d6d6d6" }}>Borrower Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#d6d6d6" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#d6d6d6" }}>Data Sources</TableCell>
            </TableRow>
            </TableHead>
          <TableBody>
            {applications.map((app, index) => (
              <TableRow key={index} hover>
                <TableCell>{app.appNo}</TableCell>
                <TableCell>{app.borrower}</TableCell>
                <TableCell>
                  <StatusPill status={app.status}>{app.status}</StatusPill>
                </TableCell>
                <TableCell>{app.sources}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardView;