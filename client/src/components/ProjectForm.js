import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const ProjectForm = () => {
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [projectID, setProjectID] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [prerequisite, setPrerquisite] = useState("");
  const [numberOfStudents, setProjectNumber] = useState("");
  const [error, setError] = useState(null);
  const [emptyfields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const professorEmail = user.email;
    const approved = 0;

    const project = {
      title,
      projectID,
      description,
      prerequisite,
      projectType,
      professorEmail,
      numberOfStudents,
      approved,
    };
    console.log(project);
    const response = await fetch("/projects", {
      method: "POST",
      body: JSON.stringify({
        title,
        projectID,
        description,
        prerequisite,
        projectType,
        professorEmail,
        numberOfStudents,
        approved,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyfields);
    }

    if (response.ok) {
      setTitle("");
      setProjectID("");
      setDescription("");
      setProjectNumber("");
      setProjectType("");
      setPrerquisite("");
      setError(null);
      setEmptyFields([]);
      console.log("new project added", json);
      dispatch({ type: "CREATE_PROJECT", payload: json });
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          margin: 10,
          // alignSelf: "center",
          // alignItems: "center",
        }}
      >
          
        <Box
          sx={{
            
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > 
          <Typography component="h1" variant="h5">
            Add Projects
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt:3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className={emptyfields.includes("title") ? "error" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project ID"
                  type="text"
                  onChange={(e) => setProjectID(e.target.value)}
                  value={projectID}
                  className={emptyfields.includes("projectID") ? "error" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className={emptyfields.includes("description") ? "error" : ""}
                  //   autoComplete="studentID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  onChange={(e) => setPrerquisite(e.target.value)}
                  value={prerequisite}
                  className={emptyfields.includes("description") ? "error" : ""}
                  label="Prerequisite(s)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Project Type"
                  onChange={(e) => setProjectType(e.target.value)}
                  value={projectType}
                  className={emptyfields.includes("description") ? "error" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  onChange={(e) => setProjectNumber(e.target.value)}
                  value={numberOfStudents}
                  className={emptyfields.includes("description") ? "error" : ""}
                  label="Number of Formal Students"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Project
            </Button>
            {error && <div className="error">{error}</div>}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectForm;
