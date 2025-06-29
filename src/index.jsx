import React, { Suspense } from "react";
import {createRoot} from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import Loader from "./layouts/loader/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
);


