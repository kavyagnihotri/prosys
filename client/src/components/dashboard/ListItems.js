import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import LayersIcon from "@mui/icons-material/Layers"
import AssignmentIcon from "@mui/icons-material/Assignment"
import Link from "@mui/material/Link"

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to="/student/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* <ListItemButton><ListItemIcon><LayersIcon /></ListItemIcon><ListItemText primary="Projects" /></ListItemButton> */}
    </React.Fragment>
)

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Personal
        </ListSubheader>
        <ListItemButton component={Link} to="/student/myApplications">
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="My Applications" />
        </ListItemButton>
        <ListItemButton component={Link} to="/student/profile">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
        </ListItemButton>
    </React.Fragment>
)
