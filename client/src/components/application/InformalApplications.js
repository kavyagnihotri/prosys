import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useState,useEffect,useRef } from 'react';
import { useApplicationsContext } from '../../hooks/useApplicationsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useParams } from 'react-router-dom';
import { useStudentsContext } from '../../hooks/useStudentsContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem"


const branches = [
  {
      value: 1,
      label: "1",
  },
  {
      value: 2,
      label: "2",
  },
  {
      value: 3,
      label: "3",
  },
  {
      value: 4,
      label: "4",
  },
  {
      value: 5,
      label: "5",
  },
  {
      value: 6,
      label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  }, 
  {
  value: 9,
  label: "9",
  },
  {
  value: 10,
  label: "10",
  },
]



function preventDefault(event) {
  event.preventDefault();
}

export default function InformalApplications() {

  var { applications, dispatch } = useApplicationsContext()
  const { user } = useAuthContext()
  const { id } = useParams()
  var { students , dispatch1 } = useStudentsContext()
  var title = ""

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/student/applications/', {
        method: "GET",
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_APPLICATIONS', payload: json })
        applications = json
      }
    }

    const fetchStudents = async () => {
      const response = await fetch('/student/', {
        method: "GET",
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch1({ type: 'SET_STUDENTS', payload: json })
      }
    }

    if (user) {
      fetchApplications()
      fetchStudents()
      // applications && applications.map((a) =>{
      //   if(a.projectID==id)
      //     title = a.projectTitle
      // })
    }

  }, [dispatch,dispatch1, user])

  return (
    <React.Fragment>
      <Title>Informal Applicants for Project</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>CGPA</TableCell>
            <TableCell>SoP</TableCell>
            <TableCell>CV Link</TableCell>
            <TableCell>Performace Sheet Link</TableCell>
            <TableCell>Areas of Interest</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications && applications.map((app) => (
            app.profEmail===user.email && 
            app.projectID===id && app.type===0 &&
            students && students.map((stud) => (
            stud.email===app.studentEmail &&
            <TableRow key={stud._id}>
              <TableCell>{stud.name}</TableCell>
              <TableCell>{stud.dept}</TableCell>
              <TableCell>{stud.cgpa}</TableCell>
              <TableCell>{app.sop}</TableCell>
              <TableCell>
              <ListItemButton href={stud.cv_link}><ListItemText primary="CV" /></ListItemButton>
              </TableCell>
              <TableCell>
              <ListItemButton href={stud.per_link}><ListItemText primary="Performace Sheet" /></ListItemButton>
              </TableCell>
              <TableCell>{stud.aoi}</TableCell>
              <TableCell>
                <TextField id="score" name="score" select defaultValue="" required label="Score">
                  {branches.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                            {option.label}
                      </MenuItem>
                  ))}
                </TextField>
              </TableCell>
            </TableRow>
          ))))}
        </TableBody>
      </Table>
      <Button color="inherit" size="large" type="submit" variant='outlined'>
              Approve Score
      </Button>
    </React.Fragment>
  );
}