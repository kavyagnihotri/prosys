
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { TableBody } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Link from '@mui/material/Link';

import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const Project = ({ project,tab }) => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    return (
            <TableRow key={project._id}>
                <TableCell align='center'>{project.title}</TableCell>
                <TableCell align='center'>{project.projectType}</TableCell>
                <TableCell align='center'>{project.description}</TableCell>
                <TableCell align='center'>{project.prerequisite}</TableCell>
                <TableCell align='center'>{project.numberOfStudents}</TableCell>
                {tab === 1 && <TableCell align='center'><Link href="#" target="_blank">{<CheckOutlinedIcon />}</Link></TableCell>}
            </TableRow>
    )
}

export default Project