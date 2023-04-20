import * as React from "react"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from "@mui/icons-material/Logout"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { useLogout } from "../../hooks/useLogout"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Title from "../Title"
import { useEffect } from "react"
import { useApplicationsContext } from "../../hooks/useApplicationsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useStudentsContext } from "../../hooks/useStudentsContext"
import { useNavigate } from "react-router-dom"
import { useProfContext } from "../../hooks/useProfContext"
import { serverURL } from "../../utils/constants"
import { useState } from "react"
import { Container } from "@mui/material"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"

const theme = createTheme()

export default function InformalApplications() {
    const { applications, dispatch2 } = useApplicationsContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { students, dispatch1 } = useStudentsContext()
    const { profs, dispatch } = useProfContext()
    const navigate = useNavigate()
    const [dept, setDept] = useState(null)
    const [info, setInfo] = useState(null)

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
        navigate("/prof/login")
    }

    const handleClick = (event) => {
        event.preventDefault()
        navigate("/prof/dashboard")
    }

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

        const fetchDeptApplications = async () => {
            try {
                console.log(user.email)
                const response = await fetch(serverURL + `/prof/approve/${user.email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    // body: JSON.stringify({ email: user.email }),
                })
                const json = await response.json()
                setInfo(json)
                // console.log(json)
                // if (response.ok) {
                //     dispatch2({ type: "SET_APPLICATIONS", payload: json })
                // }
            } catch (error) {
                console.error(error)
            }
        }

        if (user) {
            // fetchApplications()
            // fetchStudents()
            // profs &&
            //     profs.map((hod) => {
            //         if (hod.hod === true && hod.email === user.email) setDept(hod.dept)
            //     })
            // console.log(applications, students, profs, dept)
            fetchDeptApplications()
            console.log(info)
            fetchProfs()
        }
    }, [dispatch2, dispatch1, user])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="100" sx={{ mb: 4 }}>
                <Box
                    sx={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppBar position="absolute">
                        <Toolbar sx={{ pr: "24px" }}>
                            <Button
                                onClick={handleClick}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                            >
                                <ChevronLeftIcon />
                                ProSys - Professor
                            </Button>
                            {profs &&
                                profs.map(
                                    (p) =>
                                        p.email === user.email && (
                                            <Typography
                                                component="h1"
                                                variant="h6"
                                                color="inherit"
                                                align="center"
                                                noWrap
                                                sx={{ flexGrow: 1 }}
                                            >
                                                {p.name}
                                            </Typography>
                                        )
                                )}
                            <Box component="form" noValidate onSubmit={handleLogout}>
                                <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                    Log Out
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 4, md: 3 } }}>
                    <Typography component="h3" variant="h4" align="center">
                        Applications for Head of Department Approval
                    </Typography>
                    <React.Fragment>
                        {/* <Title>Applications for HoD Approval</Title> */}
                        <Table size="big">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project Title</TableCell>
                                    <TableCell>Professor Name</TableCell>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Student Department</TableCell>
                                    <TableCell>CGPA</TableCell>
                                    <TableCell>SoP</TableCell>
                                    <TableCell>CV Link</TableCell>
                                    <TableCell>Performace Sheet Link</TableCell>
                                    <TableCell>Areas of Interest</TableCell>
                                    <TableCell>HoD Decision</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {info &&
                                    info.map((i) => (
                                        <TableRow key={i.id}>
                                            <TableCell>{i.title}</TableCell>
                                            <TableCell>{i.profName}</TableCell>
                                            <TableCell>{i.studName}</TableCell>
                                            <TableCell>{i.studDept}</TableCell>
                                            <TableCell>{i.cgpa}</TableCell>
                                            <TableCell>{i.sop}</TableCell>
                                            <TableCell>
                                                <ListItemButton href={i.cv_link}>
                                                    <ListItemText primary="CV" />
                                                </ListItemButton>
                                            </TableCell>
                                            <TableCell>
                                                <ListItemButton href={i.per_link}>
                                                    <ListItemText primary="Performace Sheet" />
                                                </ListItemButton>
                                            </TableCell>
                                            <TableCell>{i.aoi}</TableCell>
                                            <TableCell>
                                                <Button
                                                    size="large"
                                                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                                                    type="submit"
                                                    // onClick={(e) => onAccept(project._id)}
                                                >
                                                    ACCEPT
                                                </Button>
                                                <Button
                                                    size="large"
                                                    startIcon={<CancelOutlinedIcon />}
                                                    type="submit"
                                                    // onClick={(e) => handleClickOpen(project._id)}
                                                >
                                                    REJECT
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
