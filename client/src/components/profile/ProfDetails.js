import * as React from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function ProfDetails({ profEmail }) {
    const [prof, setProf] = useState({})
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProf = async () => {
            const response = await fetch(serverURL + "/prof/" + profEmail, {})
            const json = await response.json()

            if (response.ok) {
                setProf(json)
            }
        }

        if (user) {
            fetchProf()
        }
    })

    return (
        <React.Fragment>
            <Paper sx={{ width: "57vw", p: 2, mx: "auto" }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 550 }}>
                    {prof.name}
                </Typography>
                <Grid item container direction="column" xs={12} sm={8} md={6} sx={{ p: 2 }}>
                    <Grid container>
                        <Grid item xs={6} sx={{ flexBasis: "20%", color: "#363a40" }}>
                            <Typography gutterBottom>Email: </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ flexBasis: "80%" }}>
                            <Typography gutterBottom>{profEmail}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6} sx={{ flexBasis: "20%", color: "#363a40" }}>
                            <Typography gutterBottom>Department: </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ flexBasis: "80%" }}>
                            <Typography gutterBottom>{prof.dept}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6} sx={{ flexBasis: "20%", color: "#363a40" }}>
                            <Typography gutterBottom>Chamber: </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ flexBasis: "80%" }}>
                            <Typography gutterBottom>{prof.chamber}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6} sx={{ flexBasis: "20%", color: "#363a40" }}>
                            <Typography gutterBottom>Reasearch Interest: </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ flexBasis: "80%" }}>
                            <Typography gutterBottom>{prof.researchInterest}</Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={6} sx={{ flexBasis: "20%", color: "#363a40" }}>
                            <Typography gutterBottom>Websites: </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ flexBasis: "80%" }}>
                            <Typography gutterBottom>
                                {prof.websites &&
                                    prof.websites.split("\n").map((website, index) => (
                                        <Typography key={index} component="div" sx={{ display: "block" }}>
                                            <Link href={website.trim()} target="_blank" rel="noopener">
                                                {website}
                                            </Link>
                                        </Typography>
                                    ))}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
