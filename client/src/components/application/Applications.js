import * as React from "react"
import Title from "../Title"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import ApplicationDetails from "./ApplicationDetails"
import { useEffect } from "react"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Orders() {
    const { applications, dispatch2 } = useApplicationsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await fetch("/student/applications", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch2({ type: "SET_APPLICATIONS", payload: json })
            }
        }

        if (user) {
            fetchApplications()
        }
    }, [dispatch2, user])

    const states = [1, 3, 4, 0, 2]
    // pending = 0, accepted = 1, rejected = 2, hodApproval = 3, studentResponed = 4

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
