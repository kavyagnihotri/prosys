import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

const Project = ({ onViewApplication, project, tab }) => {
    const navigate = useNavigate()

    const onView = async (id, numberOfStudents) => {
        onViewApplication(id, numberOfStudents)
        // navigate("/prof/project/view/" + id)
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
            {tab === -1 && <TableCell align="center">{project.recommendation}</TableCell>}
        </TableRow>
    )
}

export default Project
