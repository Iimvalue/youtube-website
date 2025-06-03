import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import VideoPage from "../pages/VideoPage";
import Register from "../pages/Register";
import Login from "../pages/Login";


function Layout() {
  
  return (
    <>
    {/* <Navbar /> */}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/video/:id",
        element: <VideoPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
