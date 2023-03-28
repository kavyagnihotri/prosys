
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from "react-router-dom"

const Project = ({ project,tab }) => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const onView = async (id) => {
        navigate("/prof/project/view/" + id)
    }

    return (
            <TableRow key={project._id}>
                <TableCell align='center'>{project.title}</TableCell>
                <TableCell align='center'>{project.projectType}</TableCell>
                <TableCell align='center'>{project.description}</TableCell>
                <TableCell align='center'>{project.prerequisite}</TableCell>
                <TableCell align='center'>{project.numberOfStudents}</TableCell>
                {tab === 1 && <TableCell align='center'>
                <Button size="large" startIcon={<OpenInNewIcon />} type="submit" onClick={(e)=> onView(project._id)}></Button>
                </TableCell>}
            </TableRow>
    )
}

export default Project