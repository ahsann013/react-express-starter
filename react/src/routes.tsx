import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Test from "./pages/test";
const router = createBrowserRouter([
    {
        path: "/test",
        element: <Test/>
    },
    {
    path: "/",
    element: <h1>Home</h1>
    },
    {
        path: "/login",
        element: <Login/>
    }
])



const AppRouter = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default AppRouter;
