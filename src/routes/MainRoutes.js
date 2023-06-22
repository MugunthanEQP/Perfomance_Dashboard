import { lazy } from 'react'

// project import
import Loadable from './../components/Loadable'
import MainLayout from './../layout/MainLayout'

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('./../pages/dashboard')))
const SamplePage = Loadable(
  lazy(() => import('./../pages/extra-pages/SamplePage'))
)

// render - sample page
const Home = Loadable(lazy(() => import('./../pages/home/Home')))
const SwcPerformance = Loadable(
  lazy(() =>
    import('./../pages/home/student_web_client/StudentWebClientPerformance')
  )
)

const DetailSummary = Loadable(
  lazy(() => import('./../pages/home/student_web_client/DetailSummary'))
)

// render - utilities
// const Typography = Loadable(
//   lazy(() => import('./../pages/components-overview/Typography'))
// )
// const Color = Loadable(
//   lazy(() => import('./../pages/components-overview/Color'))
// )
// const Shadow = Loadable(
//   lazy(() => import('./../pages/components-overview/Shadow'))
// )
// const AntIcons = Loadable(
//   lazy(() => import('./../pages/components-overview/AntIcons'))
// )

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'swcperformance',
      element: <SwcPerformance />,
    },

    {
      path: 'detailsummary',
      element: <DetailSummary />,
    },
    // {
    //   path: 'color',
    //   element: <Color />,
    // },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Home />,
        },
      ],
    },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />,
    // },
    // {
    //   path: 'shadow',
    //   element: <Shadow />,
    // },
    // {
    //   path: 'typography',
    //   element: <Typography />,
    // },
    // {
    //   path: 'icons/ant',
    //   element: <AntIcons />,
    // },
  ],
}

export default MainRoutes
