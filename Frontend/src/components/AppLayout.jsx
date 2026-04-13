import React from "react";
import { Outlet } from "react-router";
import AppBrand from "./AppBrand";

const AppLayout = () => {
  return (
    <>
      <AppBrand />
      <Outlet />
    </>
  );
};

export default AppLayout;