import * as React from "react"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import LogoutIcon from "@mui/icons-material/Logout"

import { AppBar } from "./Objects"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const [open, setOpen] = React.useState(true)
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate()

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/student/dashboard")
    }
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: "36px",
                        ...(open && { display: "none" }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Button onClick={handleClick} component="h1" variant="h6" noWrap color="inherit" size="large">
                    ProSys
                </Button>
                <Typography component="h1" variant="h6" color="inherit" align="center" noWrap sx={{ flexGrow: 1 }}>
                    {user.email}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit}>
                    <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                        LogOut
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
