import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

import "../src/fonts/RNS Sans/RNSSanz-Normal.woff";
import "../src/fonts/RNS Sans/RNSSanz-Normal.woff2";
import "../src/fonts/RNS Sans/RNSSanz-Light.woff";
import "../src/fonts/RNS Sans/RNSSanz-Light.woff2";
import "../src/fonts/RNS Sans/RNSSanz-Bold.woff";
import "../src/fonts/RNS Sans/RNSSanz-Bold.woff2";
import "./index.scss";

import App from "./App";

Amplify.configure(awsconfig);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
