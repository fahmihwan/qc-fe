import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Gempa from "../view/bencana/Gempa";
import AllCategories from "../view/foodEstate/AllCategories";
import Login from "../view/auth/Login";
import { ProtectedRouteAuthenticated, ProtectedRouteGuest } from "./ProtectedRoute";
import AllBencanaCategories from "../view/bencana/AllBencanaCategories";
import EachCategoryFoodEstate from "../view/foodEstate/EachCategoryFoodEstate";

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
        path: "/gempa",
        element: <ProtectedRouteAuthenticated element={<Gempa />} />
    },

    {
        path: "/all-food-estate",
        element: <ProtectedRouteAuthenticated element={<AllCategories />} />
    },
    {
        path: "/padi",
        element: <ProtectedRouteAuthenticated element={<EachCategoryFoodEstate category={"Padi"} />} />
    },
    {
        path: "/jagung",
        element: <ProtectedRouteAuthenticated element={<EachCategoryFoodEstate category={"Jagung"} />} />
    },
    {
        path: "/singkong",
        element: <ProtectedRouteAuthenticated element={<EachCategoryFoodEstate category={"Singkong"} />} />
    },
    {
        path: "/kedelai",
        element: <ProtectedRouteAuthenticated element={<EachCategoryFoodEstate category={"Kedelai"} />} />
    },
    {
        path: "/tebu",
        element: <ProtectedRouteAuthenticated element={<EachCategoryFoodEstate category={"Tebu"} />} />
    },

    {
        path: "/all-bencana",
        element: <ProtectedRouteAuthenticated element={<AllBencanaCategories />} />
    }

])
export default routes