import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { NotificationManager } from "react-notifications";
import { apiUrl } from "../api";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = (props) => {
  const [contextData, setContextData] = useState({});
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let LogoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    setContextData({
      authTokens: authTokens,
      user: user,
      LogoutUser: LogoutUser,
    });
  }, []);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};
