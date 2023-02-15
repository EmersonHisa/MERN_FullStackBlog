import "./singlepost.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import instance from "../../config/axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { Input } from "@mui/material";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const ImgFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const deleteHandler = async () => {
    try {
      await instance.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };
  const editHandler = async () => {
    setEditMode(true);
  };
  const submitHandler = async () => {
    try {
      await instance.put("/posts/" + path, {
        username: user.username,
        title: title,
        desc: desc,
      });
      setEditMode(false);
    } catch (error) {}
  };
  useEffect(() => {
    const getPost = async () => {
      const res = await instance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, []);

  console.log(user);
  return (
    <div className="singleWrapper">
      {(post.photo && (
        <img src={ImgFolder + post.photo} className="singleImg"></img>
      )) || <img src="/./assets/postimage.jpg" className="singleImg"></img>}

      <div className="singleMain">
        <div className="singleIcons">
          {post.username === user?.username && !editMode && (
            <>
              <EditIcon className="edit" onClick={editHandler} />
              <DeleteForeverIcon className="delete" onClick={deleteHandler} />
            </>
          )}
        </div>
        {editMode ? (
          <input
            className="singleTitleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          ></input>
        ) : (
          <div className="singleTitle">{title}</div>
        )}

        <div className="singleTime">
          {new Date(post.updatedAt).toDateString()}
        </div>
        <div className="singleAuthor">
          Author:
          <Link className="link" to={"/?user=" + post.username}>
            <b>{post.username}</b>
          </Link>
        </div>
        {editMode ? (
          <>
            <textarea
              className="singleTextInput"
              defaultValue={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <button className="singlePublish" onClick={submitHandler}>
              publish
            </button>
          </>
        ) : (
          <div className="singleText">{desc}</div>
        )}
      </div>
    </div>
  );
}
