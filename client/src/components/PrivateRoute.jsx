import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../context/user/userContext";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const userContext = useContext(UserContext);
  const { loading, isAuthenticated, user } = userContext;

  if (loading) {
    return (
      <div className="loader">
        <Spinner />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
