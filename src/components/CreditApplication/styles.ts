import { styled } from "@mui/material/styles";
import { Box, Table, InputBase, Paper } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[100],
}));

export const Content = styled(Box)({
  flexGrow: 1,
  padding: "24px",
  maxWidth: "1400px",
  margin: "0 auto",
});

export const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
});

export const StyledTable = styled(Table)({
  "& .MuiTableCell-root": {
    padding: "16px",
  },
});

export const StatusPill = styled(Box)<{ status: string }>(({ status, theme }) => ({
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "16px",
  fontWeight: 500,
  backgroundColor:
    status === "Completed"
      ? "#E6F7EE"
      : status === "Review"
      ? "#FFF8E6"
      : "#F0F5FF",
  color:
    status === "Completed"
      ? "#00A854"
      : status === "Review"
      ? "#FFA500"
      : "#1890FF",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export const FormPaper = styled(Paper)({
  padding: "24px",
  border: "1px solid #e0e0e0",
  marginTop: "16px",
});