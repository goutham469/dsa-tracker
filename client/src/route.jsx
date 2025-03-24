import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

export const router = createBrowserRouter([
    {
        path:'',
        element:<Landing/>
    },
    {
        path:'auth',
        element:<Login/>
    },
    {
        path:'admin-login',
        element:<AdminLogin/>
    },
    {
        path:'dashboard',
        element:<User/>
    },
    {
        path:'admin',
        element:<Admin/>
    },
    {
        path:'*',
        element:<h1 className="bg-red-600 h-[100vh] w-[100vw] text-3xl text-white text-center">You went out of the BOX!</h1>
    }
])