import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Projects from "./ProfProjectDetails"
import { useEffect } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

const tables = [-1, 0, 1]
const status = ["Rejected", "Pending", "Approved"]

export default function Orders({ ID }) {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects/" + ID, {
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
    }, [dispatch, user, ID])

    return <React.Fragment>{projects.Title}</React.Fragment>
}

// export default Orders
