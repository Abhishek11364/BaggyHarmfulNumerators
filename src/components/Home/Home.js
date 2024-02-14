import React from "react";
import { Link } from "react-router-dom";

function Home({ currentUser }) {
  return (
    <div>
      <div>
        {!currentUser && (
          <>
            <h1>
              <Link to="/login">Login</Link>
            </h1>
            <br />
            <h1>
              <Link to="/signup">Signup</Link>
            </h1>
          </>
        )}
      </div>
      {currentUser && (
        <>
          <h2>Welcome - {currentUser.displayName}</h2>
          <br />
          <h1>
            <Link to="/upload">Upload Image</Link>
          </h1>
        </>
      )}
    </div>
  );
}

export default Home;
