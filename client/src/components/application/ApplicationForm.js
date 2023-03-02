import * as React from 'react';
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApplicationsContext } from '../../hooks/useApplicationsContext';
import { useAuthContext } from "../../hooks/useAuthContext";
import Copyright from '../dashboard/Copyright';

const theme = createTheme();

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useApplicationsContext();
  const { user } = useAuthContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [alignment, setType] = React.useState("1");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null)

  const handleToggle = (event, newAlignment) => {
    setType(newAlignment);
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate('/student/dashboard');
  }

  // fetching cuz once you go back to the dashboard we need the projects and the applications
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
      fetchProjects()
      fetchApplications()
    }

  }, [dispatch, user])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentregex = new RegExp("[fhp][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9].*");

    if (!user || !studentregex.test(user.email)) {
      setError("Student must be logged in");
      return;
    }

    const data = new FormData(event.currentTarget);
    const projectID = data.get('projectID')
    const studentEmail = user.email
    const sop = data.get('sop')
    const type = parseInt(alignment)

    // console.log(user.email);

    const application = { projectID, studentEmail, type, sop }

    const response = await fetch("/student/createApplication", {
      method: "POST",
      body: JSON.stringify(application),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }

    if (response.ok) {
      setError(null)
      console.log("New application added");
      dispatch({ type: "CREATE_APPLICATION", payload: json });
      setIsLoading(false)
      setActiveStep(1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Application
          </Typography>
          {activeStep === 1 ? (
            <React.Fragment>
              <p></p>
              <Typography variant="h5" gutterBottom>
                Your Application is Submitted.
              </Typography>
              <Button
                component={Link}
                to='/student/dashboard'
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={handleClick}
              >
                Go to Home
              </Button>
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
                    <ToggleButtonGroup value={alignment} exclusive onChange={handleToggle} aria-label="project-type" >
                      <ToggleButton value='1'>Formal</ToggleButton>
                      <ToggleButton value='0'>Informal</ToggleButton>
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
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      id="studentEmail"
                      name="studentEmail"
                      label="Your Email"
                      fullWidth
                      value={(JSON.parse(localStorage.getItem('user'))).email}
                      disabled="true"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                  {error && <div className="error">{error}</div>}
                </Grid>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default ApplicationForm