import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useState,useEffect,useRef } from 'react';
import { useApplicationContext } from '../../hooks/useApplicationsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
// import {approvedprojects} from '../context/ProjectContext'

function preventDefault(event) {
  event.preventDefault();
}

export default function FormalApplications() {

  const { applications, dispatch } = useApplicationContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/student/applications/', {
        method: "GET",
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_APPLICATIONS', payload: json })
      }
    }

    if (user) {
      fetchApplications()
    }

  }, [dispatch, user])

  return (
    <React.Fragment>
      <Title>Formal Applicants</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell>Project ID</TableCell>
            <TableCell>Project Type</TableCell>
            <TableCell>Professor Email</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Pre-requisites</TableCell>
            <TableCell>No. of Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects && projects.map((project) => (
            project.approved===1 &&
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.projectID}</TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>{project.professorEmail}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.prerequisite}</TableCell>
              <TableCell>{project.numberOfStudents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}