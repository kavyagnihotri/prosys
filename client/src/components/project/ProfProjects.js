import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Projects from "./ProfProjectDetails"
import { useEffect } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

const tables = [-1, 0, 1]
const status = ["Rejected", "Pending", "Approved"]

export default function Orders({ onViewApplicationClick }) {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    const handleViewApplicationClick = (content, content1) => {
        onViewApplicationClick(content, content1)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        if (user) {
            fetchProjects()
        }
    }, [dispatch, user])

    return (
        <React.Fragment>
            {projects &&
                tables.map((table) => (
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                                    <Title>{status[table + 1]}</Title>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Title</TableCell>
                                                <TableCell align="center">Project Type</TableCell>
                                                <TableCell align="center">Description</TableCell>
                                                <TableCell align="center">Prerequisite(s)</TableCell>
                                                <TableCell align="center">Number of Students</TableCell>
                                                {table === 1 && <TableCell align="center">View Application</TableCell>}
                                                {table === 1 && (
                                                    <TableCell align="center">
                                                        Delete Project
                                                        <em> and all applications</em>
                                                    </TableCell>
                                                )}
                                                {(table === 0 || table == -1) && (
                                                    <TableCell align="center">Delete Project</TableCell>
                                                )}
                                                {table === -1 && <TableCell align="center">Recommendations</TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        {projects.map((project) => (
                                            <TableBody>
                                                {project.professorEmail === user.email &&
                                                    table === project.approved && (
                                                        <Projects
                                                            onViewApplication={handleViewApplicationClick}
                                                            key={project._id}
                                                            project={project}
                                                            tab={table}
                                                        />
                                                    )}
                                            </TableBody>
                                        ))}
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                ))}
        </React.Fragment>
    )
}

// export default Orders
