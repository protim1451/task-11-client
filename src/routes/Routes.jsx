import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../pages/AllBooks/AllBooks";
import MyAddedBooks from "../pages/AllBooks/MyAddedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: 'addbooks',
        element: <PrivateRoute>
          <AddBook></AddBook>
        </PrivateRoute>,
      },
      {
        path: '/allbooks',
        element: <AllBooks></AllBooks>,
      },
      {
        path: '/myaddedbooks',
        element: <PrivateRoute>
          <MyAddedBooks></MyAddedBooks>
        </PrivateRoute>,
      },
    ],
  },
]);

export default router;