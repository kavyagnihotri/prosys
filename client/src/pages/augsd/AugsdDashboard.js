import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"
import List from "@mui/material/List"
import ListItems from "../../components/dashboard/AugsdListItems"
import MarkHoD from "../../components/profile/MarkHoD"
import CustomContainer from "../../components/CustomContainer"
import ProjectTable from "../../components/project/ProjectTable"
import Chart from "../../components/dashboard/Chart"
import { useState } from "react"
import { AppBar, Drawer } from "../../components/dashboard/Objects"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useLogout } from "../../hooks/useLogout"

const mdTheme = createTheme()

const types = [0, 1, -1]

function DashboardContent() {
    const { logout } = useLogout()
    const [open, setOpen] = useState(true)
    const [selectedContent, setSelectedContent] = useState("dashboard")

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        logout()
    }

    const handleListItemClick = (content) => {
        setSelectedContent(content)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} sx={{ bgcolor: "#0e5ec7" }}>
                    <Toolbar sx={{ pr: "24px", justifyContent: "space-between" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" align="center" noWrap>
                            ProSys
                        </Typography>
                        <Button
                            color="inherit"
                            size="large"
                            startIcon={<LogoutIcon />}
                            onClick={handleSubmit}
                            type="submit"
                        >
                            LogOut
                        </Button>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>

                    <Divider />
                    <List>
                        <ListItems onListItemClick={handleListItemClick} />
                    </List>
                </Drawer>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        overflow: "auto",
                        marginTop: 8,
                    }}
                >
                    {selectedContent === "dashboard" && (
                        <Box>
                            <CustomContainer customComponent={<ProjectTable type={0} />} />
                            <CustomContainer customComponent={<ProjectTable type={1} />} />
                            <CustomContainer customComponent={<ProjectTable type={-1} />} />
                        </Box>
                    )}
                    {selectedContent === "markHoD" && <MarkHoD />}
                    {selectedContent === "analytics" && <Chart />}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default function Dashboard() {
    return <DashboardContent />
}
