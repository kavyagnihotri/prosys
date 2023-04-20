import * as React from "react"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import FormalApplications from "./FormalApplications"
import InformalApplications from "./InformalApplications"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function Orders({ projectID, numberOfStudents, projectTitle, onListItemClick }) {
    // const [project, setProject] = useState({})
    const { user } = useAuthContext()
    const [scoreReleased, setProjectStatus] = useState(null)
    const [informalScoreReleased, setInformalProjectStatus] = useState(null)

    useEffect(() => {
        const fetchProjectStatus = async () => {
            const response = await fetch(serverURL + "/projects/" + projectID, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setProjectStatus(json.scoreReleased)
                setInformalProjectStatus(json.informalScoreReleased)
            }
        }
        if (user) {
            fetchProjectStatus()
        }
    })

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                <FormalApplications
                                    projectID={projectID}
                                    numberOfStudents={numberOfStudents}
                                    projectTitle={projectTitle}
                                    onListItemClick={onListItemClick}
                                    scoreReleased={scoreReleased}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                <InformalApplications
                                    projectID={projectID}
                                    numberOfStudents={numberOfStudents}
                                    projectTitle={projectTitle}
                                    onListItemClick={onListItemClick}
                                    scoreReleased={informalScoreReleased}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}
