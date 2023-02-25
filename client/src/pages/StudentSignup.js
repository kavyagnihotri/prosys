import { useStudentSignup } from "../hooks/useStudentSignup"
import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.bits-pilani.ac.in/">
          Birla Institute of Technology & Science, Pilani
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

const StudentSignup = () => {
  const {signup, error, isLoading} = useStudentSignup()

  const handleSubmit = async(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const name = data.get('name')
    const studentID = data.get('studentID')
    const dept = data.get('dept')
    const cgpa = data.get('cgpa')
    const cv_link = data.get('cv_link')
    const per_link = data.get('per_link')
    const aoi = data.get('aoi')

    // console.log({email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi});
    await signup(email, password, name, studentID, dept, cgpa, cv_link, per_link, aoi)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#0e5ec7' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student Sign up
          </Typography>
          <Box>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/student/login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="BITS Email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="studentID"
                  label="Student ID"
                  name="studentID"
                //   autoComplete="studentID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dept"
                  label="Department"
                  name="dept"
                //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="cgpa"
                  label="CGPA"
                  name="cgpa"
                //   autoComplete="cgpa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="cv_link"
                  label="CV (link)"
                  name="cv_link"
                  autoComplete="cv_link"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="per_link"
                  label="Performance Sheet (link)"
                  name="per_link"
                  autoComplete="per_link"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="aoi"
                  label="Area of Interest"
                  name="aoi"
                //   autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                //   autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            {error && <div className="error">{error}</div>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default StudentSignup