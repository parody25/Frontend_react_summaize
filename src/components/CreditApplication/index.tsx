import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  colors,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  People as UserManagementIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Description as CreditAppIcon,
} from "@mui/icons-material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./styles";
import DashboardView from "./DashboardView";
import CreateApplicationView from "./CreateApplicationView";
import { useAppSelector } from "../../app/hooks";
import {
  completeApiIntegration,
  setActiveView,
  startApiIntegration,
  startDocumentUpload,
} from "../../features/fill_application/applicationSlice";
import { logout } from '../../features/auth/authSlice'; // Updated the path to match the correct folder structure
import { useAppDispatch } from "../../app/hooks";
import DocumentUploadView from "./DocumentUploadView";
import ApiIntegrationView from "./ApiIntegrationView";
import AiAnalysisView from "./AiAnalysisView";
import TrendAnalysisView from "./TrendAnalysisView";
import DownloadApplicationView from "./DownloadApplicationView";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    view: "dashboard",
  },
  {
    text: "Credit Application Generator",
    icon: <CreditAppIcon />,
    path: "/credit-app-generator",
    view: "create",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    view: "settings",
  },
  {
    text: "User Management",
    icon: <UserManagementIcon />,
    path: "/user-management",
    view: "user-management",
  },
  {
    text: "Logout",
    icon: <LogoutIcon />,
    path: "/logout",
  },
];

const drawerWidth = 250;

const CreditApplicationGenerator: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { activeView } = useAppSelector((state) => state.application);
  const [email, setEmail] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const userEmail = useAppSelector((state) => state.auth.email);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setActiveView("dashboard")
    ) // Update Redux state and clear localStorage
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  useEffect(() => {
    console.log("Active view changed:", activeView);
    if (activeView === "ai-analysis" || activeView === "trend-analysis") {
      setDesktopOpen(false);
    }else{
      setDesktopOpen(true);
    }
  }, [activeView]);

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <IconButton
        onClick={handleDesktopDrawerToggle}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ padding: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/tcs_logo_new_black.png`}
            alt="TCS Logo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={
                checkActiveView(item)
              }
              onClick={() =>
                item.text === "Logout"
                  ? handleLogout()
                  : dispatch(
                    setActiveView(
                      item.view === "dashboard" ? "dashboard" : "create"
                    )
                  )
              }
              sx={{
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
              <ListItemIcon
                sx={{
                  color: checkActiveView(item) ? theme.palette.primary.dark
                    : colors.grey[600],
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: {
                    style: {
                      fontWeight:
                        checkActiveView(item) ? "bold"
                          : "normal",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
          boxShadow: theme.shadows[1],
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${desktopOpen ? drawerWidth : 0}px` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shortest,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
              {!desktopOpen && (<IconButton
                onClick={handleDesktopDrawerToggle}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <MenuIcon />
              </IconButton>)}
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {!desktopOpen && (<img
                  src={`${process.env.PUBLIC_URL}/assets/tcs_logo_new_black.png`}
                  alt="Logo"
                  style={{ maxWidth: "100%", height: 40 }}
                /> )}
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: 600 }}
              >
                {activeView === "dashboard"
                  ? "Dashboard"
                  : "Credit Application Generator"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <IconButton color="inherit" size="large">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Box sx={{ position: "relative" }}>
              <IconButton
              color="inherit"
              size="large"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setEmail(userEmail);
              }}
              >
              <Avatar sx={{ width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
              </IconButton>
              <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              >
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                {email}
                </Typography>
              </Box>
              </Popover>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: desktopOpen ? drawerWidth : 0 },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer

          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              boxShadow: theme.shadows[3],
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              boxShadow: theme.shadows[3],
              width: drawerWidth,
              ...(!desktopOpen && {
                overflowX: "hidden",
                width: 0,
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }),
            },
          }}
          open={desktopOpen}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {activeView === "dashboard" ? (
          <DashboardView
            onCreateNew={() => dispatch(setActiveView("create"))}
          />
        ) : activeView === "create" ? (
          <CreateApplicationView
            onCancel={() => dispatch(setActiveView("dashboard"))}
            onSubmit={(app) => dispatch(startDocumentUpload(app))}
          />
        ) : activeView === "upload" ? (
          <DocumentUploadView
            onComplete={() => dispatch(startApiIntegration())}
          />
        ) : activeView === "api-integration" ? (
          <ApiIntegrationView
            onComplete={() => {
              dispatch(completeApiIntegration())
            }}
          />
        ) : activeView === "ai-analysis" ?  (
          <AiAnalysisView
            onComplete={() => dispatch(setActiveView("trend-analysis"))}
          />
        ) : activeView === "trend-analysis" ?  (<TrendAnalysisView
            onComplete={() => dispatch(setActiveView("download"))}
         />):(<DownloadApplicationView
          onComplete={() => dispatch(setActiveView("dashboard"))}
       />)}
      </Box>
    </Box>
  );

  function checkActiveView(item: any): boolean | undefined {
    return ["create", "upload", "api-integration", "ai-analysis","trend-analysis","download"].includes(activeView)
      ? item.view === "create"
      : activeView === item.view;
  }
};

export default CreditApplicationGenerator;
