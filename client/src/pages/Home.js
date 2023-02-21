import { useEffect, useState } from 'react'
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ProjectDetails from '../components/ProjectDetails'
import ProjectForm from '../components/ProjectForm'

const Home = () => {
    const {projects, dispatch} = useProjectsContext()
    const {student} = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/projects', {
                headers: {
                    'Authorization': `Bearer ${student.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_PROJECTS', payload: json})
            }
        }

        if(student) {
            fetchProjects()
        }

    }, [])

    return (
        <div className="home">
            <div className='projects'>
                {projects && projects.map((project) => (
                    <ProjectDetails key={project._id} project={project} />
                ))}
            </div>
            <ProjectForm />
        </div>
    )
}

export default Home