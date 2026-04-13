import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from "react";
import AppLoader from "../../../components/AppLoader";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <AppLoader text="Preparing Your Expperience" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;