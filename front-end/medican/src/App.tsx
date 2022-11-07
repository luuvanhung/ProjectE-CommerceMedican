import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { MainRoutes } from "./routes";


function App() {

    return (
            <BrowserRouter>
                {/* <MainLayout>
                <MainRoutes />
            </MainLayout> */}
                <MainRoutes />
            </BrowserRouter>
    );
}

export default App;
