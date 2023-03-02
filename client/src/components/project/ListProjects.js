import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from "react";
import { useProjectsContext } from "../../hooks/useProjectsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const tables = [0, 1, 2]

const ListProjects = () => {
    const { projects, dispatch } = useProjectsContext();
    const { user } = useAuthContext();

    // const [projects, setProjects] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {

            const response = await fetch('/projects', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            const json = await response.json()
          
            if (response.ok) {
                console.log(json)
                json.forEach((j) => {
                    if (user.email === j.professorEmail) {
                        // setProjects(j)
                        dispatch({type: 'SET_PROJECTS', payload: j})
                    }
                })
            } else {
                setError("There is some issue")
            }
        }
        if (user) {
            fetchProjects()
        }
    }, [dispatch, user])

    return (
    <div>
        {tables.forEach((table) => {
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Prerequisite</TableCell>
                        <TableCell align="right">Project Type</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {!error && projects.map((project) => (
                        <TableRow
                        key={project.title}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {/* <ProjectDetails key={project._id} project={project} /> */}
                        <TableCell component="th" scope="row">{project.title}</TableCell>
                        {/* <TableCell align="right">{row.projectID}</TableCell> */}
                        <TableCell align="right">{project.description}</TableCell>
                        <TableCell align="right">{project.prerequisite}</TableCell>
                        <TableCell align="right">{project.projectType}</TableCell>
                        {/* <TableCell align="right">{project.professorEmail}</TableCell> */}
                        {/* <TableCell align="right">{project.numberOfStudents}</TableCell> */}
                        {/* <TableCell align="right">{project.approved}</TableCell> */}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {error && <div className="error">{error}</div>}
            </TableContainer>
        })}
        {/* <ProjectForm /> */}
    </div>
  );
}

export default ListProjects;