
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
        <TableBody>
            <TableRow key={project._id}>
                <TableCell align="center" component="th" scope="row" style={{ width: "25%" }}>{project.title}</TableCell>
                <TableCell align="center" style={{ width: "20%" }}>{project.projectType}</TableCell>
                <TableCell align="center" style={{ width: "27%" }}>{project.description}</TableCell>
                <TableCell align="center" style={{ width: "20%" }}>{project.prerequisite}</TableCell>
                <TableCell align="center" style={{ width: "100%" }}>{project.numberOfStudents}</TableCell>
                {tab === 1 && <TableCell align="center" style={{ width: "100%" }}><Link href="#" target="_blank">{<CheckOutlinedIcon />}</Link></TableCell>}
            </TableRow>
        </TableBody>
    )
}

export default Project