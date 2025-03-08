import { RouteObject } from "react-router-dom"
import Home from "./components/Home"
import Root from "./components/Root"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Page not found.</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]

export default routes
