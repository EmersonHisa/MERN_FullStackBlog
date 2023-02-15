import "./write.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState, useContext } from "react";
import instance from "../../config/axios";
import { Context } from "../../context/Context";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await instance.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await instance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };
  return (
    <div className="write">
      {(file && (
        <img src={URL.createObjectURL(file)} className="writeImg"></img>
      )) || <img src="./assets/writeImg.jpg" className="writeImg"></img>}

      <form action="" className="writeForm" onSubmit={submitHandler}>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
        <div className="writeFormGroupTitle">
          <label htmlFor="fileInput">
            <AddCircleOutlineIcon className="addIcon" />
          </label>
          <input
            onChange={(e) => {
              return setFile(e.target.files[0]);
            }}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          />

          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroupText">
          <textarea
            placeholder="Tell your story"
            type="text"
            className="writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}
