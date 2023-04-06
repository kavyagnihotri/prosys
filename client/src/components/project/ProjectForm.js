import * as React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import LogoutIcon from "@mui/icons-material/Logout"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { AppBar } from "../../components/dashboard/Objects"
import { useLogout } from "../../hooks/useLogout"

const theme = createTheme()

const ProjectForm = () => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = React.useState(0)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const [emptyfields, setEmptyFields] = useState([])
    const [name, setName] = useState("")

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
        navigate("/")
    }

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/prof/dashboard")
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const response1 = await fetch(`/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json1 = await response1.json()

            if (response1.ok) {
                setName(json1.name)
                dispatch({ type: "SET_PROF", payload: json1 })
            }

            const response = await fetch("/student/projects", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        const fetchProf = async () => {
            const response = await fetch(`/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            setName(json.name)
        }

        if (user) {
            fetchProf()
            fetchProjects()
        }
    }, [dispatch, user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const profregex = new RegExp("[a-zA-Z0-9]+.*")

        if (!user || !profregex.test(user.email)) {
            setError("Professor must be logged in")
            return
        }

        const data = new FormData(e.currentTarget)
        const title = data.get("title")
        const projectID = data.get("projectID")
        const description = data.get("description")
        const projectType = data.get("type")
        const prerequisite = data.get("prerequisite")
        const numberOfStudents = data.get("numberOfStudents")
        const professorEmail = user.email
        console.log(professorEmail)
        const approved = 0

        const project = {
            title,
            projectID,
            description,
            prerequisite,
            projectType,
            professorEmail,
            numberOfStudents,
            approved,
        }

        const response = await fetch("/projects", {
            method: "POST",
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyfields)
            setIsLoading(false)
        }

        if (response.ok) {
            setError(null)
            setEmptyFields([])

            dispatch({ type: "CREATE_PROJECT", payload: json })
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
                                onClick={handleClick}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                            >
                                <ChevronLeftIcon/>
                                ProSys - Professor
                            </Button>
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
                            <Box component="form" noValidate onSubmit={handleLogout}>
                                <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                    Log Out
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Project Proposal
                    </Typography>
                    {activeStep === 1 ? (
                        <React.Fragment>
                            <p></p>
                            <Typography variant="h5" gutterBottom>
                                Your Project Proposal is Submitted.
                            </Typography>
                            <Button
                                component={Link}
                                to="/prof/dashboard"
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                                onClick={handleClick}
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
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="title"
                                            name="title"
                                            label="Project Title"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("title") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="projectID"
                                            name="projectID"
                                            label="Project ID"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("projectID") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="description"
                                            name="description"
                                            label="Description"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("description") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="prerequisite"
                                            name="prerequisite"
                                            label="Prerequisite(s)"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("prerequisite") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="type"
                                            name="type"
                                            label="Project Type"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("type") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="numberOfStudents"
                                            name="numberOfStudents"
                                            label="Number of Formal Students"
                                            fullWidth
                                            variant="standard"
                                            className={emptyfields.includes("numberOfStudents") ? "error" : ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="profEmail"
                                            name="profEmail"
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
                                        Submit Proposal
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

export default ProjectForm
