import * as React from "react"
import Title from "../Title"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import ApplicationDetails from "./ApplicationDetails"

export default function Orders() {
    const states = [1, 3, 0, 2]
    // pending = 0, accepted = 1, rejected = 2, hodApproval = 3

    return (
        <React.Fragment>
            <Title>Your Applications</Title>
            {states.map((value, index) => (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                <ApplicationDetails key={index} status={value} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            ))}
        </React.Fragment>
    )
}
