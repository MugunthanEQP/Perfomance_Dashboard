import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { Grid, Divider, Typography, Stack, Breadcrumbs } from "@mui/material";
import Box from "@mui/material/Box";

import Chart from "react-apexcharts";
import MainCard from "./../../../components/MainCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TailSpin } from "react-loader-spinner";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import AnalyticEcommerce from "../../../components/cards/statistics/AnalyticEcommerce";
import { wrap } from "lodash";

const DetailSummary = () => {
  const [detailData, setDetailData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/swcperformance");
  };

  useEffect(() => {
    setLoading(true);
    // fetchDetailData(state)
    const url =
      "https://load900108intstg.blob.core.windows.net/qadashboard/" +
      state +
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
        console.log(loading, jsonData, url);
      })
      .catch((error) => {
        // debugger;
        // return Promise.reject(error)
      })
      .finally(() => setLoading(false));
  }, []);

  // console.log(detailData, 'ksksksk')

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
  return (
    <>
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
                count={detailData.summaryData["90PercentileResponseTime"]}
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
            {/* <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item>
                <Typography variant='h3'>Timeline Graphs</Typography>
                <Typography variant='h5'>
                  Concurrent Users and Hits/s
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Chart
                options={timelineConcurrentUsersandHitsOptions}
                series={timelineConcurrentUsersandHitsSeries}
                type='line'
                height={350}
              />
            </MainCard>
          </Grid> */}
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
            <Grid container alignItems="center" justifyContent="space-between">
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
                        <TableCell align="right">{row.noOfSamples}</TableCell>
                        {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                        <TableCell align="right">
                          {row.avgResponseTime}
                        </TableCell>
                        <TableCell align="right">
                          {row["90PercentileResponseTime"]}
                        </TableCell>

                        <TableCell align="right">{row.MaxTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Grid>
          <Grid container rowSpacing={0} columnSpacing={0}>
            <Grid container alignItems="center" justifyContent="space-between">
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
                        <TableCell align="right">{row.message}</TableCell>
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
    </>
  );
};

export default DetailSummary;
