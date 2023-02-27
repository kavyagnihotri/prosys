import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// projectID(num), profEmail, studentEmail, type(num), sop, status(num)

export default function AddressForm() {
  const [alignment, setType] = React.useState('formal');

  const handleToggle = (event, newAlignment) => {
    setType(newAlignment);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="projectID"
            name="projectID"
            value="projectID"
            label="Project ID"
            fullWidth
            variant="standard"
            disabled="true"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleToggle}
            aria-label="project-type"
          >
            <ToggleButton value="formal">
              Formal
            </ToggleButton>
            <ToggleButton value="informal">
              Informal
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
