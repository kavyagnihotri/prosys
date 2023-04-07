import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Project = ({ project }) => {
    const { user } = useAuthContext()
    const [professors, setProfessors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfessors = async () => {
            const response = await fetch(serverURL + "/prof", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                const professorsMap = json.reduce(
                    (acc, professor) => ({
                        ...acc,
                        [professor.email]: professor.name,
                    }),
                    {}
                )
                setProfessors(professorsMap)
            }
        }

        if (user) {
            fetchProfessors()
        }
    })

    const handleApply = async (id) => {
        navigate("/student/createApplication/" + id)
    }

    const isUserApplicant = project.applicants.includes(user.email)

    const getProfessorName = (email) => {
        return professors[email] || ""
    }

    return (
        <TableRow key={project._id}>
            {/* <TableCell>{project.projectID}</TableCell> */}
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.projectType}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.prerequisite}</TableCell>
            <TableCell>{getProfessorName(project.professorEmail)}</TableCell>
            <TableCell>{project.numberOfStudents}</TableCell>
            <TableCell>
                {isUserApplicant ? (
                    <Button
                        fullWidth
                        variant="outline"
                        style={{ backgroundColor: "#defae0", color: "green", border: "1px solid green" }}
                        disabled
                    >
                        Applied
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="outline"
                        style={{ backgroundColor: "#deeafa", color: "#0e5ec7", border: "1px solid #0e5ec7" }}
                        onClick={(e) => handleApply(project._id)}
                    >
                        Apply
                    </Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default Project
