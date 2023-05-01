import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import Button from "@mui/material/Button"
import { useAuthContext } from "../../hooks/useAuthContext"
import { ChatEngine } from "react-chat-engine"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar } from "../../components/dashboard/Objects"
import { useLogout } from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../../utils/constants"

const mdTheme = createTheme()

const ChatsPage = (props) => {
    const { user } = useAuthContext()
    const [name, setName] = useState(null)
    const { logout } = useLogout()
    const navigate = useNavigate()
    var title = ""
    if (user.role === "1") {
        title = "Professor Chat Portal"
    }
    if (user.role === "2") {
        title = "Student Chat Portal"
    }
    const toggleDrawer = () => {
        if (user.role === "1") {
            navigate("/prof/dashboard")
        }
        if (user.role === "2") {
            navigate("/student/dashboard")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
        if (user.role === "1") {
            navigate("/prof/login")
        }
        if (user.role === "2") {
            navigate("/student/login")
        }
    }

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(serverURL + `/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                setName(json.name)
            }
        }

        const fetchStudent = async () => {
            const response = await fetch(serverURL + `/student/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                setName(json.name)
            }
        }

        if (user.role === "1") {
            fetchProf()
        }
        if (user.role === "2") {
            fetchStudent()
        }
    }, [user])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
                    <Toolbar sx={{}}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            {name}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                LogOut
                            </Button>
                        </Box>
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
                        publicKey={"a3a5fbef-ceb6-4252-8b3d-57c7babb2fd3"}
                        projectID={"a3a5fbef-ceb6-4252-8b3d-57c7babb2fd3"}
                        userName={user.email}
                        userSecret={user.email}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default ChatsPage
