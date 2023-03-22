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
import { useNavigate } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"

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

const theme = createTheme()

const ProfSignup = () => {
    const { signup, error, isLoading } = useProfSignup()
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/")
    }

    // const [age, setAge] = React.useState("")
    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value)
    // }
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get("email")
        const password = data.get("password")
        const name = data.get("name")
        const dept = data.get("dept")
        const chamber = data.get("chamber")
        const researchInterest = data.get("researchInterest")
        const websites = data.get("websites")
        const hod = false
        await signup(email, password, name, dept, chamber, researchInterest, websites, hod)
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
                            Faculty Sign up
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
                                    <Link href="/prof/login" variant="body2">
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
                                        label="Email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        //   autoComplete="family-name"
                                    />
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
                                    <TextField
                                        fullWidth
                                        id="chamber"
                                        label="Chamber"
                                        name="chamber"
                                        //   autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="researchInterest"
                                        label="Research Interests (separate line by line)"
                                        name="researchInterest"
                                        multiline
                                        //   autoComplete="cgpa"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="websites"
                                        label="Social Profiles (separate line by line)"
                                        name="websites"
                                        multiline
                                    />
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

export default ProfSignup
