import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import DeleteIcon from '@mui/icons-material/Delete';

const Project = ({ onViewApplication, project, tab }) => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { dispatch } = useProjectsContext()

    const onView = async (id, numberOfStudents) => {
        onViewApplication(id, numberOfStudents)
        // navigate("/prof/project/view/" + id)
    }

    const deleteProject = async (id) => {
        const response = await fetch(`/projects/${id}`, {
            method: "DELETE",
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const json = await response.json()

    }

    return (
        <TableRow key={project._id}>
            <TableCell align="center">{project.title}</TableCell>
            <TableCell align="center">{project.projectType}</TableCell>
            <TableCell align="center">{project.description}</TableCell>
            <TableCell align="center">{project.prerequisite}</TableCell>
            <TableCell align="center">{project.numberOfStudents}</TableCell>
            {tab === 1 && (
                <TableCell align="center">
                    <Button
                        size="large"
                        startIcon={<OpenInNewIcon />}
                        type="submit"
                        onClick={(e) => onView(project._id, project.numberOfStudents)}
                    ></Button>
                </TableCell>
            )}
            <TableCell align="center">
                <Button
                        size="large"
                        startIcon={<DeleteIcon />}
                        type="submit"
                    onClick={(e) => {
                        deleteProject(project._id)
                        window.location.reload(true)
                    }}
                ></Button>
            </TableCell>
            {tab === -1 && <TableCell align="center">{project.recommendation}</TableCell>}
        </TableRow>
    )
}

export default Project
