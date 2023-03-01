import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState,useEffect,useRef } from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'

function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentHod() {

  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/prof/', {
        method: "POST",
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
      <Title>Current HODs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Professor Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Dismiss as HOD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects && projects.map((project) => (
            project.hod===true &&
            <TableRow key={project._id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.dept}</TableCell>
              <TableCell><Button size="large" startIcon={<PersonRemoveIcon />} type="submit" >DISMISS AS HOD</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}