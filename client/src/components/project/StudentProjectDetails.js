import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

const Project = ({ project }) => {
    const navigate = useNavigate()

    const handleApply = async (id) => {
        navigate("/student/createApplication/" + id)
    }

    return (
        <TableRow key={project._id}>
            <TableCell>{project.projectID}</TableCell>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.projectType}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.prerequisite}</TableCell>
            <TableCell>{project.professorEmail}</TableCell>
            <TableCell>{project.numberOfStudents}</TableCell>
            <TableCell>
                <Button onClick={(e) => handleApply(project.projectID)}>Apply</Button>
            </TableCell>
        </TableRow>
    )
}

export default Project
