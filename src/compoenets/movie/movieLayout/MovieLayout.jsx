import React from "react";
import Topbar from "../../topbar/Topbar";
import { Outlet } from "react-router-dom";

function MovieLayout() {
  return (
    <div>
      <Topbar />
      <div style={{ marginTop: "8vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieLayout;
