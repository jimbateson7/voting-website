import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";


import NoPage from "./pages/NoPage";
import MemberArea from "./pages/MemberArea";

Amplify.configure(awsconfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="MemberArea" element={<MemberArea />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
