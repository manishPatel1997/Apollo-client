import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import MainPage from "./MainPage";
import PoolingNoLoader from "./PoolingNoLoader";
import RefreshLoader from "./RefreshLoader";
import UseLazyQueryCop from "./UseLazyQueryCop";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<MainPage />} />
            <Route path="/poolingNoLoader" element={<PoolingNoLoader />} />
            <Route path="/refreshLoader" element={<RefreshLoader />} />
            <Route path="/useLazyQueryCop" element={<UseLazyQueryCop />} />
        </Route>
    )
);
function RouteMain() {
    return <RouterProvider router={router} />;
}

export default RouteMain;
