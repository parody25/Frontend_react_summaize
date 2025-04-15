import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function navigationTitle() {
    
    return <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
      <Typography color="text.primary">DASHBOARD</Typography>
      <Typography color="text.primary">CREATE NEW CREDIT APPLICATION</Typography>
    </Breadcrumbs>;
  }

  export default navigationTitle;