import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Login from "./screens/Login";
import Register from './screens/Register';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { AuthProvider } from "./context/AuthContext";
import Home from "./screens/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<Home />} path="/home" />
          <Route element={<Login />} path="/*" />
        </Routes>
      </AuthProvider>
      <NotificationContainer />

    </Router>
  );
}

export default App;
