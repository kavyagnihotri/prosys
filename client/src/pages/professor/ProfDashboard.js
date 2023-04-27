import * as React from "react"
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
import ListItems from "../../components/dashboard/profListItems"
import Projects from "../../components/project/ProfProjects"
import Project from "../../components/project/MyAcceptedStudentTable"
import ViewApplications from "../../components/application/ViewApplications"
import HoDApproval from "../../components/application/HoDApproval"
import Profile from "../../components/profile/ProfProfile"
import { TableContainer } from "@mui/material"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { serverURL } from "../../utils/constants"

const mdTheme = createTheme()

function DashboardContent() {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [open, setOpen] = React.useState(true)
    const [selectedContent, setSelectedContent] = useState("dashboard")
    const [projectID, setProjectID] = useState(null)
    const [numberOfStudents, setNumberOfStudents] = useState(null)
    const [name, setName] = useState(null)
    const [projectTitle, setProjectTitle] = useState(null)

    const handleViewApplicationClick = (content, content1, content2) => {
        setSelectedContent("application")
        setProjectID(content)
        setNumberOfStudents(content1)
        setProjectTitle(content2)
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
            const response = await fetch(serverURL + `/prof/${user.email}`, {
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
                <AppBar position="absolute" open={open} sx={{ bgcolor: "#0e5ec7" }}>
                    {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}> */}
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
                                projectTitle={projectTitle}
                                onListItemClick={handleListItemClick}
                            />
                        )}
                        {selectedContent === "profile" && <Profile />}
                        {selectedContent === "approve" && <HoDApproval />}
                        {selectedContent === "projects" && <Project />}
                    </TableContainer>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default function Dashboard() {
    return <DashboardContent />
}
