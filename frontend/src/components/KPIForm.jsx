import { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

function KPIForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    metric: "count",
    groupBy: "type",
    from: "",
    to: "",
    types: "",
    areas: "",
    minSpeed: "",
    maxSpeed: "",
    vest: "1",
    headingMin: "",
    headingMax: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };
console.log("formValues.vest :-", formValues.vest);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Metrics Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📐 Metrics
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControl fullWidth>
                <Select
                  name="metric"
                  value={formValues.metric}
                  onChange={handleChange}
                  sx={{ minWidth: "250px" }}
                >
                  <MenuItem value="count">Count</MenuItem>
                  <MenuItem value="unique_ids">Unique IDs</MenuItem>
                  <MenuItem value="rate">Rate Per Hour</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Group By Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Group By
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControl fullWidth>
                <Select
                  name="groupBy"
                  value={formValues.groupBy}
                  onChange={handleChange}
                  sx={{ minWidth: "250px" }}
                >
                  <MenuItem value="type">Class</MenuItem>
                  <MenuItem value="id">ID</MenuItem>
                  <MenuItem value="area">Zone</MenuItem>
                  <MenuItem value="timestamp">Time Bucket</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Filters Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔍 Filters
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="From (YYYY-MM-DD)"
                    type="date"
                    name="from"
                    value={formValues.from}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="To (YYYY-MM-DD)"
                    type="date"
                    name="to"
                    value={formValues.to}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Class (Type)"
                    name="types"
                    value={formValues.types}
                    onChange={handleChange}
                    placeholder="human, vehicle..."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Zone (Area)"
                    name="areas"
                    value={formValues.areas}
                    onChange={handleChange}
                    placeholder="Zone A, Zone B..."
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Min Speed"
                    name="minSpeed"
                    type="number"
                    value={formValues.minSpeed}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max Speed"
                    name="maxSpeed"
                    type="number"
                    value={formValues.maxSpeed}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Select
                      name="vest"
                      value={formValues.vest}
                      onChange={handleChange}
                      sx={{ minWidth: "250px" }}
                    >
                      <MenuItem value=" ">Any</MenuItem>
                      <MenuItem value="1">Worn</MenuItem>
                      <MenuItem value="0">Not Worn</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Heading Min"
                    name="headingMin"
                    type="number"
                    value={formValues.headingMin}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Heading Max"
                    name="headingMax"
                    type="number"
                    value={formValues.headingMax}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Submit */}
        <Grid item xs={12} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Preview KPI
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default KPIForm;
