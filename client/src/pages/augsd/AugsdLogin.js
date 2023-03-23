import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"
import HomeIcon from "@mui/icons-material/Home"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar } from "../../components/dashboard/Objects"
import { useAugsdLogin } from "../../hooks/useAugsdLogin"
import { useNavigate } from "react-router-dom"

const theme = createTheme()

const AugsdLogin = () => {
    const { login, error, isLoading } = useAugsdLogin()
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var id = ""
        var email = ""
        var password = ""

        const data = new FormData(e.currentTarget)
        for (var p of data) {
            id = p[0]
            if (id === "password") password = p[1]
            if (id === "email") email = p[1]
        }

        await login(email, password)
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "90vh", mt: 4 }}>
                <CssBaseline />
                <Grid xs={false} sm={4} md={7}>
                    <AppBar position="absolute" sx={{ bgcolor: "#0e5ec7" }}>
                        <Toolbar sx={{ pr: "10px" }}>
                            <Button
                                fullWidth
                                startIcon={<HomeIcon />}
                                onClick={handleClick}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                            >
                                <span>ProSys</span>
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://img.freepik.com/premium-vector/volumetric-university-hat_118813-285.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container></Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default AugsdLogin
