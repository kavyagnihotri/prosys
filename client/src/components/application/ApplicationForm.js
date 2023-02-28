import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApplicationsContext } from '../../hooks/useApplicationsContext';
import { useAuthContext } from "../../hooks/useAuthContext";

// import Form from './Form';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        ProSys
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [alignment, setType] = React.useState('formal');

  const handleToggle = (event, newAlignment) => {
    setType(newAlignment);
  };

  const handleHome = () => {

  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const { dispatch } = useApplicationsContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentregex = new RegExp("[fhp][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*");

    if (!user || !studentregex.test(user.email)) {
      setError("Student must be logged in");
      return;
    }

    const data = new FormData(event.currentTarget);
    const projectID = data.get('projectID')
    const studentEmail = data.get('studentEmail')
    const type = data.get('type')
    const sop = data.get('sop')
    // const profEmail = data.get('profEmail')
    // const status = data.get('status')

    const application = { projectID, studentEmail, type, sop }
    console.log(application);

    const response = await fetch("/student/createApplication", {
      method: "POST",
      body: JSON.stringify({ projectID, studentEmail, type, sop }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json()

    console.log(json);

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("New application added", json);
      dispatch({ type: "CREATE_APPLICATION", payload: json });
    }
    // await checkout(projectID, profEmail, studentEmail, type, sop)
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Application
          </Typography>
          {activeStep === 1 ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Your Application is Submitted.
              </Typography>
              {/* <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography> */}
              <Link to='/student/dashboard'>
                <Button
                  variant="contained"
                  // onClick={handleHome}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Go to Home
                </Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      value="title"
                      label="Project Title"
                      fullWidth
                      variant="standard"
                      disabled="true"
                    />
                  </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleToggle}
                      aria-label="project-type"
                    >
                      <ToggleButton value='1'>
                        Formal
                      </ToggleButton>
                      <ToggleButton value='0'>
                        Informal
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="projectID"
                      name="projectID"
                      // value="projectID"
                      label="Project ID"
                      fullWidth
                      variant="standard"
                    // disabled="true"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="sop"
                      name="sop"
                      label="Statement of Purpose"
                      fullWidth
                      autoComplete="shipping address-line2"
                      variant="standard"
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <TextField
                      required
                      id="profEmail"
                      name="profEmail"
                      label="Professor Email"
                      value="xyz@gmail.com"
                      fullWidth
                      variant="standard"
                      disabled="true"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="studentEmail"
                      name="studentEmail"
                      label="Your Email"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}