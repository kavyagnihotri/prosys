import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useApplicationsContext } from '../hooks/useApplicationsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Application = ({ application }) => {
    const { dispatch } = useApplicationsContext()
    const { user } = useAuthContext()
    
    // console.log(user.email);

    return (
        <TableRow key={application._id}>
              <TableCell>{application.projectID}</TableCell>
              {/* <TableCell>{application.title}</TableCell> */}
              <TableCell>{application.studentEmail}</TableCell>
              <TableCell>{application.profEmail}</TableCell>
              <TableCell>{application.sop}</TableCell>
              <TableCell>{application.type == 1 ? "Formal" : "Informal"}</TableCell>
              {/* 0-> undetermined; 1-> accepted, 2-> rejected, 3-> hod approval */}
              <TableCell>{application.status == 0 ? "Applied" : application.status === 1 ? "Accpeted" : application.status === 2 ? "Rejected" : "Sent for HOD Approval"}</TableCell>
        </TableRow>
    )
} 

export default Application