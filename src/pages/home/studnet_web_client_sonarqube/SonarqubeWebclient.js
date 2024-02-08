// Import React and necessary components
import { React, useEffect, useState } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Create a functional component for the web page

const SonarqubeWebclient = () => {
  const [selectedTestPlan, setSelectedTestPlan] = useState("");

  useEffect(() => {
    fetch(
      "http://0.0.0.0:8080/https://operations.sonar.bb-fnds.com/api/metrics/search",
      { requestOptions, method: "GET" }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  const handleChange = (event) => {
    setSelectedTestPlan(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Add your chart component here */}
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Dropdown
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Dropdown"
            value={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* Add your dropdown options here */}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

// Export the component
export default SonarqubeWebclient;
