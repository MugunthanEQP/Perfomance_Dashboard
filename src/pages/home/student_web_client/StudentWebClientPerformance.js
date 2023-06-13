import React, { useState, useEffect } from 'react'

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
import Grid from '@mui/material/Grid'

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
  // else {
  //     // Internet Explorer
  //     var doc = new ActiveXObject('Microsoft.XMLDOM');
  //     doc.async = 'false';
  //     doc.loadXML(text);
  // }
  return doc
}

/** Sample Data format from XML Blob parsing **/
// const data = {
//   testplan: [
//     {
//       name: 'Dashboard Changes',
//       version: [
//         {
//           name: '23.1',
//           env: ['900059', '900108'],
//         },
//       ],
//     },
//     {
//       name: 'penn foster',
//       version: [
//         { name: '23.1', env: ['900059', '900108'] },
//         { name: '22.5', env: ['900059', '900108'] },
//       ],
//     },
//   ],
// }

const dropdown = {
  marginTop: '20vh',

  minWidth: '12em',
  position: 'relative',
  display: 'inline-block',
  marginRight: '1em',
  minHeight: '2em',
  maxHeight: '2em',
  overflow: 'hidden',
  top: '.5em',
  cursor: 'pointer',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  color: '#444',
  outline: 'none',
  border: '.06em solid transparent',
  borderRadius: '1em',
  // background-color: mix($color,#fff,25%);
}

export default function StudentWebClientPerformance() {
  const [selectedTestPlan, setSelectedTestPlan] = React.useState('')
  const [selectedVersions, setSelectedVersions] = React.useState('')
  const [selectedEnvs, setSelectedEnvs] = React.useState('')
  const [userData, setUserData] = React.useState([])
  // const [loading, setLoading] = useState(false)
  const [showComponent, setShowComponent] = useState(false)
  const [getusers, setUsers] = useState({})

  const handleClick = () => setShowComponent(true)
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
        console.log({ jsonData }, 'check')

        setUsers(jsonData)
        // console.log(loading);
        // setLoading(true)
        // return jsonData;
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
    if (selectedTestPlan && selectedVersions && selectedEnvs && getusers) {
      return (
        <button type='button' onClick={handleClick}>
          Show Data
        </button>
      )
    } else if (
      selectedTestPlan == setSelectedTestPlan &&
      selectedVersions == setSelectedVersions &&
      selectedEnvs == setSelectedEnvs
    ) {
      return (
        <button type='button' disabled>
          Show Data
        </button>
      )
    } else {
      return (
        <button type='button' disabled>
          Show Data
        </button>
      )
    }
  }
  console.log(getusers.lastTenTestRunDetail, 'showcomponent checks')

  const Zscore_chart = {
    labels: Object.keys(getusers).length > 0 ? getusers.graph.zScore.date : [],
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
          Object.keys(getusers).length > 0 ? getusers.graph.zScore.value : [],
      },
    ],
  }
  const avg_response_chart = {
    labels:
      Object.keys(getusers).length > 0 ? getusers.graph.avgResponse.date : [],
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
          Object.keys(getusers).length > 0
            ? getusers.graph.avgResponse.avg
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
    labels: Object.keys(getusers).length > 0 ? getusers.graph.appDex.date : [],
    datasets: [
      {
        label: 'Satisfied', //green
        data:
          Object.keys(getusers).length > 0
            ? getusers.graph.appDex.satisfied
            : [],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Tolerating', //yellow
        data:
          Object.keys(getusers).length > 0
            ? getusers.graph.appDex.tolerating
            : [],
        backgroundColor: 'rgb(255, 230, 120)',
      },
      {
        label: 'Frustrated', //red
        data:
          Object.keys(getusers).length > 0
            ? getusers.graph.appDex.frustrated
            : [],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  console.log(selectedTestPlan, 'ssss')
  const style_paper = {
    height: 150,
    width: 1250,
    textAlign: 'center',
    rounded: true,
    paddingTop: 65,
    backgroundColor: '#ffffff',
    opacity: 0.8,
    margin: 'auto',
  }

  return (
    <div>
      <h2>
        {' '}
        <center> Student Web Client - Performance Summary </center>{' '}
      </h2>
      {/* <Paper 
      style={style_paper}
      > */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '0px 5px',
          position: 'relative',

          // padding: '20px',
        }}
      >
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <label>
            {' '}
            TestPlan
            <select
              placeholder='TestPlan'
              style={{ dropdown }}
              // style={{
              //   textAlign: 'center',
              //   display: 'grid',
              //   placeItems: 'center',
              //   fontFamily: 'Arial, Helvetica',
              // }}
              value={selectedTestPlan}
              onChange={(e) => (
                setSelectedTestPlan(e.target.value), setShowComponent(false)
              )}
            >
              <option>Choose Testplan</option>
              {fullResult.testplan.map((value, key) => {
                return (
                  <option value={value.name} key={key}>
                    {value.name}
                  </option>
                )
              })}
            </select>
          </label>
        </div>
        <br />
        <div
        // style={{
        //   height: '70px',
        //   width: '200px',
        //   display: 'inline-block',
        //   padding: '0px 4px',
        // }}
        >
          Versions
          <select
            placeholder='Version'
            value={selectedVersions}
            style={{
              marginTop: '20px',
            }}
            //   display: 'grid',
            //   placeItems: 'center',
            //   fontFamily: 'Arial, Helvetica',
            // }}
            onChange={(e) => (
              setSelectedVersions(e.target.value), setShowComponent(false)
            )}
          >
            <option>Choose Version</option>
            {availableVersions?.versions.map((e, key) => {
              return (
                <option value={e.name} key={key}>
                  {e.name}
                </option>
              )
            })}
          </select>
        </div>
        <div
        // style={{
        //   height: '70px',
        //   width: '200px',
        //   display: 'inline-block',
        //   padding: '0px 4px',
        // }}
        >
          Environments
          <select
            placeholder='Envs'
            style={{
              marginTop: '20px',
            }}
            //   display: 'grid',
            //   placeItems: 'center',
            //   fontFamily: 'Arial, Helvetica',
            // }}
            value={selectedEnvs}
            onChange={(e) => (
              setSelectedEnvs(e.target.value), setShowComponent(false)
            )}
          >
            <option>Choose Envs</option>
            {availableEnvs?.environment.map((e, key) => {
              return (
                <option value={e.name} key={key}>
                  {e}
                </option>
              )
            })}
          </select>
        </div>
        <div
          style={{
            marginTop: '20px',
          }}
          //   display: 'grid',
          //   placeItems: 'center',
          //   fontFamily: 'Arial, Helvetica',
          // }}
        >
          <SubmitButton />
        </div>
      </div>
      {/* </Paper> */}
      {selectedTestPlan && selectedVersions && selectedEnvs && getusers ? (
        <p>
          {' '}
          Selected Test Results : {selectedTestPlan}/{selectedVersions}/
          {selectedEnvs}{' '}
        </p>
      ) : (
        ''
      )}
      {showComponent ? (
        <>
          <div
            style={{
              height: '250px',
              width: '450px',
              margin: 0,
              display: 'flex',
            }}
          >
            <Line option={Line_options_zscore} data={Zscore_chart} />
            <Line
              option={Line_options_avg_response}
              data={avg_response_chart}
            />
            <Bar options={bar_options} data={bar_data} />
          </div>
          <div>
            <h3> Last 5 Performance Test Run Details </h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label='simple table'>
                <TableHead text='Last Ten Test Run Details'>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align='right'>Average Response Time</TableCell>
                    <TableCell align='right'>
                      90 Percentile response time
                    </TableCell>
                    <TableCell align='right'>Virtual Users</TableCell>
                    <TableCell align='right'>Error Percentage</TableCell>
                    {/* <TableCell align='right'>Test Detail File Path</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getusers.lastTenTestRunDetail.map((row) => (
                    <TableRow>
                      <TableCell component='th' scope='row'>
                        {row.date}
                      </TableCell>
                      <TableCell align='right'>{row.avgResponseTime}</TableCell>
                      {/* <TableCell align="right">{row.90PercentileResponseTime}</TableCell> */}
                      <TableCell align='right'>
                        {row['90PercentileResponseTime']}
                      </TableCell>
                      <TableCell align='right'>{row.virtualUsers}</TableCell>

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
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
