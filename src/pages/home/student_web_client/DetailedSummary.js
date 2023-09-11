import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid, Divider, Typography, Stack, Breadcrumbs } from '@mui/material'
import Box from '@mui/material/Box'

import Chart from 'react-apexcharts'
import MainCard from './../../../components/MainCard'
import { TailSpin } from 'react-loader-spinner'

import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce'

const DetailedSummary = () => {
  const [detailData, setDetailData] = React.useState([])
  const [loading, setLoading] = useState(false)
  const { state } = useLocation()
  console.log(state)

  function fetchDetailData(path) {
    // const url =
    //   'https://load900108intstg.blob.core.windows.net/qadashboard/performance/student web client/' +
    //   selectedTestPlan +
    //   '/' +
    //   selectedVersions +
    //   '/' +
    //   selectedEnvs +
    //   '/PerformanceSummary.json?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'

    const url =
      'https://load900108intstg.blob.core.windows.net/qadashboard/' +
      path +
      '?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'
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

        setDetailData(jsonData)
        // console.log(loading);
      })
      .catch((error) => {
        // debugger;
        return Promise.reject(error)
      })
      .finally(() => setLoading(false))
    // return fetch
  }

  useEffect(() => {
    setLoading(true)
    // fetchDetailData(state)
    const url =
      'https://load900108intstg.blob.core.windows.net/qadashboard/' +
      state +
      '?sp=racwdli&st=2023-01-11T10:58:00Z&se=2023-12-30T18:58:00Z&spr=https&sv=2021-06-08&sr=c&sig=GTZDo4GuuXM4HsP8Tt6l%2FX%2FUgKh0P5GOPa%2Fqhe3NX%2Fo%3D'
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(async (response) => {
        const jsonData = await response.json()
        setDetailData(jsonData)
        // console.log(loading);
      })
      .catch((error) => {
        // debugger;
        // return Promise.reject(error)
      })
      .finally(() => setLoading(false))
  }, [])

  // console.log(detailData, 'ksksksk')

  const slowResponseOptions = {
    chart: {
      height: 250,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'date',
      categories: [
        '12.12.2009',
        '13.12.2009',
        '14.12.2009',
        '15.12.2009',
        '16.12.2009',
      ],
    },
    tooltip: {
      x: {
        format: 'MM/dd/yy',
      },
    },
  }

  const slowResponseSeries = [
    {
      name: 'Zscore>1',
      data: [2, 3, 9, 6, 0],
    },
  ]
  return (
    <>
      {loading ? (
        <Grid>
          <div className='loader'>
            <TailSpin
              type='Bars'
              color='#00BFFF'
              height={50}
              width={100}
              timeout={2000} //1 secs
            />
          </div>
        </Grid>
      ) : detailData.metadata != undefined ? (
        <>
          <Grid container rowSpacing={4.5} columnSpacing={0.8}>
            <div></div>
            <MainCard title='Meta Data'>
              <Stack spacing={0.75} sx={{ mt: -1.5 }}>
                <Typography variant='h4'>
                  User: {detailData.metadata.runByUser}
                </Typography>
                <Typography variant='h5'>
                  Duration: {detailData.metadata.durationInMin}min
                </Typography>
                <Breadcrumbs aria-label='breadcrumb'>
                  <Typography variant='h6'>
                    Start Time: {detailData.metadata.startTime}
                  </Typography>
                  <Typography variant='h6'>
                    End Time: {detailData.metadata.endTime}
                  </Typography>{' '}
                </Breadcrumbs>
              </Stack>
            </MainCard>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
              <Typography variant='h5'>Details Summary</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.3}>
              <AnalyticEcommerce
                title='Average Throughput'
                count='4,42,236'
                extra='Hits/s'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.3}>
              <AnalyticEcommerce
                title='Average Response Time'
                count='78,250'
                extra='Milliseconds'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.3}>
              <AnalyticEcommerce
                title='90% Response Time'
                count='18,800'
                isLoss
                // color='warning'
                extra='Milliseconds'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.3}>
              <AnalyticEcommerce
                title='Error Rate'
                count='$35,078'
                isLoss
                // color='warning'
                extra='%'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.3}>
              <AnalyticEcommerce
                title='Virtual Users'
                count='$35,078'
                isLoss
                // color='warning'
                extra='%'
              />
            </Grid>
          </Grid>
          <Grid>
            <Grid container rowSpacing={0} columnSpacing={1}>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>Top 5 Slowest Response</Typography>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <Chart
                    options={slowResponseOptions}
                    series={slowResponseSeries}
                    type='area'
                    height={250}
                  />
                </Box>
              </MainCard>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Typography variant='h5'>Top 5 Errors</Typography>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <Chart
                    options={slowResponseOptions}
                    series={slowResponseSeries}
                    type='area'
                    height={350}
                  />
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </>
      ) : (
        ' '
      )}
    </>
  )
}

export default DetailedSummary
