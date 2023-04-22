import * as React from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import Applications from "../../components/dashboard/Toggle.js"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function ListItems({ onListItemClick }) {
    const { user } = useAuthContext()
    const handleListItemClick = (content) => {
        onListItemClick(content)
    }

    const notifyall = async (e) => {
        e.preventDefault()
        const response1 = await fetch(serverURL + `/student/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
        const json = await response1.json()
        console.log(json)
        if (response1.ok) {
            json.map((j) => {
                j.notify = 1
                update(j._id, j)
            })
        }
        alert("Notified to students for profile updation")
    }

    const update = async (id, editedStudent) => {
        await fetch(serverURL + `/student/${id}`, {
            method: "PUT",
            body: JSON.stringify(editedStudent),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
    }

    return (
        <React.Fragment>
            <ListItemButton button onClick={() => handleListItemClick("dashboard")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton button onClick={() => handleListItemClick("markHoD")}>
                <ListItemIcon>
                    <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary="Mark HoD" />
            </ListItemButton>
            <ListItemButton button onClick={notifyall}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Notify To Update" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon sx={{ pl: 4 }}>
                    <Applications />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItemButton>
        </React.Fragment>
    )
}
