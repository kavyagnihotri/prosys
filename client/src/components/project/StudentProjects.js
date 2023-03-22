import * as React from "react"
import { useEffect } from "react"
// import Link from '@mui/material/Link';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import Projects from "./StudentProjectDetails"
import { Button } from "@mui/material"

import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

// import Projects from './StudentProjectDetails';

function preventDefault(event) {
    event.preventDefault()
}

export default function Orders() {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/student/createApplication")
    }

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

    const handleApply = async (id) => {
        if (!user) {
            return
        }

        navigate("/createApplication/" + id)
    }

    // const handleClick = async () => {
    //   if (!user) {
    //     return
    //   }
    //   // apply to project
    //   const response = await fetch('/projects/' + project._id, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${user.token}`
    //     }
    //   })
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({ type: 'APPLY_PROJECT', payload: json })
    //   }
    // }

    return (
        <React.Fragment>
            <Title>Projects</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Project ID</TableCell>
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
                {/* <TableBody>
                    {projects &&
                        projects.map(
                            (project) =>
                                project.approved === 1 && (
                                    <TableRow key={project._id}>
                                        <TableCell>{project.projectID}</TableCell>
                                        <TableCell>{project.title}</TableCell>
                                        <TableCell>{project.projectType}</TableCell>
                                        <TableCell>{project.description}</TableCell>
                                        <TableCell>{project.prerequisite}</TableCell>
                                        <TableCell>{project.professorEmail}</TableCell>
                                        <TableCell>{project.numberOfStudents}</TableCell>
                                        <TableCell>
                                            <Button onClick={(e) => handleApply(project._id)}>Apply</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                </TableBody> */}
            </Table>
        </React.Fragment>
    )
}
