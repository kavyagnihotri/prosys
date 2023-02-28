import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useApplicationsContext } from '../hooks/useApplicationsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Application = ({ application }) => {
    const { dispatch } = useApplicationsContext()
    const { user } = useAuthContext()

    return (
        <TableRow key={application._id}>
              <TableCell>{application.projectID}</TableCell>
              {/* <TableCell>{application.title}</TableCell> */}
              <TableCell>{application.studentEmail}</TableCell>
              <TableCell>{application.profEmail}</TableCell>
              <TableCell>{application.sop}</TableCell>
              <TableCell>{application.type == 1 ? "Formal" : "Informal"}</TableCell>
              <TableCell>{application.status}</TableCell>
        </TableRow>
    )
} 

export default Application