import * as React from "react"
import { useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import Projects from "./StudentProjectDetails"

import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function Orders() {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("/student/projects", {
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
            <Title>Projects</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Project ID</TableCell> */}
                        <TableCell>Title</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Prerequisite</TableCell>
                        <TableCell>Offered By</TableCell>
                        <TableCell>Number of Students</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                {projects &&
                    projects.map((project) => (
                        <TableBody>
                            {project.approved === 1 && <Projects key={project._id} project={project} />}
                        </TableBody>
                    ))}
            </Table>
        </React.Fragment>
    )
}
