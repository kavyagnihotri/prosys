import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Title from "../Title"
import { useEffect } from "react"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useStudentsContext } from "../../hooks/useStudentsContext"
import { useNavigate } from "react-router-dom"
import { useProfContext } from "../../hooks/useProfContext"
import { serverURL } from "../../utils/constants"

const branches = [
    {
        value: 1,
        label: "1",
    },
    {
        value: 2,
        label: "2",
    },
    {
        value: 3,
        label: "3",
    },
    {
        value: 4,
        label: "4",
    },
    {
        value: 5,
        label: "5",
    },
    {
        value: 6,
        label: "6",
    },
    {
        value: 7,
        label: "7",
    },
    {
        value: 8,
        label: "8",
    },
    {
        value: 9,
        label: "9",
    },
    {
        value: 10,
        label: "10",
    },
]

export default function InformalApplications({ projectID, numberOfStudents, projectTitle, onListItemClick }) {
    const { applications, dispatch2 } = useApplicationsContext()
    const { user } = useAuthContext()
    const id = projectID
    const { students, dispatch1 } = useStudentsContext()
    const { profs, dispatch } = useProfContext()
    const NoStudents = numberOfStudents
    const title = projectTitle
    let count = 0
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(serverURL + "/student/applications/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch2({ type: "SET_APPLICATIONS", payload: json })
                }
            } catch (error) {
                console.error(error)
            }
        }

        const fetchStudents = async () => {
            try {
                const response = await fetch(serverURL + "/student/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch1({ type: "SET_STUDENTS", payload: json })
                }
            } catch (error) {
                console.error(error)
            }
        }

        const fetchProfs = async () => {
            try {
                const response = await fetch(serverURL + "/prof/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch({ type: "SET_PROF", payload: json })
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (user) {
            fetchApplications()
            fetchStudents()
            fetchProfs()
            console.log(profs)
        }
    }, [dispatch2, dispatch1, user])

    const addScore = async (newScore, appId) => {
        try {
            const response = await fetch(serverURL + "/student/score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ appId: appId, newScore: newScore }),
            })
            const json = await response.json()
            if (response.ok) {
                dispatch2({ type: "SET_APPLICATIONS", payload: json })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateStatus = async (appId, appStatus) => {
        console.log(appId, appStatus)
        try {
            const response = await fetch(serverURL + "/student/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ appId: appId, status: appStatus }),
            })
            const json = await response.json()
            if (response.ok) {
                dispatch2({ type: "SET_APPLICATIONS", payload: json })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const changeStatus = async () => {
        try {
            const response = await fetch(serverURL + "/student/rank", {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch2({ type: "SET_APPLICATIONS", payload: json })
                const applications = json
                applications.forEach(async (a) => {
                    if (
                        a.profEmail === user.email &&
                        a.projectID === id &&
                        a.type === 0 &&
                        a.score != -1 &&
                        count < NoStudents
                    ) {
                        students.forEach(async (s) => {
                            if (s.email === a.studentEmail) {
                                profs.forEach(async (prof) => {
                                    if (prof.email === user.email && prof.dept === s.dept) await updateStatus(a._id, 1)
                                    else if (prof.email === user.email && prof.dept !== s.dept)
                                        await updateStatus(a._id, 3)
                                })
                            }
                        })
                        count += 1
                    } else if (
                        a.profEmail === user.email &&
                        a.projectID === id &&
                        a.type === 0 &&
                        a.score != -1 &&
                        count >= NoStudents
                    ) {
                        await updateStatus(a._id, 2)
                    }
                })
                navigate(0)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <React.Fragment>
            <Title>Informal Applicants for {title} Project</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>CGPA</TableCell>
                        <TableCell>SoP</TableCell>
                        <TableCell>CV Link</TableCell>
                        <TableCell>Performace Sheet Link</TableCell>
                        <TableCell>Areas of Interest</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications &&
                        applications.map(
                            (app) =>
                                app.profEmail === user.email &&
                                app.projectID === id &&
                                app.type === 0 &&
                                students &&
                                students.map(
                                    (stud) =>
                                        stud.email === app.studentEmail && (
                                            <TableRow key={stud._id}>
                                                <TableCell>{stud.name}</TableCell>
                                                <TableCell>{stud.dept}</TableCell>
                                                <TableCell>{stud.cgpa}</TableCell>
                                                <TableCell>{app.sop}</TableCell>
                                                <TableCell>
                                                    <ListItemButton href={stud.cv_link}>
                                                        <ListItemText primary="CV" />
                                                    </ListItemButton>
                                                </TableCell>
                                                <TableCell>
                                                    <ListItemButton href={stud.per_link}>
                                                        <ListItemText primary="Performace Sheet" />
                                                    </ListItemButton>
                                                </TableCell>
                                                <TableCell>{stud.aoi}</TableCell>
                                                {app.score === -1 && (
                                                    <TableCell>
                                                        <TextField
                                                            id="score"
                                                            name="score"
                                                            select
                                                            defaultValue=""
                                                            required
                                                            onChange={(event) => addScore(event.target.value, app._id)}
                                                        >
                                                            {branches.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </TableCell>
                                                )}
                                                {app.score != -1 && (
                                                    <TableCell>
                                                        <TextField
                                                            id="score"
                                                            name="score"
                                                            select
                                                            defaultValue={app.score}
                                                            required
                                                            onChange={(event) => addScore(event.target.value, app._id)}
                                                        >
                                                            {branches.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        )
                                )
                        )}
                </TableBody>
            </Table>
            <Button color="inherit" size="large" type="submit" variant="outlined" onClick={changeStatus}>
                Approve Score
            </Button>
        </React.Fragment>
    )
}
