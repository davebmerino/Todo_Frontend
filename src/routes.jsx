// import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { paths } from "./paths";

import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import AppShell from "./components/layout/AppShell.jsx";
import AllTasksPage from "./features/task/pages/AllTasksPage.jsx";
import SearchPage from "./features/task/pages/SeachPage.jsx";
import PrivateRoutes from "./components/privateroutes/PrivateRoutes.jsx";
import ProfilePage from "./features/profile/pages/ProfilePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./features/profile/pages/Settings.jsx";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <Login />,
  },
  {
    path: paths.signup,
    element: <Signup />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: paths.dashboard,
            element: <DashboardPage />,
          },
          {
            path: paths.tasks,
            element: <AllTasksPage />,
          },
          {
            path: paths.search,
            element: <SearchPage />,
          },
          {
            path: paths.profile,
            element: <ProfilePage />,
          },
          {
            path: paths.settings,
            element: <Settings />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
