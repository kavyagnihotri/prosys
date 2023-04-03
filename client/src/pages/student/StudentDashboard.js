import * as React from "react"
import axios from "axios"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import Button from "@mui/material/Button"
import Projects from "../../components/project/StudentProjects"
import Applications from "../../components/application/Applications"
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead"
import ListItems from "../../components/dashboard/ListItems"
import LogoutIcon from "@mui/icons-material/Logout"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useState } from "react"

const mdTheme = createTheme()

function DashboardContent() {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [open, setOpen] = React.useState(true)
    const [selectedContent, setSelectedContent] = useState("dashboard")

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    const handleListItemClick = (content) => {
        setSelectedContent(content)
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/student/dashboard")
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ bgcolor: "#0e5ec7" }}>
                    <Toolbar sx={{ pr: "24px" }}>
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
                            ProSys - Student
                        </Button>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {user.email}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                LogOut
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        <ListItems onListItemClick={handleListItemClick} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    {selectedContent === "dashboard" && (
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                        <Projects />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    )}
                    {selectedContent === "applications" && <Applications />}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default DashboardContent
