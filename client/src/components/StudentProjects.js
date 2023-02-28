import * as React from 'react';
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Projects from './StudentProjectDetails';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/student/projects', {
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
      <Title>Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Project Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Prerequisite</TableCell>
            <TableCell>Offered By</TableCell>
            <TableCell>Number of Students</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects && projects.map((project) => (
            project.approved === 1 && 
            <Projects key={project._id} project={project} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}