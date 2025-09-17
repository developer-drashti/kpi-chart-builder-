import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import KPIForm from "./components/KPIForm";
import KPIChart from "./components/KPIChart";

function App() {
  const [query, setQuery] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const handleFormSubmit = (formValues) => {
    setQuery(formValues);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        KPI Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <KPIForm onSubmit={handleFormSubmit} />

        {/* Chart type selector */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="line">Line</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {query && (
        <Box>
          <KPIChart query={query} chartType={chartType} />
        </Box>
      )}
    </Container>
  );
}

export default App;
