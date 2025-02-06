import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Padi from "../view/foodEstate/Padi";
import Gempa from "../view/bencana/Gempa";
import Login from "../view/auth/Login";
import { ProtectedRouteAuthenticated, ProtectedRouteGuest } from "./ProtectedRoute";

const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouteGuest element={<Login />} />
    },
    {
        path: "/dashboard",
        element: <ProtectedRouteAuthenticated element={<Dashboard />} />
    },
    {
        path: "/padi",
        element: <ProtectedRouteAuthenticated element={<Padi />} />
    },
    {
        path: "/gempa",
        element: <ProtectedRouteAuthenticated element={<Gempa />} />
    },

])
export default routes