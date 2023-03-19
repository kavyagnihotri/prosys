import * as React from 'react';
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import Projects from './ProfProjectDetails';

const tables = [-1, 0, 1]
const status = ['Rejected', 'Pending', 'Approved']


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/projects', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_PROJECTS', payload: json })
      }
    }

    if (user) {
      fetchProjects()
    }

  }, [dispatch, user])


  return (
    <React.Fragment>
      {projects && tables.map((table) => (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Title sx={{ align: "center", width: "10%", height: "50%" }}>{status[table + 1]}</Title>
                  <TableHead>
                    <TableRow sx={{ height: "50" }}>
                      <TableCell align="center" style={{ width: "25%" }}>Title</TableCell>
                      <TableCell align="center" style={{ width: "25%" }}>Project Type</TableCell>
                      <TableCell align="center" style={{ width: "25%" }}>Description</TableCell>
                      <TableCell align="center" style={{ width: "20%" }}>Prerequisite(s)</TableCell>
                      <TableCell align="center" style={{ width: "50%" }}>Number of Students</TableCell>
                    </TableRow>
                  </TableHead>
                      {projects.map((project) => (
                        <Table aria-label="simple table">
                          {project.professorEmail === user.email && table === project.approved && <Projects key={project._id} project={project} />}
                        </Table>
                      ))}
                </Paper>
              </Grid>
            </Grid>
          </Container>
      ))}
    </React.Fragment>
  );
}

// export default Orders