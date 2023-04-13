import * as React from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useState,useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"

function ApplicationContent() {

    const { user } = useAuthContext()
    // const [alignment, setAlignment] = useState("0")
    let [alignment, setAlignment] = useState()

    useEffect(() => {
        const handleAlignment = async () => {
            const response = await fetch("/globals/getglobals")
            const json = await response.json()
            
            if (json.applicationStatus) {
                setAlignment("0")
            }
    
            if (!json.applicationStatus) {
                setAlignment("1")
            }
        }
    
        if (user) {
            handleAlignment()
        }
    })

    const handleUpdate = async () => {
        console.log(alignment)
        let applicationStatus = true

        if (alignment === "0") {
            applicationStatus = false
        }

        const data = { email: user.email, applicationStatus: applicationStatus }

        const response = await fetch("/globals/updateglobals", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })

        if (response.ok) {
            alert("Acceptance Period Status Updated!")
        }
    }

    const handleToggle = async (e, newAlignment) => {
        console.log("CHANGING")
        if (newAlignment) {
            if (alignment !== newAlignment) {
                await setAlignment(newAlignment)
                handleUpdate()
            }
        }
    }

    return (
        <Box>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <ToggleButtonGroup
                            label="Applications"
                            value={alignment}
                            exclusive
                            onChange={handleToggle}
                            aria-label="project-type"
                        >
                            <ToggleButton value="1" color="error">
                                Closed
                            </ToggleButton>
                            <ToggleButton value="0" color="success">
                                Open
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default function AugsdHod() {
    return <ApplicationContent />
}
