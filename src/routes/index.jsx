import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Padi from "../view/foodEstate/Padi";
import Gempa from "../view/bencana/Gempa";
const Dashboard = lazy(() => import("../view/dashboard/Dashboard"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/padi",
        element: <Padi />
    },
    {
        path: "/gempa",
        element: <Gempa />
    },

])
export default routes