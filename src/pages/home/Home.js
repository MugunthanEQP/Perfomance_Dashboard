// material-ui
import {
  Divider,
  Grid,
  Box,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

// project import
import ComponentSkeleton from "./../components-overview/ComponentSkeleton";
import MainCard from "./../../components/MainCard";

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Home = () => (
  <ComponentSkeleton>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Stack spacing={3} direction="row">
          <MainCard title="Operations">
            <Stack spacing={3}>
              <Typography variant="h5">Student Web Client</Typography>

              <Stack
                direction="row"
                spacing={3}
                display="flex"
                flex={1}
                // justifyContent='center'
                justifyItems={"center"}
                alignItems="center"
                flexWrap="wrap"
              >
                {/* <Button variant='contained' href='/swcperformance'>
                  Performance
                </Button>
                <Button variant='contained'>UnitTest</Button>
                <Button variant='contained'>Sonarqube</Button> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      href="/swcperformance"
                      fullWidth
                    >
                      {window.innerWidth < 600 ? " Perf" : " Performance"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      UnitTest
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      Sonarqube
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
              <Divider />

              <Typography variant="h5">Student Portal</Typography>
              <Stack
                direction="row"
                spacing={3}
                display="flex"
                flex={1}
                // justifyContent='center'
                justifyItems={"center"}
                alignItems="center"
                flexWrap="wrap"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      Performance
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      UnitTest
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      Sonarqube
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
              <Divider />

              <Typography variant="h5">FAA</Typography>
              <Stack
                direction="row"
                spacing={3}
                display="flex"
                flex={1}
                // justifyContent='center'
                justifyItems={"center"}
                alignItems="center"
                flexWrap="wrap"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      Performance
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      UnitTest
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      disableElevation
                    >
                      Sonarqube
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
              <Divider />
            </Stack>
          </MainCard>
          <MainCard title="Engagement">
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 428,
                    height: 400,
                  },
                }}
              >
                <Paper />
              </Box>
            </Stack>
          </MainCard>
        </Stack>
      </Grid>
    </Grid>
  </ComponentSkeleton>
);

export default Home;
