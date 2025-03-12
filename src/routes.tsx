import { RouteObject } from "react-router-dom"
import Home from "./components/Home"
import Root from "./components/Root"
import Shop from "./components/Shop"
import Cart from "./components/Cart"

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
      {
        path: "shop",
        element: <Shop />,
      },
      { path: "cart", element: <Cart /> },
    ],
  },
]

export default routes
