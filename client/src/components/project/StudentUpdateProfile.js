import { useProfSignup } from "../../hooks/useProfSignup"
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
import { AppBar } from "../../components/dashboard/Objects"
import { useParams, useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState, useEffect } from "react"

const theme = createTheme()

const StudentUpdate = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const params = useParams()
    const [form, setForm] = useState({
      cgpa: "",
      cv_link: "",
      per_link: "",
      aoi: "",
    });

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/student/dashboard")
    }

    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`/students/${params.id.toString()}`);

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
        const editedStudent = {
          cgpa: form.cgpa,
          cv_link: form.cv_link,
          per_link: form.per_link,
          aoi: form.aoi,
        };
   
        await fetch(`/students/update`, {
          method: "POST",
          body: JSON.stringify(editedStudent),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        navigate("/student/dashboard")
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
                                <span>ProSys - Student</span>
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
                            Student Profile Update
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="cgpa"
                                        label="CGPA"
                                        name="cgpa"
                                        value={form.cgpa}
                                        onChange={(e) => updateForm({ cgpa: e.target.value })}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="cv_link"
                                        label="CV Link"
                                        name="cv_link"
                                        value={form.cv_link}
                                        onChange={(e) => updateForm({ cv_link: e.target.value })}
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
                                        value={form.per_link}
                                        onChange={(e) => updateForm({ per_link: e.target.value })}
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
                                        value={form.aoi}
                                        onChange={(e) => updateForm({ aoi: e.target.value })}
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

export default StudentUpdate