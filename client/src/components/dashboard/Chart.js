import * as React from "react"
import Title from "../Title"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Label } from "recharts"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState, useEffect } from "react"
import { serverURL } from "../../utils/constants"

function createData(department, amount, color) {
    return { department, amount, color }
}

export default function Chart() {
    const { user } = useAuthContext()
    const [projects, setProjects] = useState([])
    const [professors, setProfs] = useState([])

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6666", "#9966CC", "#FFCC66", "#FFB266", "#808080"]

    const fetchData = async () => {
        const projectResponse = await fetch(serverURL + "/projects/", {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const profResponse = await fetch(serverURL + "/prof/", {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })

        const projectJson = await projectResponse.json()
        const profJson = await profResponse.json()

        if (projectResponse.ok && profResponse.ok) {
            setProjects(projectJson)
            setProfs(profJson)
        }
    }

    useEffect(() => {
        if (user) {
            fetchData()
        }
    }, [user])

    // Generate data based on department
    const groupedProjects = professors.reduce((acc, professor) => {
        const projectsInDept = projects.filter((project) => project.professorEmail === professor.email)
        const dept = professor.dept

        const deptIndex = acc.findIndex((deptData) => deptData.department === dept)

        if (deptIndex !== -1) {
            acc[deptIndex].amount += projectsInDept.length
        } else {
            acc.push(createData(dept, projectsInDept.length, COLORS[acc.length % COLORS.length]))
        }

        return acc
    }, [])

    return (
        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 550 }}>
                            <Title>Projects Offered</Title>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={groupedProjects}
                                        dataKey="amount"
                                        nameKey="department"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={200}
                                        fill="#8884d8"
                                        label={(entry) => entry.department}
                                    >
                                        {groupedProjects.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="bottom"
                                        formatter={(value, entry) =>
                                            `${entry.payload.department}: ${entry.payload.amount}`
                                        }
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}
