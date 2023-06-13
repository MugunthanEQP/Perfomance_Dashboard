// material-ui
import * as React from 'react';

// project import
import { Card, Grid, Divider, Typography, Box, Container, Button, Stack, styled, Paper } from '@mui/material';
import { CardHeader } from 'semantic-ui-react';

const SamplePage = () => (
    <Stack direction="row" spacing={4} display="flex" justify-content="center" alignItems="center">
        <Card style={{ width: '30%', height: '90%' }}>
            <CardHeader>
                <h3>
                    <center>Operations</center>
                </h3>
            </CardHeader>
            <Divider variant="middle" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: 10 }}>
                <Box sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                    <Box sx={{ my: 3, mx: 3 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    Student Web Client
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Can add data
                                    </Typography>
                                </Grid> */}
                        </Grid>
                        {/* <Typography color="text.secondary" variant="body2">
                                Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the hall.
                            </Typography> */}
                    </Box>
                    <Box sx={{ m: 2 }}>
                        {/* <Typography gutterBottom variant="body1">
                                Select type
                            </Typography> */}
                        <Stack direction="row" spacing={4} display="flex" justify-content="center" alignItems="center">
                            <Button variant="contained" href="/swcperformance">
                                Performance
                            </Button>
                            <Button variant="contained">Unit Test</Button>
                            <Button variant="contained" href="#contained-buttons">
                                Sonarqube
                            </Button>
                        </Stack>
                    </Box>
                    {/* <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                            <Button>Add to cart</Button>
                        </Box> */}
                </Box>
            </div>
            <Divider variant="middle" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: 10 }}>
                <Box sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                    <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    Student Portal
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Can add data
                                    </Typography>
                                </Grid> */}
                        </Grid>
                        {/* <Typography color="text.secondary" variant="body2">
                                Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the hall.
                            </Typography> */}
                    </Box>
                    <Box sx={{ m: 2 }}>
                        {/* <Typography gutterBottom variant="body1">
                                Select type
                            </Typography> */}
                        <Stack direction="row" spacing={4} display="flex" justify-content="center">
                            <Button variant="contained">Performance</Button>
                            <Button variant="contained">Unit Test</Button>
                            <Button variant="contained" href="#contained-buttons">
                                Sonarqube
                            </Button>
                        </Stack>
                    </Box>
                    {/* <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                            <Button>Add to cart</Button>
                        </Box> */}
                </Box>
            </div>
            <Divider variant="middle" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: 10 }}>
                <Box sx={{ width: '100%', maxWidth: '120%', bgcolor: 'background.paper' }}>
                    <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" component="div">
                                    FAA
                                </Typography>
                            </Grid>
                            {/* <Grid item>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Can add data
                                    </Typography>
                                </Grid> */}
                        </Grid>
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Stack direction="row" spacing={4} display="flex" justify-content="center">
                            <Button variant="contained">Performance</Button>
                            <Button variant="contained">Unit Test</Button>
                            <Button variant="contained" href="#contained-buttons">
                                Sonarqube
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </div>
        </Card>
        <Card style={{ width: '30%', height: '90%' }}>
            <CardHeader>
                <h3>
                    <center>Engagement</center>
                </h3>
            </CardHeader>
            <Divider variant="middle" />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 428,
                        height: 400
                    }
                }}
            >
                <Paper />
            </Box>
        </Card>
    </Stack>
);

export default SamplePage;
