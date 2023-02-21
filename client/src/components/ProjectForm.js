import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectForm = () => {
    const { dispatch } = useProjectsContext()
    const { student } = useAuthContext()

    const [title, setTitle] = useState('')
    const [projectID, setProjectID] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyfields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!student) {
            setError('You must be logged in')
            return 
        }

        const project = {title, projectID, description}
        const response = await fetch('/projects', {
            method: "POST", 
            body: JSON.stringify(project), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${student.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyfields)
        }

        if(response.ok) {
            setTitle('')
            setProjectID('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log("new project added", json);
            dispatch({type: 'CREATE_PROJECT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new project</h3>

            <label>Project Title</label>
            <input type='text'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyfields.includes('title') ? 'error' : ''}
            />
            
            <label>Project ID</label>
            <input type='text'
                onChange={(e) => setProjectID(e.target.value)}
                value={projectID}
                className={emptyfields.includes('projectID') ? 'error' : ''}
            />

            <label>Description</label>
            <input type='text'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyfields.includes('description') ? 'error' : ''}
            />
            <button>Add Project</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProjectForm