import * as React from 'react';
import { useEffect, useState } from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Paper from '@mui/material/Paper';

import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Projects from './ProfProjectDetails';

const tables = [0, 1, 2]

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

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
    <div>
        {projects && tables.map((table) => (
          <TableContainer component={Paper} sx={{height: "50%"}}>
              <React.Fragment>
                <Title sx={{align: "center"}}>{table}</Title>
                    <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ width: "25%" }}>Title</TableCell>
                      <TableCell align="center" style={{ width: "25%" }}>Project Type</TableCell>
                      <TableCell align="center" style={{ width: "25%" }}>Description</TableCell>
                      <TableCell align="center" style={{ width: "20%" }}>Prerequisite(s)</TableCell>
                      {/* <TableCell align="center" style={{ width: "50%" }}>Offered By</TableCell> */}
                      <TableCell align="center" style={{ width: "50%" }}>Number of Students</TableCell>
                      {/* <TableCell align="right" style={{ width: 200 }}>Status</TableCell> */}
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                    </TableHead>
                <Table aria-label="simple table">
                    <TableBody>
                    {projects.map((project) => (
                    <div>
                      {project.professorEmail === user.email && table === project.approved && <Projects key={project._id} project={project}/>}
                    </div>
                    ))}
                    </TableBody>
                </Table>
              {/* {error && <div className="error">{error}</div>} */}
              {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>See more</Link> */}
            </React.Fragment>
          </TableContainer>
        ))}
        {/* <ProjectForm /> */}
    </div>
  );
}

// export default Orders