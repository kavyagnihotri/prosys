import * as React from "react"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import { useLogout } from "../../hooks/useLogout"
import CssBaseline from "@mui/material/CssBaseline"
import Button from "@mui/material/Button"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import CurrentHod from "../../components/CurrentHod"
import RemainingProfs from "../../components/RemainingProfs"
import LogoutIcon from "@mui/icons-material/Logout"
import HomeIcon from "@mui/icons-material/Home"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../../components/dashboard/Objects"

const mdTheme = createTheme()

function HodContent() {
    const { logout } = useLogout()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    const goHome = async (e) => {
        e.preventDefault()
        navigate("/augsd/dashboard")
    }

    const goHOD = async (e) => {
        e.preventDefault()
        navigate("/augsd/hod")
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            color="inherit"
                            size="large"
                            startIcon={<HomeIcon />}
                            type="submit"
                            variant="h6"
                            noWrap
                            onClick={goHome}
                        >
                            <Typography component="h1" variant="h6" color="inherit">
                                Back to AUGSD Dashboard
                            </Typography>
                        </Button>
                        <Button color="inherit" size="large" startIcon={<HowToRegIcon />} type="submit" onClick={goHOD}>
                            Mark HOD
                        </Button>
                        <Button
                            color="inherit"
                            size="large"
                            startIcon={<LogoutIcon />}
                            onClick={handleSubmit}
                            type="submit"
                        >
                            LogOut
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        overflow: "auto",
                        marginTop: 8,
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <CurrentHod />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <RemainingProfs />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default function AugsdHod() {
    return <HodContent />
}
