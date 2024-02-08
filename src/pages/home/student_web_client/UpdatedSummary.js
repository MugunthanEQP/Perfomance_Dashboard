import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
// import Container from "@mui/material/Container";
// import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Chart from "react-apexcharts";
// material-ui
import {
  Grid,
  Typography,
  Stack,
  Breadcrumbs,
  CardContent,
  Card,
} from "@mui/material";
import MainCard from "./../../../components/MainCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { IconButton, Collapse } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { TailSpin } from "react-loader-spinner";

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
  const [selectedOption, setSelectedOption] = useState(""); // Initialize selectedOption state with an empty string
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [detailData, setDetailData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [aggreePage, setAggreePage] = React.useState(0);
  const [aggreeRowsPerPage, setAggreeRowsPerPage] = React.useState(5);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleClick = () => {
    setShowComponent(true);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const aggreehandleChangePage = (event, newPage) => {
    setAggreePage(newPage);
  };

  const aggreehandleChangeRowsPerPage = (event) => {
    setAggreeRowsPerPage(+event.target.value);
    setAggreePage(0);
  };

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      "https://load900108intstg.blob.core.windows.net/qadashboard?restype=container&comp=list&sp=racwdli&st=2024-01-19T12:46:16Z&se=2025-12-30T20:46:16Z&spr=https&sv=2022-11-02&sr=c&sig=WOuX4AJ5xswDXs3sXL0xKHHkOP3JmM78Oue%2FVwdnDX8%3D"
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

  useEffect(() => {
    if (selectedTestPlan && selectedEnvs && selectedVersions) {
      // return fetchData();
      const url =
        "https://load900108intstg.blob.core.windows.net/qadashboard/performance/student web client/" +
        selectedTestPlan +
        "/" +
        selectedVersions +
        "/" +
        selectedEnvs +
        "/PerformanceSummary.json?sp=r&st=2024-01-18T09:50:18Z&se=2025-12-31T17:50:18Z&spr=https&sv=2022-11-02&sr=c&sig=wYYLFXEWVxfH9oU7d4PbPxWC9LlF3%2FJ77GhSpBPeshU%3D";
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(async (response) => {
          const jsonData = await response.json();
          setSelectedOption(
            jsonData.lastTenTestRunDetail[0].testDetailFilePath
          );

          setUsers(jsonData);
        })
        .catch((error) => {
          // debugger;
          setShowComponent(false);
          // return Promise.reject(error)
        });
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
    if (
      selectedTestPlan &&
      selectedVersions &&
      selectedEnvs &&
      getUsers &&
      getUsers.lastTenTestRunDetail
    ) {
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

  SubmitButton();

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

  useEffect(() => {
    // debugger;
    if (!selectedOption) {
      return; // if selectedOption is not set, exit the useEffect
    }
    setLoading(true);
    console.log(selectedOption, loading, "entered");

    const url =
      "https://load900108intstg.blob.core.windows.net/qadashboard/" +
      selectedOption +
      "?sp=r&st=2024-01-18T09:50:18Z&se=2025-12-31T17:50:18Z&spr=https&sv=2022-11-02&sr=c&sig=wYYLFXEWVxfH9oU7d4PbPxWC9LlF3%2FJ77GhSpBPeshU%3D";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const jsonData = await response.json();
        setDetailData(jsonData);
        // debugger;
        console.log(setDetailData.length, "fetch check detail page");
      })
      .catch((error) => {
        // debugger;
      })
      .finally(() => setLoading(false));
  }, [selectedOption]);

  const timelineConcurrentUsersandHitsOptions = {
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
      type: "time",
      categories:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.time
          : [],
    },
    tooltip: {
      x: {
        format: "mm:ss",
      },
    },
  };

  const timelineConcurrentUsersandHitsSeries = [
    {
      name: "Concurrent Users",
      data:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.concurrentUsers
          : [],
    },
  ];
  const timelineConcurrentUsersandLatencyOptions = {
    chart: {
      height: 450,
      type: "line",
      stacked: false,
    },

    stroke: {
      width: [0, 2, 5],
      curve: "stepline",
    },
    markers: {
      size: 0,
    },
    plotOptions: {
      bar: {
        columnWidth: "1%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
    },
    xaxis: {
      type: "time",
      categories:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.time
          : [],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        stroke: {
          width: [0, 2, 5],
          curve: "stepline",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "Users",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        stroke: {
          // width: [0, 2, 5],
          curve: "stepline",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          text: "Latency",
          style: {
            color: "#00E396",
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
        },
        stroke: {
          // width: [0, 2, 5],
          curve: "stepline",
        },
        title: {
          text: "Average Response",
          style: {
            color: "#FEB019",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 20,
        offsetX: 20,
      },
    },
    legend: {
      horizontalAlign: "center",
      offsetX: 10,
    },
  };
  const timelineConcurrentUsersandLatencySeries = [
    {
      name: "Concurrent Users",
      type: "line",
      data:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.concurrentUsers
          : [],
    },
    {
      name: "Latency",
      type: "line",
      data:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.latency
          : [],
    },
    {
      name: "Response Time",
      type: "line",
      data:
        Object.keys(detailData).length > 0
          ? detailData.graphData.concurrentUserByResponse.avgResponse
          : [],
    },
  ];

  // console.log(detailData, "checking");

  return (
    <Grid>
      <Grid container style={{ gap: 15 }}>
        {/* row 1 */}
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl>
            <InputLabel id="testplan">TestPlan</InputLabel>
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
        <Grid item xs={12} sm={6} md={2}>
          <FormControl>
            <InputLabel id="version">Version</InputLabel>

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
        <Grid item xs={12} sm={6} md={2}>
          <FormControl>
            <InputLabel id="environment">Environment</InputLabel>

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
      {/* <Divider variant="middle" style={{ margin: "15px 0" }} /> */}
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
            <Paper elevation={3} sx={{ p: 2 }}>
              {loading ? (
                <Grid>
                  <div className="loader">
                    <TailSpin
                      type="Bars"
                      color="#00BFFF"
                      height={50}
                      width={100}
                      timeout={1000} //1 secs
                    />
                  </div>
                </Grid>
              ) : detailData.length != 0 ? (
                <>
                  <Grid container columnSpacing={4} item xs>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                      <FormControl>
                        <Box elevation={3}>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Select Test
                          </FormLabel>
                          <RadioGroup
                            name="radioGroup"
                            value={selectedOption}
                            onChange={handleRadioChange}
                            color="secondary"
                          >
                            {getUsers.lastTenTestRunDetail.map((row) => (
                              <FormControlLabel
                                // ey={row.date}
                                value={row.testDetailFilePath}
                                control={<Radio />}
                                label={row.date}
                              />
                            ))}
                          </RadioGroup>
                        </Box>
                      </FormControl>
                    </Grid>

                    {/* <Divider orientation="vertical" variant="middle" /> */}

                    {/* <Grid item xs={4} sm={4} md={4}>
                      <Typography variant="h5"> Summary</Typography>
                      <Card xs={6}>
                        <CardContent>
                          <Stack spacing={0.5} sx={{ mt: -1.5 }}>
                            <Typography variant="h6">
                              User: {detailData.metadata.runByUser} / Duration:{" "}
                              {detailData.metadata.durationInMin}min
                            </Typography>

                            <Breadcrumbs aria-label="breadcrumb">
                              <Typography variant="h6">
                                Start Time: {detailData.metadata.startTime}
                              </Typography>
                              <Typography variant="h6">
                                End Time: {detailData.metadata.endTime}
                              </Typography>{" "}
                            </Breadcrumbs>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid> */}
                  </Grid>

                  <Divider variant="middle" />

                  <Grid
                    container
                    // justifyContent="space-evenly"
                    direction="row"
                    columnSpacing={2}
                    rowSpacing={2}
                    item
                  >
                    <Grid item xs={2.5}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ mb: 0 }} color="text.secondary">
                            Average Throughput(Hits/s)
                          </Typography>
                          <Typography variant="h5" component="div">
                            {detailData.summaryData.avgThroughput}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ mb: 0 }} color="text.secondary">
                            Average Response Time(Ms)
                          </Typography>
                          <Typography variant="h5" component="div">
                            {detailData.summaryData.avgResponseTime}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ mb: 0 }} color="text.secondary">
                            90% Response Time(Ms)
                          </Typography>
                          <Typography variant="h5" component="div">
                            {detailData.summaryData["90PercentileResponseTime"]}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ mb: 0 }} color="text.secondary">
                            Error Rate(%)
                          </Typography>
                          <Typography variant="h5" component="div">
                            {detailData.summaryData.errorsPercentage}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={2}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ mb: 0 }} color="text.secondary">
                            Virtual Users
                          </Typography>
                          <Typography variant="h5" component="div">
                            {detailData.summaryData.virtualUsers}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Divider />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h5">
                        Top 5 Slowest Response(By Average Response Time)
                      </Typography>

                      <MainCard sx={{ mt: 1 }} content={false}>
                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableHead text="Last Ten Test Run Details">
                              <TableRow>
                                <TableCell>Request</TableCell>
                                <TableCell align="right">#Samples</TableCell>
                                <TableCell align="right">
                                  Average Time
                                </TableCell>
                                <TableCell align="right">90% Time</TableCell>
                                <TableCell align="right">Max Time</TableCell>
                                {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {detailData.data.topSlowRequests.map((row) => (
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {row.request}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.noOfSamples}
                                  </TableCell>
                                  {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                                  <TableCell align="right">
                                    {row.avgResponseTime}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row["90PercentileResponseTime"]}
                                  </TableCell>

                                  <TableCell align="right">
                                    {row.MaxTime}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </MainCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h5">Top 5 Errors</Typography>
                      <MainCard sx={{ mt: 1 }} content={false}>
                        <TableContainer component={Paper}>
                          <Table aria-label="simple table">
                            <TableHead text="Last Ten Test Run Details">
                              <TableRow>
                                <TableCell>Response Code</TableCell>
                                <TableCell align="right">Message</TableCell>
                                <TableCell align="right">Count</TableCell>
                                {/* <TableCell
                                  align="right"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  Url
                                </TableCell> */}
                                {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {detailData.data.topErrors.map((row) => (
                                <TableRow
                                // style={{
                                //   backgroundColor: "#f5f5f5",
                                //   height: "25px",
                                // }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.responseCode}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.message}
                                  </TableCell>
                                  {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                                  <TableCell align="right">
                                    {row.count}
                                  </TableCell>
                                  {/* <TableCell
                                    align="right"
                                    style={{
                                      whiteSpace: "nowrap",
                                      textOverflow: "ellipsis",
                                      width: "300px",
                                      display: "block",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {row.url}
                                  </TableCell> */}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </MainCard>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h5">All Errors</Typography>
                      <MainCard sx={{ mt: 1 }} content={false}>
                        <TableContainer component={Paper}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead text="All Errors">
                              <TableRow>
                                <TableCell>Response Code</TableCell>
                                <TableCell align="right">Message</TableCell>
                                <TableCell align="right">Count</TableCell>
                                {/* <TableCell
                                  align="right"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  Url
                                </TableCell> */}
                                {/* <TableCell align="right">Name</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {detailData.data.allErrorData
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => (
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      {row.responseCode}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.message}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.count}
                                    </TableCell>
                                    {/* <TableCell
                                      align="right"
                                      style={{
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        width: "300px",
                                        display: "block",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {row.url}
                                    </TableCell> */}

                                    {/* <TableCell
                                      style={{
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        width: "300px",
                                        display: "block",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {row.name}
                                    </TableCell> */}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20]}
                          component="div"
                          count={detailData.data.allErrorData.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </MainCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Typography variant="h5">All Aggregated Data</Typography>
                      <MainCard sx={{ mt: 1 }} content={false}>
                        <TableContainer component={Paper}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead text="All Aggregate Data">
                              <TableRow>
                                <TableCell align="right">
                                  No.of Samples
                                </TableCell>
                                <TableCell align="right">
                                  Average Response Time
                                </TableCell>
                                <TableCell align="right">
                                  90% Resp.Time
                                </TableCell>
                                <TableCell align="right">
                                  99% Resp.Time
                                </TableCell>
                                <TableCell align="right">
                                  Erros By Percentage
                                </TableCell>
                                <TableCell align="right">Hits/Sec</TableCell>
                                {/* <TableCell>Label</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {detailData.data.allAggregateData
                                .slice(
                                  aggreePage * aggreeRowsPerPage,
                                  aggreePage * aggreeRowsPerPage +
                                    aggreeRowsPerPage
                                )
                                .map((row) => (
                                  <TableRow>
                                    <TableCell align="right">
                                      {row.noOfSamples}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.avgResponseTime}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row["90PercentileResponseTime"]}
                                    </TableCell>

                                    <TableCell>
                                      {row["99PercentileResponseTime"]}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row["errorsByPercentage"]}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row["hitsPerSec"]}
                                    </TableCell>
                                    {/* <TableCell component="th" scope="row">
                                      {row.label}
                                    </TableCell> */}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20]}
                          component="div"
                          count={detailData.data.allAggregateData.length}
                          rowsPerPage={aggreeRowsPerPage}
                          page={aggreePage}
                          onPageChange={aggreehandleChangePage}
                          onRowsPerPageChange={aggreehandleChangeRowsPerPage}
                        />
                      </MainCard>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container rowSpacing={3} columnSpacing={0}>
                    <Grid item xs={12} md={5} lg={12}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography variant="h3">Timeline Graphs</Typography>
                          <Typography variant="h5">
                            Concurrent Users and Response Time
                          </Typography>
                        </Grid>
                        <Grid item />
                      </Grid>
                      <MainCard sx={{ mt: 2 }} content={false}>
                        <Chart
                          options={timelineConcurrentUsersandLatencyOptions}
                          series={timelineConcurrentUsersandLatencySeries}
                          type="line"
                          height={450}
                        />
                      </MainCard>
                    </Grid>
                  </Grid>
                  <Divider />

                  <Grid container rowSpacing={3} columnSpacing={0}>
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
                        <Grid item />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                " "
              )}
            </Paper>
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default StudentWebClientPerformance;
