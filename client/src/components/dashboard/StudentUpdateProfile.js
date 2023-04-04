import * as React from "react"
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
import Paper from "@mui/material/Paper"
import HomeIcon from "@mui/icons-material/Home"
import { AppBar } from "./Objects"
import { useParams, useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState, useEffect } from "react"

const theme = createTheme()

export default function StudentProfile({onUpdateProfileClick}) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const params = useParams()
    const [form, setForm] = useState({})
    const [change, setChange] = useState({
        cgpa: "",
        cv_link: "",
        per_link: "",
        aoi: ""
    })

    useEffect(() => {
        const fetchData= async () => {
            const response = await fetch(`/student/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const record = await response.json();
            setForm(record);
        }

        if (user) {
            fetchData()
        }

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setChange((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = form._id
        if (change.cgpa === "") {
            change.cgpa = form.cgpa
        }
        if (change.cv_link === "") {
            change.cv_link = form.cv_link
        }
        if (change.per_link === "") {
            change.per_link = form.per_link
        }
        if (change.aoi === "") {
            change.aoi = form.aoi
        }
        const editedStudent = {
            email: form.email,
            password: form.password,
            name: form.name,
            studentID: form.studentID,
            dept: form.dept,
            cgpa: change.cgpa,
            cv_link: change.cv_link,
            per_link: change.per_link,
            aoi: change.aoi
        }
        console.log(editedStudent)

        await fetch(`/student/${id}`, {
            method: "PUT",
            body: JSON.stringify(editedStudent),
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
            },
        });

        alert("Profile Updated!")
    }

    return (
        <React.Fragment>
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
                    Student Profile Update
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                value={user.email}
                                required
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="cgpa"
                                label="CGPA"
                                name="cgpa"
                                value={change.cgpa}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="cv_link"
                                label="CV Link"
                                name="cv_link"
                                value={change.cv_link}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="per_link"
                                label="Performance Sheet Link"
                                name="per_link"
                                value={change.per_link}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="aoi"
                                label="Area of Interest"
                                name="aoi"
                                value={change.aoi}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}
