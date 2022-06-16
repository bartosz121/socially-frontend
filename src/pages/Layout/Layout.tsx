import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <main data-theme="socially" className="bg-base-100">
      <Navbar />
      <Outlet />
      <Toaster position="bottom-center" />
    </main>
  );
};

export default Layout;
