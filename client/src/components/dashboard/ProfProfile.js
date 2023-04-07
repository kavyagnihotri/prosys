import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import PersonIcon from "@mui/icons-material/Person"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function Profile({ onUpdateProfileClick }) {
    const { user } = useAuthContext()
    const [form, setForm] = useState([])
    const [change, setChange] = useState({
        chamber: "",
        researchInterest: "",
        websites: "",
    })

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(serverURL + `/prof/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            setForm(json)
        }

        if (user) {
            fetchProf()
        }
    })

    // const [chamber, setChamber] = useState(form.chamber)
    // const [researchInterest, setresearchInterest] = useState(form.researchInterest)
    // const [websites, setwebsites] = useState(form.websites)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setChange((prevProps) => ({
            ...prevProps,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = form._id
        if (change.chamber === "") {
            change.chamber = form.chamber
        }
        if (change.researchInterest === "") {
            change.researchInterest = form.researchInterest
        }
        if (change.websites === "") {
            change.websites = form.websites
        }
        const editedProf = {
            email: form.email,
            name: form.name,
            password: form.password,
            dept: form.dept,
            chamber: change.chamber,
            researchInterest: change.researchInterest,
            websites: change.websites,
            hod: form.hod,
        }

        await fetch(serverURL + `/prof/${id}`, {
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
                                    <PersonIcon />
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
                                                InputLabelProps={{ shrink: true }}
                                                label="Your Email"
                                                value={form.email}
                                                required
                                                disabled
                                                multiline
                                            />
                                        </Grid>
                                        <Grid item xs={12} label="Chamber">
                                            <TextField
                                                fullWidth
                                                id="chamber"
                                                name="chamber"
                                                defaultValue={form.chamber}
                                                InputLabelProps={{ shrink: true }}
                                                label="Chamber"
                                                onChange={handleInputChange}
                                                required
                                                multiline
                                            ></TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                defaultValue={form.researchInterest}
                                                fullWidth
                                                id="researchInterest"
                                                name="researchInterest"
                                                InputLabelProps={{ shrink: true }}
                                                label="Research Interest"
                                                onChange={handleInputChange}
                                                multiline
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                label="Your Websites"
                                                id="websites"
                                                name="websites"
                                                defaultValue={form.websites}
                                                onChange={handleInputChange}
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
