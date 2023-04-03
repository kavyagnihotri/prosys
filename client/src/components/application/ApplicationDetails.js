import * as React from "react"
import { useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"

import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { Button } from "@mui/material"

export default function Orders({ status }) {
    const { applications, dispatch } = useApplicationsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await fetch(serverURL + "/student/applications", {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_APPLICATIONS", payload: json })
            }
        }

        if (user) {
            fetchApplications()
        }
    }, [dispatch, user])

    return (
        <React.Fragment>
            <Title>
                {status === 0 && "Pending"}
                {status === 1 && "Accepted"}
                {status === 2 && "Rejected"}
                {status === 3 && "Needs HoD Approval"}
            </Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Offered By</TableCell>
                        <TableCell>Statement of Purpose</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications &&
                        applications.map(
                            (application) =>
                                application.studentEmail === user.email &&
                                application.status == status && (
                                    <TableRow key={application._id}>
                                        <TableCell>{application.projectTitle}</TableCell>
                                        <TableCell>{application.profEmail}</TableCell>
                                        <TableCell>{application.sop}</TableCell>
                                        <TableCell>{application.type == 1 ? "Formal" : "Informal"}</TableCell>
                                        {application.status === 0 && (
                                            <TableCell style={{ color: "#7d6f01" }}>Pending</TableCell>
                                        )}
                                        {application.status === 1 && (
                                            <TableCell>
                                                <Button>Accept</Button>
                                                <Button>Reject</Button>
                                            </TableCell>
                                        )}
                                        {application.status === 2 && (
                                            <TableCell style={{ color: "red" }}>Rejected</TableCell>
                                        )}
                                        {application.status === 3 && (
                                            <TableCell style={{ color: "#506e00" }}>Sent for HoD approval</TableCell>
                                        )}
                                    </TableRow>
                                )
                        )}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}
