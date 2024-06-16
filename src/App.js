import React, { useState } from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Detailpage from "./screens/Detailpage";
import Errorpage from "./screens/Errorpage";
import { NotificationContext } from "./components/lists/ListItem";

const CACHE_EXPIRATION_MS = 3600000; // 1 hour

export default function App() {

  const [updateNotifications, setUpdateNotifications] = useState(false);

  return (
    <BrowserRouter>
      <NotificationContext.Provider value={{ updateNotifications, setUpdateNotifications }}>
        <Layout>
          <Routes>
            <Route path='/'>
              <Route index element={<Homepage />} />

              <Route path='lists'>
                <Route path='' element={<Homepage />} />
                <Route path=':id' element={<Detailpage />} />
              </Route>

              <Route path='404' element={<Errorpage />} />
            </Route>
          </Routes>
        </Layout>
      </NotificationContext.Provider>
    </BrowserRouter>
  );
}