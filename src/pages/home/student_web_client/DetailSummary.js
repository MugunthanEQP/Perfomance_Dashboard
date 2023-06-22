import React, { useState, useEffect } from 'react'
import { Grid, Divider, Typography } from '@mui/material'
import AnalyticEcommerce from '../../../components/cards/statistics/AnalyticEcommerce'

const DetailSummary = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={1}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant='h5'>Details Summary</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title='Average Throughput'
          count='4,42,236'
          percentage={59.3}
          extra='Hits/s'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title='Average Response Time'
          count='78,250'
          percentage={70.5}
          extra='Milliseconds'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title='90% Response Time'
          count='18,800'
          percentage={27.4}
          isLoss
          // color='warning'
          extra='Milliseconds'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title='Error Rate'
          count='$35,078'
          percentage={27.4}
          isLoss
          // color='warning'
          extra='%'
        />
      </Grid>
    </Grid>
  )
}

export default DetailSummary
