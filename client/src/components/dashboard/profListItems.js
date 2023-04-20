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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import { serverURL } from "../../utils/constants"
import { useEffect } from "react"
import { useProfContext } from "../../hooks/useProfContext"

export default function ListItems({ onListItemClick }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { profs, dispatch } = useProfContext()
    const handleListItemClick = (content) => {
        onListItemClick(content)
    }
    const goChat = async (e) => {
        axios.post("/authenticate", { username: user.email }).catch((e) => console.log("Auth Error", e))
        navigate("/chatPage")
    }

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(serverURL + `/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: "SET_PROF", payload: json })
            }
        }

        if (user) {
            fetchProf()
        }
    })

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
            {profs && profs.hod === true && (
                <ListItemButton component={Link} to="/prof/project/approve">
                    <ListItemIcon>
                        <AssignmentTurnedInIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Approve Interdisciplinary Projects"
                        primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                    />
                </ListItemButton>
            )}
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
        </React.Fragment>
    )
}
