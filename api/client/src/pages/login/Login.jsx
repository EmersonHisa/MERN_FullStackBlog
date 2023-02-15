import "./login.scss";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { useRef, useContext } from "react";
import instance from "../../config/axios";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await instance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch(/*dispatch an action*/{ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user);

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form action="" className="loginForm" onSubmit={submitHandler}>
        <label htmlFor="">Username</label>
        <input ref={userRef} type="text" placeholder="Username" />
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button className="loginSubmit" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegister">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
