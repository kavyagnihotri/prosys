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
import ListItems from "../../components/dashboard/profListItems"
import Projects from "../../components/project/ProfProjects"
import ViewApplications from "../../components/application/ViewApplications"
import Profile from "../../components/dashboard/ProfProfile"
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useProjectsContext } from "../../hooks/useProjectsContext"

const mdTheme = createTheme()

function DashboardContent() {
    const navigate = useNavigate()
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [open, setOpen] = React.useState(true)
    const [selectedContent, setSelectedContent] = useState("dashboard")
    const [projectID, setProjectID] = useState(null)
    const [numberOfStudents, setNumberOfStudents] = useState(null)
    const [profID, setProfID] = useState(null)
    const [name, setName] = useState(null)

    const handleViewApplicationClick = (content, content1) => {
        setSelectedContent("application")
        setProjectID(content)
        setNumberOfStudents(content1)
    }

    const handleListItemClick = (content) => {
        setSelectedContent(content)
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(`/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                setName(json.name)
                dispatch({ type: "SET_PROF", payload: json })
            }
        }

        if (user) {
            fetchProf()
        }
    }, [dispatch, user])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
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
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            ProSys - Professor
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
                    <TableContainer>
                        {selectedContent === "dashboard" && (
                            <Projects onViewApplicationClick={handleViewApplicationClick} />
                        )}

                        {selectedContent === "application" && (
                            <ViewApplications
                                projectID={projectID}
                                numberOfStudents={numberOfStudents}
                                onListItemClick={handleListItemClick}
                            />
                        )}
                        {selectedContent === "profile" && <Profile />}
                    </TableContainer>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default function Dashboard() {
    return <DashboardContent />
}
