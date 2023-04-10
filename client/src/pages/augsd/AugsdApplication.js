import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import CurrentHod from "../../components/CurrentHod"
import RemainingProfs from "../../components/RemainingProfs"
import LogoutIcon from "@mui/icons-material/Logout"
import HomeIcon from "@mui/icons-material/Home"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import List from "@mui/material/List"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useNavigate } from "react-router-dom"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useLogout } from "../../hooks/useLogout"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

const mdTheme = createTheme()

function ApplicationContent() {
    const { logout } = useLogout()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    var globalVar

    const { user } = useAuthContext()

    const [alignment, setType] = React.useState("1")

    const [open, setOpen] = React.useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        console.log(alignment)
        var applicationStatus = true
        if (alignment === "0") {
            applicationStatus = false
        }
        const data = { applicationStatus }

        const response = await fetch(serverURL + "/globals/updateglobals", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })

        const json = await response.json()
        if (response.ok) {
            alert("Acceptance Period Status Updated!")
        }
        alert("Acceptance Period Status Updated!")
    }

    const goHome = async (e) => {
        e.preventDefault()
        navigate("/augsd/dashboard")
    }
    const goHOD = async (e) => {
        e.preventDefault()
        navigate("/augsd/hod")
    }
    const goApplication = async (e) => {
        e.preventDefault()
        navigate("/augsd/application")
    }
    const handleToggle = (event, newAlignment) => {
        console.log("CHANGING")
        setType(newAlignment)
    }

    return (
        <Box>
            <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleToggle}
                            aria-label="project-type"
                        >
                            <ToggleButton value="1" color="success">
                                Open
                            </ToggleButton>
                            <ToggleButton value="0" color="error">
                                Closed
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                    <Grid item xs={12} justifyContent="center" alignItems="center">
                        <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} alignItems="center">
                            Update
                        </Button>
                        {error && <div className="error">{error}</div>}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default function AugsdHod() {
    return <ApplicationContent />
}
