import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import instance from "../../config/axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { textAlign } from "@mui/system";

export default function Settings() {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const submitHandler = async (e) => {
    dispatch({ type: "UPDATE_START" });
    e.preventDefault();
    const newUpdate = {
      username,
      email,
      password,
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newUpdate.profilePic = filename;
      try {
        await instance.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await instance.put(`users/${user._id}`, newUpdate);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  console.log(user);
  return (
    <div className="settings">
      <div className="setttingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdate">Update Your Account</span>
          <span className="settingsDelete">Delete Account</span>
        </div>
        <form action="" className="settingsForm">
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            {user.profilePic || file ? (
              <img
                src={
                  file ? URL.createObjectURL(file) : `${PF + user.profilePic}`
                }
                alt=""
              />
            ) : (
              <img src="./assets/default.jpg" alt="" />
            )}

            <label htmlFor="fileInput">
              <CloudUploadIcon className="settingsIcon" />
            </label>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label>Username</label>
          <input
            placeholder={user.username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            placeholder={user.email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="settingsSubmitButton"
            type="submit"
            onClick={submitHandler}
          >
            Update
          </button>
          {success && (
            <span
              style={{
                color: "orangered",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Profile has been updated.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
