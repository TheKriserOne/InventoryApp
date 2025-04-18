import {BrowserRouter} from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import React from "react";

const App = () => {
    return <BrowserRouter><ThemeRoutes/></BrowserRouter>;
};

export default App;
