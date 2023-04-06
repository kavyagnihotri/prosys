import * as React from "react"
import { useEffect, useState } from "react"
import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"

import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import Projects from "./ProfProjectDetails"

const tables = [-1, 0, 1]
const status = ["Rejected", "Pending", "Approved"]

function preventDefault(event) {
    event.preventDefault()
}

export default function Orders({ onViewApplicationClick }) {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    const handleViewApplicationClick = (content, content1) => {
        onViewApplicationClick(content, content1)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("/projects", {
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
                                                <TableCell align="center">Delete Applications</TableCell>
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
