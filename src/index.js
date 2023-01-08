import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MemberArea from "./pages/MemberArea";
import ClimateInfo from "./pages/ClimateInfo";
import Solution from "./pages/Solution";
import Cop27 from "./pages/Cop27";
import Foundation from "./pages/Foundation";
import Privacy from "./pages/Privacy";
import EndingMembership from "./pages/EndingMembership";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import './index.scss';

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="memberArea" element={<MemberArea />} />
                    <Route path="climateInfo" element={<ClimateInfo />} />
                    <Route path="solution" element={<Solution />} />
                    <Route path="cop27" element={<Cop27 />} />
                    <Route path="foundation" element={<Foundation />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="endingMembership" element={<EndingMembership />} />
                    <Route path="contact" element={<Contact />} />
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
