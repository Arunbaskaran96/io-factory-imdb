import classes from "./home.module.css";
import Topbar from "../../compoenets/topbar/Topbar";
import NavLinks from "../../compoenets/navlinks/NavLink";

import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className={classes.container}>
      <Topbar />
      <div className={classes.navlinks}>
        <NavLinks />
        <hr />
      </div>

      <div className={classes.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
