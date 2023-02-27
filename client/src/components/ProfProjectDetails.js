
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
              <TableCell align="center" component="th" scope="row" style={{ width: "25%" }}>{project.title}</TableCell>
              <TableCell align="center" style={{ width: "20%" }}>{project.projectType}</TableCell>
              <TableCell align="center" style={{ width: "27%" }}>{project.description}</TableCell>
              <TableCell align="center" style={{ width: "20%" }}>{project.prerequisite}</TableCell>
              {/* <TableCell align="center" style={{ width: "100%" }}>{project.professorEmail}</TableCell> */}
              <TableCell align="center" style={{ width: "100%" }}>{project.numberOfStudents}</TableCell>
              {/* <TableCell align="right">{project.approved}</TableCell> */}
              {/* <TableCell onClick={handleClick}>Apply</TableCell> */}
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