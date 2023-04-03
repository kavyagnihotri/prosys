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

import { AppBar } from "../../components/dashboard/Objects"
import { useAuthContext } from "../../hooks/useAuthContext"

const theme = createTheme()

const ProfUpdate = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const params = useParams()
    // const usr_email = user.email
    const [form, setForm] = useState({
        // email: "",
        // name: "",
        // password: "",
        // dept: "",
        // chamber: "",
        // researchInterest: "",
        // websites: "",
        // hod: false,
    });

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/prof/dashboard")
    }
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`/profs/${id}`);

        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          alert(message);
          return;
        }

        const record = await response.json();

        setForm(record);
      }
  
      fetchData();
  
      return;
    }, [params.id, navigate]);
  
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value }
      });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = user._id
        const editedProf = {
          email: form.email,
          name: form.name,
          password: form.password,
          dept: form.dept,
          chamber: form.chamber,
          researchInterest: form.researchInterest,
          websites: form.websites,
          hod: form.hod,
        };

        await fetch(`/profs/${id}`, {
          method: "PUT",
          body: JSON.stringify(editedProf),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        navigate("/prof/dashboard")
        alert("Profile Updated!")
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
                                <span>ProSys - Professor</span>
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
                            Faculty Profile Update
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        // label="Email"
                                        name="email"
                                        value={form.email}
                                        // onChange={(e) => updateForm({ email: e.target.value })}
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
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default ProfUpdate