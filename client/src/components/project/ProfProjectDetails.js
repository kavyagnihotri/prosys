
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';

import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const Project = ({ project }) => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    return (
        <TableBody>
            <TableRow key={project._id}>
                <TableCell align="center" component="th" scope="row" style={{ width: "25%" }}>{project.title}</TableCell>
                <TableCell align="center" style={{ width: "20%" }}>{project.projectType}</TableCell>
                <TableCell align="center" style={{ width: "27%" }}>{project.description}</TableCell>
                <TableCell align="center" style={{ width: "20%" }}>{project.prerequisite}</TableCell>
                <TableCell align="center" style={{ width: "100%" }}>{project.numberOfStudents}</TableCell>
            </TableRow>
        </TableBody>
    )
}

export default Project