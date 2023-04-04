import * as React from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Logo from "../img/bitsimage.webp"
import Prof from "../img/proflogo.png"
import Student from "../img/studentlogo.jpg"

const theme = createTheme()

export default function Album() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" fontSize={45}>
                            ProSys
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" fontSize={20} paragraph>
                            Welcome to Project Approval & Registration Portal
                        </Typography>
                        <Stack
                            // sx={{ pt: 3 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        ></Stack>
                    </Container>
                </Box>
                <Container maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Grid item xs={1} sm={6} md={4}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: "0%",
                                        height: "100%",
                                    }}
                                    image={Logo}
                                    alt="Logo"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        AUGSD Sign In
                                    </Typography>
                                    <Typography>You can use this section to go to AUGSD Login Page</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button size="small" href="/augsd/dashboard">
                                        Sign-In
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={1} sm={6} md={4}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: "0%",
                                        height: "100%",
                                    }}
                                    image={Prof}
                                    alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Professor Sign In
                                    </Typography>
                                    <Typography>You can use this section to go to Professor Login Page</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button size="small" href="/prof/dashboard">
                                        Sign-In
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={1} sm={6} md={4}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        // 16:9
                                        pt: "0%",
                                        height: "100%",
                                    }}
                                    image={Student}
                                    alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Student Sign In
                                    </Typography>
                                    <Typography>You can use this section to go to Student Login Page</Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center" }}>
                                    <Button size="small" href="/student/dashboard">
                                        Sign-In
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          All rights reserved
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
        </Typography>
      </Box> */}
            {/* End footer */}
        </ThemeProvider>
    )
}
