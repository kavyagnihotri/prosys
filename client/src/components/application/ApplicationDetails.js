import * as React from "react"
import { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"

import Title from "../Title"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { Button } from "@mui/material"

export default function Orders({ status }) {
    const { applications, dispatch } = useApplicationsContext()
    const { user } = useAuthContext()
    const [professors, setProfessors] = useState({})

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await fetch("/student/applications", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_APPLICATIONS", payload: json })
            }
        }

        const fetchProfessors = async () => {
            const response = await fetch("/prof", {
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
            fetchApplications()
            fetchProfessors()
        }
    }, [dispatch, user])

    const getProfessorName = (email) => {
        return professors[email] || ""
    }

    const onAccept = async (id) => {
        await fetch("/student/accept", {
            method: "POST",
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
        window.location.reload()
    }

    const onReject = async (id) => {
        await fetch("/student/reject", {
            method: "POST",
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
        window.location.reload()
    }

    return (
        <React.Fragment>
            <Title>
                {status === 0 && "Pending"}
                {status === 1 && "Approved"}
                {status === 2 && "Rejected"}
                {status === 3 && "Needs HoD Approval"}
                {status === 4 && "Your Projects"}
            </Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Offered By</TableCell>
                        <TableCell>Statement of Purpose</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>{status === 4 ? "Your Response" : "Status"}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications &&
                        applications.map(
                            (application) =>
                                application.studentEmail === user.email &&
                                application.status === status && (
                                    <TableRow key={application._id}>
                                        <TableCell>{application.projectTitle}</TableCell>
                                        <TableCell>{getProfessorName(application.profEmail)}</TableCell>
                                        <TableCell>{application.sop}</TableCell>
                                        <TableCell>{application.type === 1 ? "Formal" : "Informal"}</TableCell>
                                        {application.status === 0 && (
                                            <TableCell style={{ color: "#7d6f01" }}>Pending</TableCell>
                                        )}
                                        {application.status === 1 && (
                                            <TableCell>
                                                <Button
                                                    size="large"
                                                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                                                    type="submit"
                                                    style={{
                                                        color: "green",
                                                    }}
                                                    onClick={() => onAccept(application._id)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="large"
                                                    startIcon={<CancelOutlinedIcon />}
                                                    type="submit"
                                                    onClick={() => onReject(application._id)}
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        )}
                                        {application.status === 2 && (
                                            <TableCell style={{ color: "red" }}>Rejected</TableCell>
                                        )}
                                        {application.status === 3 && (
                                            <TableCell style={{ color: "#506e00" }}>Sent for HoD approval</TableCell>
                                        )}
                                        {application.status === 4 && application.studentStatus === 1 && (
                                            <TableCell style={{ color: "green" }}>Accepted</TableCell>
                                        )}
                                        {application.status === 4 && application.studentStatus === 0 && (
                                            <TableCell style={{ color: "red" }}>Rejected</TableCell>
                                        )}
                                    </TableRow>
                                )
                        )}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
