import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { serverURL } from "../../utils/constants"

const Project = ({ onViewProfDetails, project, professorsMap }) => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [applications, setApplications] = useState(0)
    let status = false

    useEffect(() => {
        const application = async () => {
            const response = await fetch(serverURL + "/globals/getglobals", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (json.applicationStatus) {
                setApplications(1)
            }
        }

        if (user) {
            application()
        }
    })

    const onView = async (profEmail) => {
        onViewProfDetails(profEmail)
    }

    const handleApply = async (id) => {
        navigate("/student/createApplication/" + id)
    }

    const isUserApplicant = project.applicants.includes(user.email)

    const getProfessorName = (email) => {
        return professorsMap[email] || ""
    }

    if (applications) {
        status = true
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
                ) : status ? (
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
                ) : (
                    <Button
                        fullWidth
                        variant="outline"
                        style={{ backgroundColor: "#fffaef", color: "red", border: "1px solid red" }}
                        disabled
                    >
                        Closed
                    </Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default Project
