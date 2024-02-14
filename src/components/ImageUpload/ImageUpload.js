import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function ImageUpload({ currentUser }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${currentUser.uid}/${image.name}`);
      await uploadBytes(storageRef, image);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!image || loading}>
        Upload
      </button>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}

export default ImageUpload;
