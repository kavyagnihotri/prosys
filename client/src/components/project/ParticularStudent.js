import * as React from "react"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import MenuItem from "@mui/material/MenuItem"
import Title from "../Title"
import Link from "@mui/material/Link"
import PersonIcon from "@mui/icons-material/Person"
import Avatar from "@mui/material/Avatar"
import { createTheme } from "@mui/material/styles"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { useNavigate } from "react-router-dom"

const grades = [
    {
        value: "A",
        label: "A",
    },
    {
        value: "A-",
        label: "A-",
    },
    {
        value: "B",
        label: "B",
    },
    {
        value: "B-",
        label: "B-",
    },
    {
        value: "C",
        label: "C",
    },
    {
        value: "C-",
        label: "C-",
    },
    {
        value: "D",
        label: "D",
    },
    {
        value: "D-",
        label: "D-",
    },
    {
        value: "E",
        label: "E",
    },
]

const ParticularStudent = ({ student, id }) => {
    const [studentName, setStudentName] = useState()
    const [midsem, setMidsem] = useState("")
    const [compre, setCompre] = useState("")
    const [submissionLink, setSubmissionLink] = useState([])
    const { user } = useAuthContext()
    let midsemGrade = "",
        compreGrade = ""

    const fetchGrades = async (id) => {
        const response = await fetch(serverURL + `/grade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentemail: student, projectID: id }),
        })
        const json = await response.json()
        console.log(json)
        if (response.ok) {
            setMidsem(json.midsemGrade)
            setCompre(json.compreGrade)
        }
    }

    const fetchStudentName = async (student) => {
        const response = await fetch(serverURL + `/student/${student}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const json = await response.json()
        if (response.ok) {
            setStudentName(json.name)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    const fetchSubmission = async (email, id) => {
        const response = await fetch(serverURL + `/submission`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentemail: email, projectID: id }),
        })
        const json = await response.json()
        if (response.ok) {
            setSubmissionLink(json.submissionLink)
        }
    }

    const givemidGrades = async (email, id, midsemGrade) => {
        const response = await fetch(serverURL + `/grade/student/midsem`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentemail: email, projectID: id, midsemGrade: midsemGrade }),
        })
        const json = await response.json()
    }

    const givecompreGrades = async (email, id, compreGrade) => {
        const response = await fetch(serverURL + `/grade/student/compre`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentemail: email, projectID: id, compreGrade: compreGrade }),
        })
        const json = await response.json()
        console.log(json)
    }

    if (user) {
        fetchGrades(id)
        console.log(midsem.type)
        console.log(compre.type)

        midsemGrade = midsem
        compreGrade = compre
        console.log(midsem)
        console.log(compre)
    }

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                column: "100%",
            }}
            style={{
                margin: "1rem",
            }}
        >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} style={{ margin: "1rem" }}>
                <Typography>
                    <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}>
                        <PersonIcon />
                    </Avatar>
                    <Title align="center" startIcon={<PersonIcon />} onChange={fetchStudentName(student)}>
                        {studentName} ({student})
                    </Title>
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Submission(s)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow onChange={fetchSubmission(student, id)} align="center">
                            {submissionLink.length ? (
                                submissionLink.map((submission) => (
                                    <TableRow align="center">
                                        <Link href={submission} target="_blank" rel="noopener">
                                            {submission}
                                        </Link>
                                    </TableRow>
                                ))
                            ) : (
                                <TableCell>Not Available</TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell name="midsemGrade">Midsem Grade</TableCell>
                            <TableCell name="compreGrade">Compre Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {midsemGrade === "" && (
                                <TableCell>
                                    <TextField
                                        id="midsemGrade"
                                        name="midsemGrade"
                                        select
                                        defaultValue=""
                                        onChange={(event) => givemidGrades(student, id, event.target.value)}
                                    >
                                        {grades.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                            )}
                            {midsemGrade !== "" && (
                                <TableCell>
                                    <TextField
                                        id="midsemGrade"
                                        name="midsemGrade"
                                        select
                                        defaultValue={midsemGrade}
                                        onChange={(event) => givemidGrades(student, id, event.target.value)}
                                    >
                                        {grades.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                            )}
                            {compreGrade === "" && (
                                <TableCell>
                                    <TextField
                                        id="compreGrade"
                                        name="compreGrade"
                                        select
                                        defaultValue=""
                                        onChange={(event) => givecompreGrades(student, id, event.target.value)}
                                    >
                                        {grades.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                            )}
                            {compreGrade !== "" && (
                                <TableCell>
                                    <TextField
                                        id="compreGrade"
                                        name="compreGrade"
                                        select
                                        defaultValue={compreGrade}
                                        onChange={(event) => givecompreGrades(student, id, event.target.value)}
                                    >
                                        {grades.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit Grade
                </Button>
            </Box>
        </Card>
    )
}

export default ParticularStudent
