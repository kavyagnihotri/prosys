import * as React from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { useNavigate } from "react-router-dom"

export default function NewProjectTable() {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [projects, setProjects] = useState([])

    const handleApply = async (id) => {
        navigate("/student/project/" + id)
    }

    useEffect(() => {
        const fetchTitles = async () => {
            const response = await fetch(serverURL + `/projects`, {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            let p = []
            json.forEach((j) => {
                let students = j.acceptedStudents
                students.forEach((student) => {
                    if (student === user.email) {
                        p.push(j)
                    }
                })
            })
            setProjects(p)
        }

        if (user) {
            fetchTitles()
        }
    }, [user, projects])

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={4}>
                        {!projects.length ? (
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            No Projects Taken in this Semester
                                        </Typography>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        ) : 
                            projects.map((project) => (
                                <Grid item xs={1} sm={6} md={4}>
                                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <Button onClick={() => handleApply(project._id)}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {project.title}
                                                </Typography>
                                                <Typography>{project.description}</Typography>
                                            </CardContent>
                                        </Button>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}
