import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Chart from "react-apexcharts";
// material-ui
import { Grid, Divider, Typography } from "@mui/material";
import MainCard from "./../../../components/MainCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

function parseXML(text) {
  if (window.DOMParser) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(text, "text/xml");
  }
  return doc;
}

const StudentWebClientPerformance = () => {
  const [selectedTestPlan, setSelectedTestPlan] = React.useState("");
  const [selectedVersions, setSelectedVersions] = React.useState("");
  const [selectedEnvs, setSelectedEnvs] = React.useState("");
  const [userData, setUserData] = React.useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [getUsers, setUsers] = useState({});

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleClick = () => {
    setShowComponent(true);
  };
  // const disableHandleClick = () => setShowComponent(false) //hides component if shown, reveals if not shown

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://load900108intstg.blob.core.windows.net/qadashboard?restype=container&comp=list&sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D"
    )
      .then((response) => response.text())
      .then((data) => {
        const currentObj = data;
        var xml = parseXML(currentObj);
        var longitudes = xml.getElementsByTagName("Name");
        var result = [];

        for (var i = 0; i < longitudes.length; i++) {
          // add longitude value to "result" array
          result.push(longitudes[i].childNodes[0].nodeValue);
        }
        var final_array = result.filter((element) =>
          element.includes("PerformanceSummary.json")
        );
        const matches = final_array.filter((s) =>
          s.includes("student web client")
        );
        // console.log(matches, 'get');

        if (matches) {
          setUserData(matches);
        }
      })
      .catch((err) => console.log(err));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  function fetchData() {
    const url =
      "https://load900108intstg.blob.core.windows.net/qadashboard/performance/student web client/" +
      selectedTestPlan +
      "/" +
      selectedVersions +
      "/" +
      selectedEnvs +
      "/PerformanceSummary.json?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        // debugger;
        const jsonData = await response.json();
        // debugger;
        // console.log({ jsonData }, 'check')

        setUsers(jsonData);
        // console.log(loading);
      })
      .catch((error) => {
        // debugger;
        setShowComponent(false);
        // return Promise.reject(error)
      });
  }

  useEffect(() => {
    if (selectedTestPlan && selectedEnvs && selectedVersions) {
      return fetchData();
    } else {
      return () => {};
    }
  }, [selectedTestPlan, selectedVersions, selectedEnvs]);

  var productJson = [];

  userData.forEach((item) => {
    const values = item.split("/");
    var testPlan = productJson.find((v) => v.name.includes(values[2]));
    if (testPlan) {
      //version
      var version = testPlan.versions.find((v) => v.name.includes(values[3]));
      if (version) {
        //enviornment
        var environment = version.environment.find((v) =>
          v.includes(values[4])
        );
        if (!environment) {
          version.environment.push(values[4]);
        }
      } else {
        testPlan.versions.push({
          name: values[3],
          environment: [values[4]],
        });
      }
    } else {
      var obj = {
        name: values[2],
        versions: [
          {
            name: values[3],
            environment: [values[4]],
          },
        ],
      };
      productJson.push(obj);
    }
  });

  var fullResult = { testplan: productJson };
  const availableVersions = fullResult.testplan.find(
    (c) => c.name === selectedTestPlan
  );
  const availableEnvs = availableVersions?.versions?.find(
    (s) => s.name === selectedVersions
  );

  function SubmitButton() {
    if (selectedTestPlan && selectedVersions && selectedEnvs && getUsers) {
      return (
        <Button
          style={{ width: 120 }}
          variant="contained"
          type="button"
          onClick={handleClick}
        >
          Show Data
        </Button>
      );
    } else if (
      selectedTestPlan === setSelectedTestPlan &&
      selectedVersions === setSelectedVersions &&
      selectedEnvs === setSelectedEnvs
    ) {
      return (
        <Button
          variant="contained"
          style={{ width: 120 }}
          type="button"
          onClick={handleClick}
          disabled
        >
          Show Data
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          style={{ width: 120 }}
          type="button"
          onClick={handleClick}
          disabled
        >
          Show Data
        </Button>
      );
    }
  }

  const apexLineZscoreOptions = {
    chart: {
      height: 250,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
      categories:
        Object.keys(getUsers).length > 0 ? getUsers.graph.zScore.date : [],
    },
    tooltip: {
      x: {
        format: "MM/dd/yy",
      },
    },
  };

  const apexLineZscoreSeries = [
    {
      name: "Zscore>1",
      data: Object.keys(getUsers).length > 0 ? getUsers.graph.zScore.value : [],
    },
  ];

  const apexLineAverageResponseOptions = {
    chart: {
      height: 250,
      type: "area",
    },
    theme: {
      palette: "palette2", // upto palette10
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
      categories:
        Object.keys(getUsers).length > 0 ? getUsers.graph.avgResponse.date : [],
    },
    tooltip: {
      x: {
        format: "MM/dd/yy",
      },
    },
  };

  const apexLineAverageResponseSeries = [
    {
      name: "Appdex",
      data:
        Object.keys(getUsers).length > 0 ? getUsers.graph.avgResponse.avg : [],
    },
  ];

  const apexBarAppdexOptions = {
    colors: ["#008450", "#EFB700", "#B81D13"],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 1,
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 300,
            },
          },
        },
      },
    },
    xaxis: {
      type: "date",
      categories:
        Object.keys(getUsers).length > 0 ? getUsers.graph.appDex.date : [],
    },
    legend: {
      position: "bottom",
      offsetY: 5,
    },
    fill: {
      opacity: 1,
    },
  };

  const apexBarAppdexSeries = [
    {
      name: "Satisfied",
      data:
        Object.keys(getUsers).length > 0 ? getUsers.graph.appDex.satisfied : [],
    },
    {
      name: "Tolerating",
      data:
        Object.keys(getUsers).length > 0
          ? getUsers.graph.appDex.tolerating
          : [],
    },
    {
      name: "Frustrated",
      data:
        Object.keys(getUsers).length > 0
          ? getUsers.graph.appDex.frustrated
          : [],
    },
  ];

  console.log(
    Object.keys(getUsers).length > 0 ? getUsers.graph.avgResponse.value : [],
    "ssss"
  );

  const navigateToDetail = (post) => {
    setTimeout(() => {
      navigate("/detailsummary", { state: post });
    }, 0.5);
    // here we will redirect user and send your data into state
  };

  return (
    <Grid>
      <Grid container rowSpacing={2.5} columnSpacing={1}>
        {/* row 1 */}
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Grid item xs={12} sx={{ mb: -2.25 }} rowSpacing={4.5}>
          <Typography variant="h5">Search Querying</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">TestPlan</InputLabel>

            <Select
              value={selectedTestPlan}
              style={{ width: 180 }}
              placeholder="TestPlan"
              onChange={(e) => (
                setSelectedTestPlan(e.target.value), setShowComponent(false)
              )}
            >
              {fullResult.testplan.map((value, key) => {
                return (
                  <MenuItem value={value.name} key={key}>
                    {value.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Version</InputLabel>

            <Select
              placeholder="Version"
              style={{ width: 120 }}
              value={selectedVersions}
              onChange={(e) => (
                setSelectedVersions(e.target.value), setShowComponent(false)
              )}
            >
              {availableVersions?.versions.map((e, key) => {
                return (
                  <MenuItem value={e.name} key={key}>
                    {e.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Environment</InputLabel>

            <Select
              placeholder="Envs"
              style={{ width: 120 }}
              value={selectedEnvs}
              onChange={(e) => (
                setSelectedEnvs(e.target.value), setShowComponent(false)
              )}
            >
              {availableEnvs?.environment.map((e, key) => {
                return (
                  <MenuItem value={e} key={key}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SubmitButton />
        </Grid>
      </Grid>
      <Divider variant="middle" style={{ margin: "15px 0" }} />
      <Grid container rowSpacing={4.5} columnSpacing={1}>
        {/* row 2 */}
        {selectedTestPlan && selectedVersions && selectedEnvs && getUsers ? (
          <Grid item xs={12}>
            <Typography variant="h6">
              Selected Test Results : {selectedTestPlan}/{selectedVersions}/
              {selectedEnvs}
            </Typography>
          </Grid>
        ) : (
          ""
        )}
        {showComponent ? (
          <>
            <Divider />
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5">Zscore Result</Typography>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <Chart
                    options={apexLineZscoreOptions}
                    series={apexLineZscoreSeries}
                    type="area"
                    height={350}
                  />
                </Box>
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5">Average Response</Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <Chart
                  options={apexLineAverageResponseOptions}
                  series={apexLineAverageResponseSeries}
                  type="area"
                  height={350}
                />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5">Appdex</Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <Chart
                  options={apexBarAppdexOptions}
                  series={apexBarAppdexSeries}
                  type="bar"
                  height={350}
                />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={8}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5">
                    Last 5 Performance Test Run Details{" "}
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead text="Last Ten Test Run Details">
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">
                          Average Response Time
                        </TableCell>
                        <TableCell align="right">
                          90 Percentile response time
                        </TableCell>
                        <TableCell align="right">Virtual Users</TableCell>
                        <TableCell align="right">Error Percentage</TableCell>
                        {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getUsers.lastTenTestRunDetail.map((row) => (
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={() =>
                              navigateToDetail(row.testDetailFilePath)
                            }
                          >
                            <Button> {row.date}</Button>
                          </TableCell>
                          <TableCell align="right">
                            {row.avgResponseTime}
                          </TableCell>
                          {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                          <TableCell align="right">
                            {row["90PercentileResponseTime"]}
                          </TableCell>
                          <TableCell align="right">
                            {row.virtualUsers}
                          </TableCell>

                          <TableCell align="right">
                            {row.errorsPercentage}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default StudentWebClientPerformance;
