import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { serverURL } from "../../utils/constants"

const Project = ({ onViewProfDetails, project }) => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [professors, setProfessors] = useState({})

    const onView = async (profEmail) => {
        onViewProfDetails(profEmail)
    }

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
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.projectType}</TableCell>
            <TableCell>{project.description}</TableCell>
            <TableCell>{project.prerequisite}</TableCell>
            <TableCell>
                <Button
                    fullWidth
                    startIcon={<PersonIcon />}
                    sx={{
                        height: 100,
                        color: "black",
                        transition: "border-color 0.3s ease",
                        "&:hover": {
                            border: "1px solid #e4e7ed",
                        },
                    }}
                    onClick={() => onView(project.professorEmail)}
                >
                    {getProfessorName(project.professorEmail)}
                </Button>
            </TableCell>
            <TableCell>{project.numberOfStudents}</TableCell>
            <TableCell>
                {isUserApplicant ? (
                    <Button fullWidth startIcon={<CheckCircleIcon />} style={{ color: "green" }} disabled>
                        Applied
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: "#edf4fc",
                            color: "#0e5ec7",
                            border: "none",
                            transition: "border-color 0.3s ease",
                            "&:hover": {
                                border: "1px solid #106be3",
                            },
                        }}
                        onClick={() => handleApply(project._id)}
                    >
                        Apply
                    </Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default Project
