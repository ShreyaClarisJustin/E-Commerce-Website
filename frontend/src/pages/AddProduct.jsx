// import { useState } from "react"
// import API from "../services/api"

// function AddProduct(){

// const [name,setName]=useState("")
// const [price,setPrice]=useState("")
// const [description,setDescription]=useState("")

// const submitHandler = async(e)=>{
// e.preventDefault()

// await API.post("/products",{
// name,
// price,
// description,
// category:"Other",
// campus:"North Campus"
// })

// alert("Product added")
// }

// return(

// <form onSubmit={submitHandler}>

// <input
// placeholder="Product Name"
// onChange={(e)=>setName(e.target.value)}
// />

// <input
// placeholder="Price"
// onChange={(e)=>setPrice(e.target.value)}
// />

// <textarea
// placeholder="Description"
// onChange={(e)=>setDescription(e.target.value)}
// />

// <button>Add Product</button>

// </form>

// )

// }

// export default AddProduct






// import Navbar from "../components/Navbar"
// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// function AddProduct(){

// return(

// <div className="bg-gray-50 min-h-screen">

// {/* <Navbar/> */}

// <div className="max-w-5xl mx-auto p-10">

// <h1 className="text-3xl font-bold mb-8">
// Add Product
// </h1>

// <div className="grid md:grid-cols-2 gap-6">

// {/* Title */}
// <input
// placeholder="Title"
// className="border p-3 rounded-lg"
// />

// {/* Category */}
// <select className="border p-3 rounded-lg">
// <option>Select Category</option>
// <option>Books</option>
// <option>Electronics</option>
// <option>Furniture</option>
// <option>Hostel Items</option>
// </select>

// {/* Price */}
// <input
// placeholder="Price"
// className="border p-3 rounded-lg"
// />

// {/* Stock */}
// <input
// placeholder="Stock Quantity"
// className="border p-3 rounded-lg"
// />

// {/* Condition */}
// <select className="border p-3 rounded-lg">
// <option>New</option>
// <option>Like New</option>
// <option>Good</option>
// <option>Used</option>
// </select>

// </div>

// {/* Description */}

// <textarea
// placeholder="Description"
// className="border p-3 rounded-lg w-full mt-6 h-32"
// />

// {/* Image Upload */}

// <div className="border-2 border-dashed p-10 text-center mt-6 rounded-lg">

// Upload Images

// </div>

// {/* Location */}

// <select className="border p-3 rounded-lg mt-6">

// <option>North Campus</option>
// <option>South Campus</option>

// </select>

// <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">

// Submit Listing

// </button>

// </div>

// </div>

// )

// }

// export default AddProduct







import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddProduct(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [category,setCategory] = useState("")

const [price,setPrice] = useState("")
const [quantity,setQuantity] = useState("")

const [description,setDescription] = useState("")
const [condition,setCondition] = useState("New")
const [campus,setCampus] = useState("North Campus")
const [images, setImages] = useState([]);
const [preview, setPreview] = useState([]); // for image preview

const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // array of selected files
    // Create previews for the selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

const handleSubmit = async (e) => {

e.preventDefault()

try{

const token = localStorage.getItem("token")

// await axios.post(
// "http://localhost:5000/api/products",
// {
// name,
// price,
// description,
// category,
// condition,
// quantity,
// campus
// },
// {
// headers:{
// Authorization:`Bearer ${token}`
// }
// }
// )
 if (!token) return alert("Please login first");
     const formData = new FormData();
      formData.append("name", name);
            formData.append("category", category);

      formData.append("price", price);
            formData.append("quantity", quantity);
              formData.append("condition", condition);
      formData.append("campus", campus);

      formData.append("description", description);

      images.forEach((img) => formData.append("images", img));

      const res=await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
console.log("Product created:", res.data);
alert("Product added successfully")

navigate("/products")

}catch(error){

console.error(error)

alert(
error?.response?.data?.message ||
"Error adding product"
)

}

};

return(

<div className="min-h-screen bg-gray-50 flex justify-center items-center p-10">

<div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-10">

<h1 className="text-3xl font-bold mb-6">
Add New Product
</h1>

<form onSubmit={handleSubmit} className="grid gap-6">

{/* PRODUCT NAME */}

<div>

<label className="block mb-1 font-medium">
Title
</label>

<input
type="text"
placeholder="Product Title"
className="border p-3 rounded-lg w-full"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

</div>


{/* CATEGORY */}

<div>

<label className="block mb-1 font-medium">
Category
</label>

<select
className="border p-3 rounded-lg w-full"
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
>

<option value="">Select Category</option>
<option>Books</option>
<option>Electronics</option>
<option>Furniture</option>
<option>Hostel Items</option>
<option>Lab Equipment</option>

</select>

</div>


{/* PRICE */}

<div>

<label className="block mb-1 font-medium">
Price
</label>

<input
type="number"
placeholder="Price"
className="border p-3 rounded-lg w-full"
value={price}
onChange={(e)=>setPrice(e.target.value)}
required
/>

</div>


{/* QUANTITY */}

<div>

<label className="block mb-1 font-medium">
Stock Quantity
</label>

<input
type="number"
placeholder="Quantity"
className="border p-3 rounded-lg w-full"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
required
/>

</div>


{/* CONDITION */}

<div>

<label className="block mb-1 font-medium">
Condition
</label>

<select
className="border p-3 rounded-lg w-full"
value={condition}
onChange={(e)=>setCondition(e.target.value)}
>

<option>New</option>
<option>Like New</option>
<option>Good</option>
<option>Used</option>

</select>

</div>

{/* CAMPUS */}

<div>

<label className="block mb-1 font-medium">
Pickup Location
</label>

<select
className="border p-3 rounded-lg w-full"
value={campus}
onChange={(e)=>setCampus(e.target.value)}
>

<option>North Campus</option>
<option>South Campus</option>

</select>

</div>


{/* DESCRIPTION */}

<div>

<label className="block mb-1 font-medium">
Description
</label>

<textarea
placeholder="Product Description"
className="border p-3 rounded-lg w-full h-32"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

</div>
 {/* <div className="border-2 border-dashed p-10 text-center mt-6 rounded-lg">
 Upload Image
 </div> */}
<label className="block mb-1 font-medium">
Upload Image
</label>
 <input type="file"
            multiple
            onChange={handleImageChange}
            className="border p-3 rounded-lg w-full"
          />
<div className="flex gap-2 mt-4">
  {preview.map((url, idx) => (
    <img
      key={idx}
      src={url}
      alt={`preview-${idx}`}
      className="w-24 h-24 object-cover rounded-lg border"
    />
  ))}
</div>
{/* SUBMIT BUTTON */}

<button
type="submit"
className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
>

Submit Listing

</button>

</form>

</div>

</div>

);

}

export default AddProduct