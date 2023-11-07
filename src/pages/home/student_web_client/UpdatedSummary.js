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
} from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Chart from "react-apexcharts";
// material-ui
import { Grid, Divider, Typography, Stack, Breadcrumbs } from "@mui/material";
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
import DetailSummary from "./DetailSummary";
import { TailSpin } from "react-loader-spinner";
import AnalyticEcommerce from "../../../components/cards/statistics/AnalyticEcommerce";

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

  const StyledContainer = styled(Container)({
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  });
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
        // console.log({ jsonData }, "check");
        console.log(
          jsonData.lastTenTestRunDetail[0].testDetailFilePath,
          "check"
        );
        setSelectedOption(jsonData.lastTenTestRunDetail[0].testDetailFilePath);

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

  // console.log(
  //   Object.keys(getUsers).length > 0 ? getUsers.graph.avgResponse.value : [],
  //   "ssss"
  // );

  const [detailData, setDetailData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(selectedOption, "entered");

  useEffect(() => {
    setLoading(true);
    console.log(selectedOption, loading, "entered");

    const url =
      "https://load900108intstg.blob.core.windows.net/qadashboard/" +
      selectedOption +
      "?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        const jsonData = await response.json();
        setDetailData(jsonData);
        console.log(jsonData, "fetch check detail page");
      })
      .catch((error) => {
        // debugger;
        // return Promise.reject(error)
      });
    // .finally(() => setLoading(false));
  }, [selectedOption, loading]);

  console.log(selectedOption, "radio");

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
    // {
    //   name: 'Hits/S',
    //   data:
    //     Object.keys(detailData).length > 0
    //       ? detailData.graphData.concurrentUserByResponse.concurrentUsers
    //       : [],
    // },
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
            <StyledContainer
              maxWidth="xl"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <FormControl component="fieldset">
                <RadioGroup
                  name="radioGroup"
                  value={selectedOption}
                  onChange={handleRadioChange}
                >
                  {getUsers.lastTenTestRunDetail.map((row) => (
                    <FormControlLabel
                      // key={row.date}
                      value={row.testDetailFilePath}
                      control={<Radio />}
                      label={row.date}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {console.log(loading)}
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
              ) : detailData.length !== 0 ? (
                <>
                  <IconButton onClick={handleGoBack}>
                    <ArrowBack />
                  </IconButton>
                  <Divider variant="middle" style={{ margin: "10px 0" }} />

                  <Grid container rowSpacing={1} columnSpacing={0}>
                    <MainCard title="Meta Data">
                      <Stack spacing={0.5} sx={{ mt: -1.5 }}>
                        <Typography variant="h4">
                          User: {detailData.metadata.runByUser}
                        </Typography>
                        <Typography variant="h5">
                          Duration: {detailData.metadata.durationInMin}min
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
                    </MainCard>
                  </Grid>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sx={{ mb: -1 }}>
                      <Typography variant="h5">Details Summary</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.3}>
                      <AnalyticEcommerce
                        title="Average Throughput(Hits/s)"
                        count={detailData.summaryData.avgThroughput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.3}>
                      <AnalyticEcommerce
                        title="Average Response Time(Ms)"
                        count={detailData.summaryData.avgResponseTime}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.3}>
                      <AnalyticEcommerce
                        title="90% Response Time(Ms)"
                        count={
                          detailData.summaryData["90PercentileResponseTime"]
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.3}>
                      <AnalyticEcommerce
                        title="Error Rate(%)"
                        count={detailData.summaryData.errorsPercentage}
                        // color='warning'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2.3}>
                      <AnalyticEcommerce
                        title="Virtual Users"
                        count={detailData.summaryData.virtualUsers}
                        isLoss
                        // color='warning'
                      />
                    </Grid>
                  </Grid>
                  <Grid container rowSpacing={2} columnSpacing={0}>
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
                  <Grid rowSpacing={2} columnSpacing={0}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h5">
                          Top 5 Slowest Response(By Average Response Time)
                        </Typography>
                      </Grid>
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead text="Last Ten Test Run Details">
                            <TableRow>
                              <TableCell>Request</TableCell>
                              <TableCell align="right">#Samples</TableCell>
                              <TableCell align="right">Average Time</TableCell>
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
                  <Grid container rowSpacing={0} columnSpacing={0}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="h5">Top 5 Errors</Typography>
                      </Grid>
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead text="Last Ten Test Run Details">
                            <TableRow>
                              <TableCell>Response Code</TableCell>
                              <TableCell align="right">Message</TableCell>
                              <TableCell align="right">Count</TableCell>
                              <TableCell align="right">Url</TableCell>
                              {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {detailData.data.topErrors.map((row) => (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {row.responseCode}
                                </TableCell>
                                <TableCell align="right">
                                  {row.message}
                                </TableCell>
                                {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell
                                  align="right"
                                  style={{ wordBreak: "break-all" }}
                                >
                                  {row.url}
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
                " "
              )}

              <DetailSummary />
              <Box sx={{ display: "flex" }}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
              </Box>
            </StyledContainer>
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default StudentWebClientPerformance;
