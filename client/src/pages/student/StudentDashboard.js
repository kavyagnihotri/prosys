import * as React from "react"
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
import ListItems from "../../components/dashboard/ListItems"
import LogoutIcon from "@mui/icons-material/Logout"
import StudentProfile from "../../components/profile/StudentProfile"
import Project from "../../components/project/MyApprovedProjectTable"
import ProfessorDetails from "../../components/profile/ProfDetails"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"
import { useEffect, useState } from "react"
import { serverURL } from "../../utils/constants"

const mdTheme = createTheme()

function DashboardContent() {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [selectedContent, setSelectedContent] = useState("dashboard")
    const [profEmail, setProfEmail] = useState(null)
    const [open, setOpen] = React.useState(true)
    const [name, setName] = useState(null)
    const [update, setUpdate] = useState(0)

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

    const handleViewProfDetails = (content) => {
        setSelectedContent("profDetails")
        setProfEmail(content)
    }

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await fetch(serverURL + `/student/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (response.ok) {
                setName(json.name)
            }
            if (json.notify) {
                setUpdate(1)
            }
        }

        if (user) {
            fetchStudent()
        }
        if (update) {
            alert("Update your profile")
        }
    })

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
                        <Typography component="h1" variant="h6" color="inherit" align="center" noWrap>
                            ProSys - Student
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            align="center"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {selectedContent !== "profDetails" && selectedContent !== "projects" && (
                                    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                        {selectedContent === "dashboard" && (
                                            <Projects onViewProfDetailsClick={handleViewProfDetails} />
                                        )}
                                        {selectedContent === "applications" && (
                                            <Applications onViewProfDetailsClick={handleViewProfDetails} />
                                        )}
                                        {selectedContent === "studentprofile" && <StudentProfile />}
                                    </Paper>
                                )}
                                {selectedContent === "profDetails" && <ProfessorDetails profEmail={profEmail} />}
                                {selectedContent === "projects" && <Project />}
                            </Grid>
                        </Grid>
                    </Container>
                    {/* {selectedContent === "applications" && <Applications />} */}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default DashboardContent
