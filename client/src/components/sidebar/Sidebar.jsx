import "./sidebar.scss";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import instance from "../../config/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    try {
      const getCats = async () => {
        const catsToBeSet = await instance.get("/cats");
        setCats(catsToBeSet.data);
      };
      getCats();
    } catch (error) {}
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarIntro">
        <span className="sidebarHeading">About me</span>
        <img className="sidebarIntroImg" src="/./assets/puppy.jpeg"></img>
        <span className="sidebarIntroText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A sit sint
          unde alias sed ex, maiores ipsa culpa porro
        </span>
      </div>
      <div className="sidebarCategories">
        <span className="sidebarHeading">Categories</span>
        <ul className="categories">
          {cats.map((c) => {
            return (
              <Link to={"/?cat=" + c.name} className="link" key={Math.random()}>
                <li key={c.name} className="category">
                  {c.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="sidebarFollowUs">
        <span className="sidebarHeading">Follow Us</span>
        <div className="sidebarSocialIcons">
          <FacebookIcon className="sidebarIcon" />
          <TwitterIcon className="sidebarIcon" />
          <InstagramIcon className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
}
