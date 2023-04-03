import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import { useState, useEffect, useRef } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

function preventDefault(event) {
    event.preventDefault()
}

export default function NewProjectTable() {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects/", {
                method: "GET",
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
            <Title>Rejected Projects</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Title</TableCell>
                        <TableCell>Project ID</TableCell>
                        <TableCell>Project Type</TableCell>
                        <TableCell>Professor Email</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Pre-requisites</TableCell>
                        <TableCell>No. of Students</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects &&
                        projects.map(
                            (project) =>
                                project.approved === -1 && (
                                    <TableRow key={project._id}>
                                        <TableCell>{project.title}</TableCell>
                                        <TableCell>{project.projectID}</TableCell>
                                        <TableCell>{project.projectType}</TableCell>
                                        <TableCell>{project.professorEmail}</TableCell>
                                        <TableCell>{project.description}</TableCell>
                                        <TableCell>{project.prerequisite}</TableCell>
                                        <TableCell>{project.numberOfStudents}</TableCell>
                                    </TableRow>
                                )
                        )}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
