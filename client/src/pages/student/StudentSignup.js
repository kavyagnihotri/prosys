import * as React from "react"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import HomeIcon from "@mui/icons-material/Home"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useStudentSignup } from "../../hooks/useStudentSignup"
import { AppBar } from "../../components/dashboard/Objects"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { serverURL } from "../../utils/constants"

const theme = createTheme()

const branches = [
    {
        value: "CS",
        label: "CS",
    },
    {
        value: "ECE",
        label: "ECE",
    },
    {
        value: "ENI",
        label: "ENI",
    },
    {
        value: "EEE",
        label: "EEE",
    },
    {
        value: "Mech",
        label: "Mech",
    },
    {
        value: "Civil",
        label: "Civil",
    },
]

const StudentSignup = () => {
    const { signup, error, isLoading } = useStudentSignup()
    const [file, setFile] = useState(null)
    const [perFile, setPerFile] = useState(null)
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/")
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handlePerFileChange = (event) => {
        setPerFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get("email")
        const password = data.get("password")
        const name = data.get("name")
        const studentID = data.get("studentID")
        const dept = data.get("dept")
        const cgpa = data.get("cgpa")
        // const cv_link = data.get("cv_link")
        // const per_link = data.get("per_link")
        const aoi = data.get("aoi")
        var cv_link
        var per_link

        var formData = new FormData()
        formData.append("file", file)
        const response = await fetch(serverURL + "/file/upload", {
            method: "POST",
            body: formData,
        })
        const json = await response.json()
        if (!response.ok) {
            throw Error("Network response was not ok.")
        }
        if (response.ok) {
            cv_link = json["url"]
        }

        const formData2 = new FormData()
        formData2.append("file", perFile)
        const response2 = await fetch(serverURL + "/file/upload", {
            method: "POST",
            body: formData2,
        })
        const json2 = await response2.json()
        if (!response2.ok) {
            throw Error("Network response was not ok.")
        }
        if (response2.ok) {
            per_link = json2["url"]
        }

        await signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi, 0)
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppBar position="absolute" sx={{ bgcolor: "#0e5ec7" }}>
                        <Toolbar sx={{ pr: "10px" }}>
                            <Button
                                fullWidth
                                startIcon={<HomeIcon />}
                                onClick={handleClick}
                                component="h1"
                                variant="h1"
                                noWrap
                                color="inherit"
                                size="large"
                            >
                                <span>ProSys</span>
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid
                    item
                    sx={{ p: "30px", mt: "30px", mb: "20px" }}
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Student Sign Up
                        </Typography>
                        <Box>
                            <Grid container justifyContent="center">
                                <Grid
                                    item
                                    sx={{
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="subtitle2">Already have an account?</Typography>
                                    <Link href="/student/login" variant="body2">
                                        <center>Log In</center>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        fullWidth
                                        id="email"
                                        label="BITS Email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="studentID" label="Student ID" name="studentID" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="dept"
                                        name="dept"
                                        select
                                        defaultValue=""
                                        required
                                        label="Department"
                                        fullWidth
                                    >
                                        {branches.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="cgpa" label="CGPA" name="cgpa" />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="cv_file">Upload CV</InputLabel>
                                    <Input
                                        fullWidth
                                        id="cv_file"
                                        accept="pdf"
                                        type="file"
                                        name="file"
                                        onChange={handleFileChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="per_file">Upload Performance Sheet</InputLabel>
                                    <Input
                                        fullWidth
                                        id="per_file"
                                        accept="pdf"
                                        type="file"
                                        name="file"
                                        onChange={handlePerFileChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth id="aoi" label="Area of Interest" name="aoi" multiline />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isLoading}
                            >
                                Create Account
                            </Button>
                            {error && <div className="error">{error}</div>}
                        </Box>
                    </Box>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default StudentSignup
