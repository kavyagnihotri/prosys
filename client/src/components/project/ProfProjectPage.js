import * as React from "react"
import { Container } from "@mui/material"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import LogoutIcon from "@mui/icons-material/Logout"
import Toolbar from "@mui/material/Toolbar"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { AppBar } from "../../components/dashboard/Objects"
import { useState, useEffect, } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { useNavigate, useParams } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuItem from "@mui/material/MenuItem"
import Title from "../Title"
import Link from "@mui/material/Link"
import PersonIcon from "@mui/icons-material/Person"
import Avatar from "@mui/material/Avatar"

const theme = createTheme()

const grades = [
    {
        value: "A",
        label: "A",
    },
    {
        value: "A-",
        label: "A-",
    },
    {
        value: "B",
        label: "B",
    },
    {
        value: "B-",
        label: "B-",
    },
    {
        value: "C",
        label: "C",
    },
    {
        value: "C-",
        label: "C-",
    },
    {
        value: "D",
        label: "D",
    },
    {
        value: "D-",
        label: "D-",
    },
    {
        value: "E",
        label: "E",
    }
]

const ProfProjectPage = () => {

    const navigate = useNavigate()
    const [project, setProject] = useState({})
    const [name, setName] = useState()
    const [studentName, setStudentName] = useState()
    const [grade, setGrade] = useState([])
    const [submissionLink, setSubmissionLink] = useState([])
    const [students, setStudents] = useState([])
    const [change, setChange] = useState({
        midsemGrade: "",
        compreGrade: ""
    })
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

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setChange((prevProps) => ({
            ...prevProps,
            [name]: value,
        }))
    }

    const fetchName = async () => {
        const response = await fetch(serverURL + "/prof/" + email)
        const json = response.json()
        if (response.ok) {
            setName(json.name)
        }
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

    const fetchGrades = async (id) => {
        const response = await fetch(serverURL + `/grade/project`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ projectID: id })
        })
        const json = await response.json()
        if (response.ok) {
            setGrade(json)
        }
    }

    const fetchSubmission = async (email, id) => {
        const response = await fetch(serverURL + `/submission`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id })
        })
        const json = await response.json()
        if (response.ok) {
            setSubmissionLink(json.submissionLink)
        }
    }

    const givemidGrades = async (email, id, midsemGrade) => {
        const response = await fetch(serverURL + `/grade/student/midsem`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id, midsemGrade: midsemGrade })
        })
        const json = await response.json()
    }

    const givecompreGrades = async (email, id, compreGrade) => {
        const response = await fetch(serverURL + `/grade/student/compre`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id, compreGrade: compreGrade })
        })
        const json = await response.json()
    }

    const fetchStudentName = async (student) => {
        const response = await fetch(serverURL + `/student/${student}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const json = await response.json()
        if (response.ok) {
            setStudentName(json.name)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    if (user) {
        fetchTitles(id)
        fetchGrades(id)
        fetchName()
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
                                startIcon={<ArrowBackIosIcon/>}
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
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", column: "100%" }}>
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
                                <Typography gutterBottom>{project.acceptedStudents}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {students.map((student) => (
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", column: "100%" }}>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Typography>
                                    <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}><PersonIcon /></Avatar>
                                    <Title align="center" startIcon={<PersonIcon />} onChange={fetchStudentName(student)}>{studentName} ({student})</Title>
                                </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Student Submission(s)</TableCell>
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    <TableRow onChange={fetchSubmission(student, id)} align="center">
                                        {submissionLink.length ?
                                            (submissionLink.map((submission) => (
                                                (
                                                    <TableRow align="center">
                                                    <Link href={submission} target="_blank" rel="noopener">
                                                    {submission}
                                                        </Link>
                                                    </TableRow>
                                                )
                                            )))
                                            :
                                            (<TableCell>Not Available</TableCell>)
                                        }
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell name="midsemGrade">Midsem Grade</TableCell>
                                        <TableCell name="compreGrade">Compre Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                    id="midsemGrade"
                                                    name="midsemGrade"
                                                    select
                                                    defaultValue={grade.midsemGrade}
                                                    onChange={(event) => (
                                                        givemidGrades(student, id, event.target.value)
                                                    )}
                                            >
                                                {grades.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                    id="compreGrade"
                                                    name="compreGrade"
                                                    select
                                                    defaultValue={grade.compreGrade}
                                                    onChange={(event) => (
                                                        givecompreGrades(student, id, event.target.value)
                                                    )}
                                            >
                                                {grades.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Submit Grade
                            </Button>
                        </Box>
                        </Card>
                    ))}
                </Card>
            </Container>
        </ThemeProvider>
    )
}

export default ProfProjectPage
