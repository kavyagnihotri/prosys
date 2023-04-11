import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Title from "../Title"
import Projects from "./StudentProjectDetails"
import { useEffect, useState } from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function Orders({ onViewProfDetailsClick }) {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const [selectedDept, setSelectedDept] = useState("")
    const [selectedProf, setSelectedProf] = useState("")
    const [professors, setProfessors] = useState({})
    const [professorsMap, setProfessorsMap] = useState({})
    const depts = ["CS", "ECE", "ENI", "EEE", "Mech", "Civil"]

    const handleDeptChange = (event) => {
        setSelectedDept(event.target.value)
    }

    const handleProfChange = (event) => {
        setSelectedProf(event.target.value)
    }

    const handleViewProfDetailsClick = (content) => {
        onViewProfDetailsClick(content)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/student/projects", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        const fetchProfessors = async () => {
            const response = await fetch(serverURL + "/prof", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                setProfessors(json)
                const professorsMap = json.reduce(
                    (acc, professor) => ({
                        ...acc,
                        [professor.email]: professor.name,
                    }),
                    {}
                )
                setProfessorsMap(professorsMap)
            }
        }

        if (user) {
            fetchProjects()
            fetchProfessors()
        }
    }, [dispatch, user])

    // const filteredProjects = projects.filter((project) => {
    //     if (selectedDept && selectedProf) {
    //         const professor = professors[project.professorEmail]
    //         return professor.dept === selectedDept && project.professorEmail === selectedProf
    //     } else if (selectedDept) {
    //         // Filter based on department of the professor associated with the project
    //         const professorsInDept = professors.filter((prof) => prof.dept === selectedDept)
    //         return (
    //             professorsInDept.some((prof) => prof.email === project.professorEmail) &&
    //             project.department === selectedDept
    //         )
    //     } else if (selectedProf) {
    //         return project.professorEmail === selectedProf
    //     } else {
    //         return true
    //     }
    // })

    // const filteredProjects = projects.filter((project) => {
    //     // get the professor object associated with the project

    //     if (selectedDept && selectedProf) {
    //         const professor = professors[project.professorEmail]
    //         return professor.dept === selectedDept && project.professorEmail === selectedProf
    //     } else if (selectedDept) {
    //         const professorsInDept = professors.filter((professor) => professor.dept === selectedDept)
    //         console.log(professorsInDept)
    //         // return professor.dept === selectedDept
    //     } else if (selectedProf) {
    //         return project.professorEmail === selectedProf
    //     } else {
    //         return true
    //     }
    // })

    return (
        <React.Fragment>
            <Title>Projects</Title>
            <Grid container spacing={2} xs={{ mb: 5 }}>
                <Grid item xs={6} sx={{ p: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="dept-label">Department</InputLabel>
                        <Select labelId="dept-label" id="dept-select" value={selectedDept} onChange={handleDeptChange}>
                            <MenuItem value="">
                                <em>All Departments</em>
                            </MenuItem>
                            {depts.map((dept, index) => (
                                <MenuItem key={index} value={dept}>
                                    {dept}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="prof-label">Professor</InputLabel>
                        <Select labelId="prof-label" id="prof-select" value={selectedProf} onChange={handleProfChange}>
                            <MenuItem value="">
                                <em>All Professors</em>
                            </MenuItem>
                            {Object.entries(professorsMap).map(([email, name]) => (
                                <MenuItem key={email} value={email}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Prerequisite</TableCell>
                        <TableCell>Offered By</TableCell>
                        <TableCell>Number of Students</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                {projects &&
                    projects.map((project) => (
                        <TableBody>
                            {project.approved === 1 && (
                                <Projects
                                    onViewProfDetails={handleViewProfDetailsClick}
                                    key={project._id}
                                    project={project}
                                    professors={professorsMap}
                                />
                            )}
                        </TableBody>
                    ))}
            </Table>
        </React.Fragment>
    )
}
