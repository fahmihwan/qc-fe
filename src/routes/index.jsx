import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Gempa from "../view/bencana/Gempa";
import AllCategories from "../view/foodEstate/AllCategories";
import Login from "../view/auth/Login";
import { ProtectedRouteAuthenticated, ProtectedRouteGuest } from "./ProtectedRoute";
import AllBencanaCategories from "../view/bencana/AllBencanaCategories";
import EachCategoryFoodEstate from "../view/foodEstate/EachCategoryFoodEstate";
import SurveyComponent from "../view/component/listSurvey/SurveyComponent";
import PageSurvey from "../view/survey/PageSurvey";
import SurveyDashboard from "../view/survey/SurveyDashboard";
import PerumahanRakyat from "../view/perumahanRakyat/PerumahanRakyat";
import GenerateSurvey from "../view/survey/GenerateSurvey";

const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouteGuest element={<Login />} />
    },
    {
        path: '/survey-masyarakat',
        element: <PageSurvey />

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
    },
    {
        path: "/survey",
        element: <ProtectedRouteAuthenticated element={<SurveyDashboard />} />
    },
    {
        path: "/generate-survey",
        element: <ProtectedRouteAuthenticated element={<GenerateSurvey />} />
    },
    {
        path: "/perumahan-rakyat",
        element: <ProtectedRouteAuthenticated element={<PerumahanRakyat />} />
    },



])
export default routes