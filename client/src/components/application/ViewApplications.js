import * as React from "react"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import CustomContainer from "../CustomContainer"
import Applications from "../application/ProfApplications"
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function Orders({ projectID, numberOfStudents, projectTitle, onListItemClick }) {
    const { user } = useAuthContext()
    const [scoreReleased, setProjectStatus] = useState(null)
    const [informalScoreReleased, setInformalProjectStatus] = useState(null)

    useEffect(() => {
        const fetchProjectStatus = async () => {
            const response = await fetch(serverURL + "/projects/" + projectID, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()
            console.log(json)
            if (response.ok) {
                setProjectStatus(json.scoreReleased)
                setInformalProjectStatus(json.informalScoreReleased)
            }
        }
        if (user) {
            fetchProjectStatus()
        }
    })

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <CustomContainer
                    customComponent={
                        <Applications
                            projectID={projectID}
                            numberOfStudents={numberOfStudents}
                            projectTitle={projectTitle}
                            onListItemClick={onListItemClick}
                            scoreReleased={scoreReleased}
                            applicationType={"formal"}
                        />
                    }
                />
                <CustomContainer
                    customComponent={
                        <Applications
                            projectID={projectID}
                            numberOfStudents={numberOfStudents}
                            projectTitle={projectTitle}
                            onListItemClick={onListItemClick}
                            scoreReleased={informalScoreReleased}
                            applicationType={"informal"}
                        />
                    }
                />
            </Box>
        </React.Fragment>
    )
}
