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
import QRcode from "../view/survey/QRcode";
import PerumahanRakyat from "../view/perumahanRakyat/PerumahanRakyat";
import GenerateSurvey from "../view/survey/GenerateSurvey";
import LayoutAdmin from "../view/layout/LayoutAdmin";
import DashboardSurvey from "../view/survey/DashboardSurvey";
import DetailDashboardSurvey from "../view/survey/DetailDashboardSurvey";
import NotFoundPage from "../view/notFound/NotFoundPage";
import OtherDashboardSurvey from "../view/survey/OtherDashboardSurvey";

const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRouteGuest element={<Login />} />
    },
    {
        path: '/survey-masyarakat/:kodeqr',
        element: <PageSurvey />
    },
    {
        element: <ProtectedRouteAuthenticated element={<LayoutAdmin />} />, // LayoutAdmin sebagai wrapper utama
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/gempa", element: <Gempa /> },
            { path: "/all-food-estate", element: <AllCategories /> },
            { path: "/padi", element: <EachCategoryFoodEstate category="Padi" /> },
            { path: "/jagung", element: <EachCategoryFoodEstate category="Jagung" /> },
            { path: "/singkong", element: <EachCategoryFoodEstate category="Singkong" /> },
            { path: "/kedelai", element: <EachCategoryFoodEstate category="Kedelai" /> },
            { path: "/tebu", element: <EachCategoryFoodEstate category="Tebu" /> },
            { path: "/all-bencana", element: <AllBencanaCategories /> },
            { path: "/qrcode", element: <QRcode /> },
            { path: "/data-hasil-survey", element: <SurveyDashboard /> },
            { path: "/dashboard-hasil-survey", element: <DashboardSurvey /> },
            { path: "/dashboard-hasil-survey/:detail", element: <DetailDashboardSurvey /> },
            { path: "/generate-survey", element: <GenerateSurvey /> },
            { path: "/perumahan-rakyat", element: <PerumahanRakyat /> },
            { path: "/other-dashboard-survey", element: <OtherDashboardSurvey /> }
        ]
    },
    {
        path: '*',
        element: <ProtectedRouteAuthenticated element={<NotFoundPage />} />
    }
]);

export default routes