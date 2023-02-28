import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useApplicationContext } from '../hooks/useApplicationContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Button } from '@mui/material';

const Application = ({ application }) => {
    const { dispatch } = useApplicationContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        // apply to project
        // const response = await fetch('/projects/' + project._id, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })
        // const json = await response.json()

        // if(response.ok) {
        //     dispatch({type: 'APPLY_PROJECT', payload: json})
        // }
    }

    return (
        <TableRow key={application._id}>
              <TableCell>{application.projectID}</TableCell>
              <TableCell>{application.title}</TableCell>
              <TableCell>{application.studentEmail}</TableCell>
              <TableCell>{application.profEmail}</TableCell>
              <TableCell>{application.sop}</TableCell>
              <TableCell>{application.type}</TableCell>
              <TableCell>{application.status}</TableCell>
              {/* <TableCell><Button onClick={handleClick}>Apply</Button></TableCell> */}
        </TableRow>
    )
} 

export default Application