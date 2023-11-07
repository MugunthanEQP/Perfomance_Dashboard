import { lazy } from "react";
import Loadable from "./../components/Loadable";
import MainLayout from "./../layout/MainLayout";

const Home = Loadable(lazy(() => import("./../pages/home/Home")));
const SwcPerformance = Loadable(
  lazy(() =>
    import("./../pages/home/student_web_client/StudentWebClientPerformance")
  )
);
const DetailSummary = Loadable(
  lazy(() => import("./../pages/home/student_web_client/DetailSummary"))
);

const UpdatedSummary = Loadable(
  lazy(() => import("./../pages/home/student_web_client/UpdatedSummary"))
);

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "swcperformance",
      element: <SwcPerformance />,
    },
    {
      path: "detailsummary",
      element: <DetailSummary />,
    },
    {
      path: "updatedsummary",
      element: <UpdatedSummary />,
    },
  ],
};

export default MainRoutes;
