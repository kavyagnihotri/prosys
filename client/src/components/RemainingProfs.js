import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Title from "./Title"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useEffect } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { serverURL } from "../utils/constants"

export default function RemainingProfs() {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/prof/", {
                method: "POST",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        if (user) {
            fetchProjects()
        }
    }, [dispatch, user])

    const [open, setOpen] = React.useState(true)
    var change = -1
    var disAl = -1

    const handleNo = () => {
        change = -1
        setOpen(false)
    }

    const handleYes = () => {
        change = 1
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    var prof1 = null
    var prof2 = null
    const Appoint = async (project) => {
        change = 0
        projects.map((p) => {
            console.log("Finding Match")
            if (p.dept === project.dept && p.hod === true) {
                console.log("Match Found")
                prof1 = p
                prof2 = project
                disAl = 1
                change = -1
            }
        })
        if (change === 0) {
            await fetch(serverURL + "/prof/appoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: project._id }),
            })
            const fetchProjects = async () => {
                const response = await fetch(serverURL + "/prof/", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: "SET_PROJECTS", payload: json })
                }
            }

            if (user) {
                change = -1
                fetchProjects()
            }
        } else if (change === 1) {
            await fetch(serverURL + "/prof/appoint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: project._id }),
            })
            await fetch(serverURL + "/prof/dismiss", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: prof1._id }),
            })
            const fetchProjects = async () => {
                const response = await fetch(serverURL + "/prof/", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: "SET_PROJECTS", payload: json })
                }
            }

            if (user) {
                change = -1
                fetchProjects()
            }
        }
    }

    return (
        <React.Fragment>
            <Title>Other Faculties</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Professor Name</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Appoint as HOD</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects &&
                        projects.map(
                            (project) =>
                                project.hod === false &&
                                change === -1 && (
                                    <TableRow key={project._id}>
                                        <TableCell>{project.name}</TableCell>
                                        <TableCell>{project.dept}</TableCell>
                                        <TableCell>
                                            <Button
                                                size="large"
                                                startIcon={<PersonAddAlt1Icon />}
                                                type="submit"
                                                onClick={(e) => Appoint(project)}
                                            >
                                                APPOINT AS HOD
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        )}
                </TableBody>
            </Table>
            {/* {disAl===1 && ( */}
            {prof1 != null && prof2 != null && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"HOD Conflict"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {prof1.name} is already HOD for {prof1.dept} department. Do you want to dismiss them and
                            appoint {prof2.name} as HOD?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNo}>No</Button>
                        <Button onClick={handleYes} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </React.Fragment>
    )
}
