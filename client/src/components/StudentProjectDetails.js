
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Project = ({ project }) => {
    const { dispatch } = useProjectsContext()
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
        <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.prerequisite}</TableCell>
              <TableCell>{project.professorEmail}</TableCell>
              <TableCell>{project.numberOfStudents}</TableCell>
              <TableCell onClick={handleClick}>Apply</TableCell>
        </TableRow>

        // <div className="project-details">
        //     <h4>{project.title}</h4>
        //     <p><strong>{project.projectID}</strong></p>
        //     <p><strong>Description</strong></p>
        //     <p>{project.description}</p>
        //     {/* <span className="material-symbols-outlined " onClick={handleClick}>Delete</span> */}
        // </div>
    )
} 

export default Project