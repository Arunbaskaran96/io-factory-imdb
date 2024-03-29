import { themeState } from "../../context/themeContext";
import classes from "./topbar.module.css";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Topbar() {
  const { toggle, themeAction } = themeState();
  const nav = useNavigate();
  const { removeItem } = useLocalStorage("user");
  const clickHandler = () => {
    themeAction();
  };

  const logoutHandler = () => {
    removeItem("user");
    nav("/");
  };

  return (
    <div className={classes.container}>
      <h5 className={classes.text}>IMDB Clone</h5>
      <div className={classes.action}>
        <div>
          {toggle ? (
            <CiLight
              onClick={clickHandler}
              style={{ cursor: "pointer" }}
              size={35}
            />
          ) : (
            <MdDarkMode
              onClick={clickHandler}
              style={{ cursor: "pointer" }}
              size={35}
            />
          )}
        </div>
        <div>
          <RiLogoutCircleFill
            onClick={logoutHandler}
            cursor="pointer"
            size={35}
            color="#9b2c2c"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
