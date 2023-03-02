import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogout } from '../hooks/useLogout'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NewProjectTable from '../components/NewProjectTable';
import ApprovedProjectTable from '../components/ApprovedProjectTable';
import RejectedProjectTable from '../components/RejectedProjectTable'
import LogoutIcon from '@mui/icons-material/Logout';
import { borderRight, maxWidth } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom'
import AugsdLogin from './AugsdLogin';


const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    logout()
  }

  const goHome = async(e) => {
    e.preventDefault()
    navigate("/augsd/dashboard");
  }

  const goHOD = async(e) => {
    e.preventDefault()
    navigate("/augsd/hod");
  }
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" >
          <Toolbar
            sx={{
              justifyContent:"space-between"
            }}
          >
              <Button color="inherit" size="large" startIcon={<HomeIcon />} type="submit"
              variant="h6"
              noWrap
              onClick={goHome}>
                <Typography
              component="h1"
              variant="h6"
              color="inherit"
            >
              AUGSD Dashboard
            </Typography>
              </Button>
              <Button color="inherit" size="large" startIcon={<HowToRegIcon />} type="submit"onClick={goHOD} >Mark HOD</Button>
              <Button color="inherit" size="large" startIcon={<LogoutIcon />} onClick={handleSubmit} type="submit" >LogOut</Button>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
            marginTop: 8,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <NewProjectTable /> 
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <ApprovedProjectTable /> 
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RejectedProjectTable /> 
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}