import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

const Project = ({ onViewApplication, project, tab }) => {
    const { user } = useAuthContext()

    const onView = async (id, numberOfStudents, projectTitle) => {
        onViewApplication(id, numberOfStudents, projectTitle)
    }

    const deleteProject = async (id) => {
        try {
            const response = await fetch(serverURL + `/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message)
            }

            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error(error)
            throw new Error("An error occurred while deleting the project.")
        }
    }

    const deleteApplications = async (id) => {
        const response = await fetch(serverURL + "/prof/deleteApplications/" + id, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
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
                        onClick={(e) => onView(project._id, project.numberOfStudents, project.title)}
                    ></Button>
                </TableCell>
            )}
            <TableCell align="center">
                <Button
                    size="large"
                    startIcon={<DeleteIcon />}
                    type="submit"
                    onClick={async (e) => {
                        await deleteApplications(project._id)
                        await deleteProject(project._id)
                        window.location.reload(true)
                    }}
                ></Button>
            </TableCell>
            {tab === -1 && <TableCell align="center">{project.recommendation}</TableCell>}
        </TableRow>
    )
}

export default Project
