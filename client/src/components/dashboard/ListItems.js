import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import LayersIcon from "@mui/icons-material/Layers"
import LogoutIcon from "@mui/icons-material/Logout"
import Divider from "@mui/material/Divider"
import AssignmentIcon from "@mui/icons-material/Assignment"
import Link from "@mui/material/Link"
import { useLogout } from "../../hooks/useLogout"

export default function ListItems({ onListItemClick }) {
    const { logout } = useLogout()

    const handleListItemClick = (content) => {
        onListItemClick(content)
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <React.Fragment>
            <ListItemButton button onClick={() => handleListItemClick("dashboard")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            {/* <ListItemButton><ListItemIcon><LayersIcon /></ListItemIcon><ListItemText primary="Projects" /></ListItemButton> */}
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
                Personal
            </ListSubheader>
            <ListItemButton button onClick={() => handleListItemClick("applications")}>
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
}
