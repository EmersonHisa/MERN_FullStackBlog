import "./topbar.scss";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <div className="branding">
          <span>R@tCreation</span>
          <PestControlRodentIcon className="brandIcon" />
        </div>
        <div className="topIcons">
          <FacebookIcon className="topIcon" />
          <TwitterIcon className="topIcon" />
          <InstagramIcon className="topIcon" />
        </div>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/" onClick={logoutHandler}>
              {user && "LOGLOT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            {user.profilePic ? (
              <img className="topImage" src={PF + user.profilePic} alt="" />
            ) : (
              <img className="topImage" src="/./assets/default.jpg" alt="" />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <SearchIcon className="topSearchIcon" />
      </div>
    </div>
  );
}
