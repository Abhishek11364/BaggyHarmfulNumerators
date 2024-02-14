import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmission}>
        <input
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;
