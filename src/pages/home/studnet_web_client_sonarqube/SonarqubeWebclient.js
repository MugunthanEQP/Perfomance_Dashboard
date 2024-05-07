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
  const [loading, setLoading] = useState(false);
  const [selectedTestPlan, setSelectedTestPlan] = useState("");
  const [userData, setUserData] = useState([]);

  var dropdown_charts = [];

  function fetchData() {
    const url =
      "https://nkat0vxlya.execute-api.us-east-1.amazonaws.com/proxy/testproxy/products/operations_graph";

    fetch(url)
      .then(async (response) => {
        const jsonData = await response.json();
        jsonData.content.measures.forEach((item) => {
          // console.log(item.history, "check1");
          dropdown_charts.push(
            item.metric

            //   {
            //   label: item.metric,
            //   value: item.history,
            // }
          );
        });
        setUserData(jsonData);
        console.log(jsonData.content.measures.length);
        setLoading(true);
        console.log(dropdown_charts, "check");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    return fetchData();
  }, []);

  // dropdown_charts.map((item) => {
  //   console.log(item, "check3");
  // });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Add your chart component here */}
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        {loading ? (
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Dropdown
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Dropdown"
              value={dropdown_charts}
              
              // onChange={handleChange}
            >
              {dropdown_charts.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
              {dropdown_charts.map((item, index) => (
                <MenuItem key={index} value={Object.values(item[0].label)}>
                  {Object.values(item[0].label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};
// Export the component
export default SonarqubeWebclient;
