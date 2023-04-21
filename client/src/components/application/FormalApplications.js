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
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect, useState } from "react"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useStudentsContext } from "../../hooks/useStudentsContext"
import { useNavigate } from "react-router-dom"
import { useProfContext } from "../../hooks/useProfContext"
import { serverURL } from "../../utils/constants"

const branches = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
]

export default function FormalApplications({ projectID, numberOfStudents, projectTitle, scoreReleased }) {
    const navigate = useNavigate()
    const NoStudents = numberOfStudents
    const id = projectID
    let count = 0
    const { applications, dispatch2 } = useApplicationsContext()
    const { user } = useAuthContext()
    const { students, dispatch1 } = useStudentsContext()
    const { profs, dispatch } = useProfContext()
    const [open, setopen] = useState(false)

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

    const changeStatus = async () => {
        try {
            const response = await fetch(serverURL + "/projects/formal/" + projectID, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            if (json.ok) {
                console.log("Project Closed")
            }
        } catch (error) {
            console.error(error)
        }
        navigate(0)
    }

    const handleClickOpen = () => {
        setopen(true)
    }

    const handleClose = () => {
        setopen(false)
    }

    return (
        <React.Fragment>
            <Title>Formal Applicants for {projectTitle} Project</Title>
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
                                app.type === 1 &&
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
            {/* <Button color="inherit" size="large" type="submit" variant="outlined" onClick={changeStatus}>
                Approve Score
            </Button> */}

            {scoreReleased == 0 && (
                <Button
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="outlined"
                    onClick={(e) => handleClickOpen()}
                >
                    Release Score
                </Button>
            )}
            {scoreReleased == 1 && (
                <Button color="inherit" size="large" type="submit" variant="outlined" disabled>
                    Released!
                </Button>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Warning!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can only approve the score once. Are you sure you want to approve the score?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={changeStatus}>Release Score</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
