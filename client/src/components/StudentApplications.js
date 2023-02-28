import * as React from 'react';
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useApplicationsContext } from '../hooks/useApplicationsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Applications from './StudentApplicationDetails';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { applications, dispatch } = useApplicationsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/student/applications', {
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
      <Title>Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project ID</TableCell>
            {/* <TableCell>Title</TableCell> */}
            <TableCell>Student Email</TableCell>
            <TableCell>Professor Email</TableCell>
            <TableCell>Statement of Purpose</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications && applications.map((application) => (
            <Applications key={application._id} application={application} />
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}