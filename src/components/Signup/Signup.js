import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    displayName: "",
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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(user, { displayName: values.displayName });
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Name"
          value={values.displayName}
          onChange={(e) => setValues({ ...values, displayName: e.target.value })}
        />
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
          Sign up
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Signup;
