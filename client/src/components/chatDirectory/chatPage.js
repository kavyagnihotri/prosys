import { PrettyChatWindow } from "react-chat-engine-pretty"
import { useAuthContext } from "../../hooks/useAuthContext"
import { ChatEngine } from "react-chat-engine"
import * as React from "react"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import Button from "@mui/material/Button"
import { TableContainer } from "@mui/material"
import { mainListItems, secondaryListItems } from "../../components/dashboard/profListItems"
import Projects from "../../components/project/ProfProjects"
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useLogout } from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useProjectsContext } from "../../hooks/useProjectsContext"
const mdTheme = createTheme()

const ChatsPage = (props) => {
    const { user } = useAuthContext()
    console.log(user.email)
    const { logout } = useLogout()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }
    const goChat = async (e) => {
        axios.post("/authenticate", { username: user.email }).catch((e) => console.log("Auth Error", e))
        e.preventDefault()
        navigate("/chatPage")
    }
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
                    <Toolbar sx={{}}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            ProSys - Chat Portal
                        </Typography>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            {user.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "95vh",
                    }}
                >
                    <Toolbar />
                    <ChatEngine
                        height="calc(95vh - 66px)"
                        publicKey={"d4c39480-3612-4e4c-8dd0-fef825748c8b"}
                        userName={user.email}
                        userSecret={user.email}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default ChatsPage
