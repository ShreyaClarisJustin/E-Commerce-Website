import { useState } from "react";
import axios from "axios";

function AddProductImages({ productId }) {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/add-images/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Images added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Error adding images");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" multiple onChange={handleChange} />
      <div className="flex gap-2">
        {preview.map((url, i) => (
          <img
            key={i}
            src={url}
            className="w-24 h-24 object-cover rounded-md border"
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Images
      </button>
    </form>
  );
}

export default AddProductImages;