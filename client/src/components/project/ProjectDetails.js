import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProjectDetails = ({ project }) => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/projects/' + project._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_PROJECT', payload: json})
        }
    }

    return (
        <div className="project-details">
            <h4>{project.title}</h4>
            <p><strong>{project.projectID}</strong></p>
            <p><strong>Description</strong></p>
            <p>{project.description}</p>
            <span className="material-symbols-outlined " onClick={handleClick}>Delete</span>
        </div>
    )
} 

export default ProjectDetails