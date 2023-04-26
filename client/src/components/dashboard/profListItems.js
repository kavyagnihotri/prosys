import * as React from "react"
import axios from "axios"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ListSubheader from "@mui/material/ListSubheader"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import Divider from "@mui/material/Divider"
import AssignmentIcon from "@mui/icons-material/Assignment"
import Link from "@mui/material/Link"
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

export default function ListItems({ onListItemClick }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const handleListItemClick = (content) => {
        onListItemClick(content)
    }
    const goChat = async (e) => {
        axios.post("/authenticate", { username: user.email }).catch((e) => console.log("Auth Error", e))
        navigate("/chatPage")
    }

    return (
        <React.Fragment>
            <ListItemButton button onClick={() => handleListItemClick("dashboard")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            {/* <ListItemButton button onClick={() => handleListItemClick("allApplications")}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="View All Applications" />
            </ListItemButton> */}
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
                Personal
            </ListSubheader>
            <ListItemButton component={Link} to="/prof/project/add">
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Add Projects" />
            </ListItemButton>
            <ListItemButton button onClick={() => goChat()}>
                <ListItemIcon>
                    <MarkChatReadIcon />
                </ListItemIcon>
                <ListItemText primary="Chat Portal" />
            </ListItemButton>
            <ListItemButton button onClick={() => handleListItemClick("profile")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
            </ListItemButton>
            <ListItemButton button onClick={() => handleListItemClick("projects")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Projects" />
            </ListItemButton>
        </React.Fragment>
    )
}
