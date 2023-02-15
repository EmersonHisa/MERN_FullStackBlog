import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import instance from "../../config/axios";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await instance.post("/auth/register", {
        username,
        email,
        password,
      });

      res && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form
        style={{ position: "relative" }}
        action=""
        className="registerForm"
        onSubmit={submitHandler}
      >
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="registerSubmit">Register</button>
        {error && (
          <span
            style={{
              color: "orangered",
              marginTop: "10px",
              position: "absolute",
              bottom: "-30px",
              left: "15px",
            }}
          >
            Something went wrong
          </span>
        )}
      </form>
      <button className="registerRegister" type="submit">
        <Link to="/Login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
