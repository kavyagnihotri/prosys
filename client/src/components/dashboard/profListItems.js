import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from "@mui/material/Link";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/prof/dashboard"><ListItemIcon><DashboardIcon /></ListItemIcon><ListItemText primary="Dashboard" /></ListItemButton>
    {/* <ListItemButton><ListItemIcon><LayersIcon /></ListItemIcon><ListItemText primary="Applications" /></ListItemButton> */}
    {/* <ListItemButton><ListItemIcon><BarChartIcon /></ListItemIcon><ListItemText primary="Projects" /></ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Personal
    </ListSubheader>
    <ListItemButton href="/prof/project/add"><ListItemIcon><AssignmentIcon /></ListItemIcon><ListItemText primary="Add Projects" /></ListItemButton>
    <ListItemButton href="/prof/profile/update"><ListItemIcon><AssignmentIcon /></ListItemIcon><ListItemText primary="Update Profile" /></ListItemButton>

    {/* <ListItemButton><ListItemIcon><PeopleIcon /></ListItemIcon><ListItemText primary="Profile" /></ListItemButton> */}
    {/* <ListItemButton><ListItemIcon><LogoutIcon /></ListItemIcon><ListItemText primary="Logout" /></ListItemButton> */}
  </React.Fragment>
);
