import * as React from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import LogoutIcon from "@mui/icons-material/Logout"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar } from "../../components/dashboard/Objects"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { useNavigate, useParams } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import ParticularStudent from "./ParticularStudent"

const theme = createTheme()

const ProfProjectPage = () => {
    const navigate = useNavigate()
    const [project, setProject] = useState({})
    const [name, setName] = useState()
    const [studentName, setStudentName] = useState([])
    const [students, setStudents] = useState([])
    const { logout } = useLogout()
    const { id } = useParams()
    const { user } = useAuthContext()
    let email = user.email

    const handleLogout = async (e) => {
        e.preventDefault()
        navigate("/prof/login")
        logout()
    }

    const handleHome = (event) => {
        event.preventDefault()
        navigate("/prof/dashboard")
    }

    const fetchName = async () => {
        const response = await fetch(serverURL + "/prof/" + email)
        const json = response.json()
        if (response.ok) {
            setName(json.name)
        }
    }

    const fetchStudentName = async () => {
        const response = await fetch(serverURL + `/student`, {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const json = await response.json()
        let s = []
        if (response.ok) {
            json.map((j) => (
                students.forEach((student) => {
                    if (j.email === student) {
                        s.push(j.name)
                    }
                })
            ))
        }
        setStudentName(s)
    }
    
    const fetchTitles = async (id) => {
        const response = await fetch(serverURL + `/projects/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const json = await response.json()
        if (response.ok) {
            if (json.approved === 1) {
                setProject(json)
                setStudents(json.acceptedStudents)
            }
        }
    }

    if (user) {
        fetchTitles(id)
        fetchName()
        fetchStudentName()
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
                    <AppBar position="absolute" sx={{ bgcolor: "#0e5ec7" }}>
                        <Toolbar sx={{ pr: "24px" }}>
                            <Button
                                onClick={handleHome}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                                startIcon={<ArrowBackIosIcon />}
                            >
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
                                {email}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleLogout}>
                                <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                    LogOut
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Card
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        column: "100%"
                    }}
                    style={{
                        padding: "1rem"
                    }}
                >
                    <Grid item container direction="row">
                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Title </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.title}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Professor Email </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.professorEmail}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Description </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.description}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Prerequisite </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.prerequisite}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Project Type </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.projectType}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Accepted Students </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                {studentName.map((student) => (
                                    <Typography gutterBottom>{student}</Typography>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    {students.map((student) => (
                        <ParticularStudent student={student} id={id} />
                    ))}
                </Card>
            </Container>
        </ThemeProvider>
    )
}

export default ProfProjectPage
