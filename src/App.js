import React, { useEffect, useState, useRef } from "react";
import ListWrapper from "./components/lists/ListWrapper";
import axios from 'axios';
import Swal from 'sweetalert2';
import NotificationContainer from "./components/notifications/NotificationContainer";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Detailpage from "./screens/Detailpage";

export default function App() {


  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/">
              <Route index element={<Homepage />} />
              <Route path="list/:id" element={<Detailpage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}