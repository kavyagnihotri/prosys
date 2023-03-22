import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useState,useEffect } from 'react';
import { useProjectsContext } from '../../hooks/useProjectsContext'
import { useAuthContext } from '../../hooks/useAuthContext'

function preventDefault(event) {
  event.preventDefault();
}

export default function NewProjectTable() {

  const { projects, dispatch } = useProjectsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/projects/', {
        method: "GET",
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

  const onAccept = async (id) => {
    await fetch('/augsd/accept',{
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    const fetchProjects = async () => {
      const response = await fetch('/projects/', {
        method: "GET",
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
  }

  const onReject = async (id) => {
    // e.preventDefault()s
    
    await fetch('/augsd/reject',{
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id})
    })
    const fetchProjects = async () => {
      const response = await fetch('/projects/', {
        method: "GET",
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
  }

  return (
    <React.Fragment>
      <Title>New Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell>Project ID</TableCell>
            <TableCell>Project Type</TableCell>
            <TableCell>Professor Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Pre-requisites</TableCell>
            <TableCell>No. of Students</TableCell>
            <TableCell>Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects && projects.map((project) => (
            project.approved===0 &&
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.projectID}</TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>{project.professorEmail}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.prerequisite}</TableCell>
              <TableCell>{project.numberOfStudents}</TableCell>
              <TableCell>
                <Button size="large" startIcon={<CheckCircleOutlineOutlinedIcon />} type="submit" onClick={(e)=> onAccept(project._id)}>ACCEPT</Button>
                <Button size="large" startIcon={<CancelOutlinedIcon />} type="submit" onClick={(e)=> onReject(project._id)}>REJECT</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}