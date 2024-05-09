import React from "react";
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