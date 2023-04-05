import * as React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import { useProjectsContext } from "../../hooks/useProjectsContext"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { AppBar } from "../../components/dashboard/Objects"
import { useLogout } from "../../hooks/useLogout"

const theme = createTheme()

const ApplicationForm = () => {
    const navigate = useNavigate()
    const { dispatch2 } = useApplicationsContext()
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const [activeStep, setActiveStep] = React.useState(0)
    const [alignment, setType] = React.useState("1")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [projectTitle, setProjectTitle] = useState("")
    const [project_id, setProjectID] = useState("")
    const { id } = useParams()

    const handleToggle = (event, newAlignment) => {
        setType(newAlignment)
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        navigate("/student/login")
        logout()
    }

    const handleHome = (event) => {
        event.preventDefault()
        navigate("/student/dashboard")
    }

    // fetching cuz once you go back to the dashboard we need the projects and the applications
    useEffect(() => {
        const fetchProject = async () => {
            fetch(`/projects/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    // Update project title state with fetched data
                    setProjectID(data.projectID)
                    setProjectTitle(data.title)
                })
                .catch((error) => {
                    // Handle error
                })
        }

        const fetchProjects = async () => {
            const response = await fetch("/student/projects", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        const fetchApplications = async () => {
            const response = await fetch("/student/applications", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch2({ type: "SET_APPLICATIONS", payload: json })
            }
        }

        if (user) {
            fetchProjects()
            fetchApplications()
            fetchProject()
        }
    }, [dispatch, user, id, dispatch2])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const studentregex = new RegExp("[fhp][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*")

        if (!user || !studentregex.test(user.email)) {
            setError("Student must be logged in")
            return
        }

        const data = new FormData(event.currentTarget)
        const projectID = id
        const studentEmail = user.email
        const sop = data.get("sop")
        const type = parseInt(alignment)

        const application = { projectID, studentEmail, type, sop }

        const response = await fetch("/student/createApplication", {
            method: "POST",
            body: JSON.stringify(application),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        if (response.ok) {
            setError(null)

            dispatch2({ type: "CREATE_APPLICATION", payload: json })
            setIsLoading(false)
            setActiveStep(1)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Box
                    sx={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppBar position="absolute">
                        <Toolbar sx={{ pr: "24px" }}>
                            <Button
                                onClick={handleHome}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                            >
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
                                {JSON.parse(localStorage.getItem("user")).email}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleLogout}>
                                <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                    LogOut
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Application
                    </Typography>
                    {activeStep === 1 ? (
                        <React.Fragment>
                            <p></p>
                            <Typography variant="h5" gutterBottom>
                                Your Application is Submitted.
                            </Typography>
                            <Button
                                component={Link}
                                to="/student/dashboard"
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleHome}
                            >
                                Go to Home
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Details
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <ToggleButtonGroup
                                            value={alignment}
                                            exclusive
                                            onChange={handleToggle}
                                            aria-label="project-type"
                                        >
                                            <ToggleButton value="1">Formal</ToggleButton>
                                            <ToggleButton value="0">Informal</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            value={projectTitle}
                                            label="Project Title"
                                            fullWidth
                                            variant="standard"
                                            disabled="true"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="sop"
                                            name="sop"
                                            label="Statement of Purpose"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // required
                                            id="studentEmail"
                                            name="studentEmail"
                                            label="Your Email"
                                            fullWidth
                                            value={JSON.parse(localStorage.getItem("user")).email}
                                            disabled="true"
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} justifyContent="center" alignItems="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                        disabled={isLoading}
                                    >
                                        Submit
                                    </Button>
                                    {error && <div className="error">{error}</div>}
                                </Grid>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default ApplicationForm
