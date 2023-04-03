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
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useProjectsContext } from "../../hooks/useProjectsContext"

const theme = createTheme()

export default function Profile({ onUpdateProfileClick }) {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { dispatch } = useProjectsContext()
    // const params = useParams()
    const [form, setForm] = useState({})

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(`/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            setForm(json)
        }

        if (user) {
            fetchProf()
        }
    })

    // useEffect(() => {
    // async function fetchData() {
    //     const id = params.id.toString()
    //     const response = await fetch(`/profs/${id}`)

    //     if (!response.ok) {
    //         const message = `An error has occurred: ${response.statusText}`
    //         alert(message)
    //         return
    //     }

    //     const record = await response.json()

    //     setForm(record)
    // }

    // fetchData()

    //     return
    // }, [params.id, navigate])

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = form._id
        const editedProf = {
            email: form.email,
            name: form.name,
            password: form.password,
            dept: form.dept,
            chamber: form.chamber,
            researchInterest: form.researchInterest,
            websites: form.websites,
            hod: form.hod,
        }

        await fetch(`/prof/${id}`, {
            method: "PUT",
            body: JSON.stringify(editedProf),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Your Profile
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
                                                id="chamber"
                                                label="Chamber"
                                                name="chamber"
                                                value={form.chamber}
                                                onChange={(e) => updateForm({ chamber: e.target.value })}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="researchInterest"
                                                label="Research Interests (separate line by line)"
                                                name="researchInterest"
                                                value={form.researchInterest}
                                                onChange={(e) => updateForm({ researchInterest: e.target.value })}
                                                multiline
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="websites"
                                                label="Social Profiles (separate line by line)"
                                                name="websites"
                                                value={form.websites}
                                                onChange={(e) => updateForm({ websites: e.target.value })}
                                                multiline
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        Update Profile
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}