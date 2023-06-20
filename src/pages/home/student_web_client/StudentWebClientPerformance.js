import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
// material-ui
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material'

import MainCard from './../../../components/MainCard'


import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function parseXML(text) {
  if (window.DOMParser) {
    var parser = new DOMParser()
    var doc = parser.parseFromString(text, 'text/xml')
  }
  return doc
}

const StudentWebClientPerformance = () => {
  const [selectedTestPlan, setSelectedTestPlan] = React.useState('')
  const [selectedVersions, setSelectedVersions] = React.useState('')
  const [selectedEnvs, setSelectedEnvs] = React.useState('')
  const [userData, setUserData] = React.useState([])
  const [showComponent, setShowComponent] = useState(false)
  const [getUsers, setUsers] = useState({})

  const handleClick = () => {
    setShowComponent(true)
  }
  // const disableHandleClick = () => setShowComponent(false) //hides component if shown, reveals if not shown

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch(
      'https://load900108intstg.blob.core.windows.net/qadashboard?restype=container&comp=list&sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'
    )
      .then((response) => response.text())
      .then((data) => {
        const currentObj = data
        var xml = parseXML(currentObj)
        var longitudes = xml.getElementsByTagName('Name')
        var result = []

        for (var i = 0; i < longitudes.length; i++) {
          // add longitude value to "result" array
          result.push(longitudes[i].childNodes[0].nodeValue)
        }
        var final_array = result.filter((element) =>
          element.includes('PerformanceSummary.json')
        )
        const matches = final_array.filter((s) =>
          s.includes('student web client')
        )
        // console.log(matches, 'get');

        if (matches) {
          setUserData(matches)
        }
      })
      .catch((err) => console.log(err))

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  function fetchData() {
    const url =
      'https://load900108intstg.blob.core.windows.net/qadashboard/performance/student web client/' +
      selectedTestPlan +
      '/' +
      selectedVersions +
      '/' +
      selectedEnvs +
      '/PerformanceSummary.json?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(async (response) => {
        // debugger;
        const jsonData = await response.json()
        // debugger;
        // console.log({ jsonData }, 'check')

        setUsers(jsonData)
        // console.log(loading);
      })
      .catch((error) => {
        // debugger;
        setShowComponent(false)
        // return Promise.reject(error)
      })
  }

  useEffect(() => {
    if (selectedTestPlan && selectedEnvs && selectedVersions) {
      return fetchData()
    } else {
      return () => {}
    }
  }, [selectedTestPlan, selectedVersions, selectedEnvs])

  var productJson = []

  userData.forEach((item) => {
    const values = item.split('/')
    var testPlan = productJson.find((v) => v.name.includes(values[2]))
    if (testPlan) {
      //version
      var version = testPlan.versions.find((v) => v.name.includes(values[3]))
      if (version) {
        //enviornment
        var environment = version.environment.find((v) => v.includes(values[4]))
        if (!environment) {
          version.environment.push(values[4])
        }
      } else {
        testPlan.versions.push({
          name: values[3],
          environment: [values[4]],
        })
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
      }
      productJson.push(obj)
    }
  })

  var fullResult = { testplan: productJson }
  const availableVersions = fullResult.testplan.find(
    (c) => c.name === selectedTestPlan
  )
  const availableEnvs = availableVersions?.versions?.find(
    (s) => s.name === selectedVersions
  )

  function SubmitButton() {
    if (selectedTestPlan && selectedVersions && selectedEnvs && getUsers) {
      setTimeout(2000)
      return (
        <Button
          style={{ width: 120 }}
          variant='contained'
          type='button'
          onClick={handleClick}
        >
          Show Data
        </Button>
      )
    } else if (
      selectedTestPlan == setSelectedTestPlan &&
      selectedVersions == setSelectedVersions &&
      selectedEnvs == setSelectedEnvs
    ) {
      return (
        <Button
          variant='contained'
          style={{ width: 120 }}
          type='button'
          onClick={handleClick}
          disabled
        >
          Show Data
        </Button>
      )
    } else {
      return (
        <Button
          variant='contained'
          style={{ width: 120 }}
          type='button'
          onClick={handleClick}
          disabled
        >
          Show Data
        </Button>
      )
    }
  }
  // console.log(getUsers.lastTenTestRunDetail, 'showcomponent checks')

  const Zscore_chart = {
    labels: Object.keys(getUsers).length > 0 ? getUsers.graph.zScore.date : [],
    title: 'Zscore',
    datasets: [
      {
        label: 'Zscore Results',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data:
          Object.keys(getUsers).length > 0 ? getUsers.graph.zScore.value : [],
      },
    ],
  }
  const avg_response_chart = {
    labels:
      Object.keys(getUsers).length > 0 ? getUsers.graph.avgResponse.date : [],
    datasets: [
      {
        label: 'Average Response',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data:
          Object.keys(getUsers).length > 0
            ? getUsers.graph.avgResponse.avg
            : [],
      },
    ],
  }

  const Line_options_zscore = {
    plugins: {
      title: {
        display: true,
        text: 'Zscore',
      },
    },
    responsive: true,
  }

  const Line_options_avg_response = {
    plugins: {
      title: {
        display: true,
        text: 'Average Response',
      },
    },
    responsive: true,
  }
  const bar_options = {
    plugins: {
      title: {
        display: true,
        text: 'App dex',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }
  const bar_data = {
    labels: Object.keys(getUsers).length > 0 ? getUsers.graph.appDex.date : [],
    datasets: [
      {
        label: 'Satisfied', //green
        data:
          Object.keys(getUsers).length > 0
            ? getUsers.graph.appDex.satisfied
            : [],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Tolerating', //yellow
        data:
          Object.keys(getUsers).length > 0
            ? getUsers.graph.appDex.tolerating
            : [],
        backgroundColor: 'rgb(255, 230, 120)',
      },
      {
        label: 'Frustrated', //red
        data:
          Object.keys(getUsers).length > 0
            ? getUsers.graph.appDex.frustrated
            : [],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  // console.log(selectedTestPlan, 'ssss')

  return (
    <Grid>
      <Grid container rowSpacing={4.5} columnSpacing={1}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant='h5'>Search Query</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={3}>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>TestPlan</InputLabel>

            <Select
              value={selectedTestPlan}
              style={{ width: 180 }}
              placeholder='TestPlan'
              onChange={(e) => (
                setSelectedTestPlan(e.target.value), setShowComponent(false)
              )}
            >
              {fullResult.testplan.map((value, key) => {
                return (
                  <MenuItem value={value.name} key={key}>
                    {value.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Version</InputLabel>

            <Select
              placeholder='Version'
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
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Environment</InputLabel>

            <Select
              placeholder='Envs'
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
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <SubmitButton />
        </Grid>
      </Grid>
      <Divider style={{ gap: 15 }} />

      <Grid container rowSpacing={4.5} columnSpacing={1}>
        {/* row 2 */}
        {selectedTestPlan && selectedVersions && selectedEnvs && getUsers ? (
          <Grid item xs={12}>
            <Typography variant='h6'>
              Selected Test Results : {selectedTestPlan}/{selectedVersions}/
              {selectedEnvs}
            </Typography>
          </Grid>
        ) : (
          ''
        )}
        {showComponent ? (
          <>
            <Divider />

            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>Zscore Result</Typography>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <Line option={Line_options_zscore} data={Zscore_chart} />

                  {/* <IncomeAreaChart slot={slot} /> */}
                </Box>
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>Average Response</Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                {/* <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant='h6' color='textSecondary'>
                This Week Statistics
              </Typography>
              <Typography variant='h3'>$7,650</Typography>
            </Stack>
          </Box> */}
                <Line
                  option={Line_options_avg_response}
                  data={avg_response_chart}
                />{' '}
              </MainCard>
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>Appdex</Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <Bar options={bar_options} data={bar_data} />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={8}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>
                    Last 5 Performance Test Run Details{' '}
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <TableContainer component={Paper}>
                  <Table aria-label='simple table'>
                    <TableHead text='Last Ten Test Run Details'>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align='right'>
                          Average Response Time
                        </TableCell>
                        <TableCell align='right'>
                          90 Percentile response time
                        </TableCell>
                        <TableCell align='right'>Virtual Users</TableCell>
                        <TableCell align='right'>Error Percentage</TableCell>
                        {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getUsers.lastTenTestRunDetail.map((row) => (
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            {row.date}
                          </TableCell>
                          <TableCell align='right'>
                            {row.avgResponseTime}
                          </TableCell>
                          {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                          <TableCell align='right'>
                            {row['90PercentileResponseTime']}
                          </TableCell>
                          <TableCell align='right'>
                            {row.virtualUsers}
                          </TableCell>

                          <TableCell align='right'>
                            {row.errorsPercentage}
                          </TableCell>
                          {/* <TableCell align='right'>
                        {row.testDetailFilePath}
                      </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>
          </>
        ) : (
          ''
        )}

        {/* row 4 */}
      </Grid>
    </Grid>
  )
}

export default StudentWebClientPerformance