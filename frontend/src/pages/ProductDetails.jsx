// import { useParams } from "react-router-dom"

// function ProductDetails() {

// const { id } = useParams()

// // temporary product data (later will come from backend)
// const products = [
//   {
//     id:1,
//     name:"MacBook Pro",
//     price:800,
//     condition:"Like New",
//     description:"Apple MacBook Pro in excellent condition. Perfect for students and developers.",
//     image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//     seller:"John Doe"
//   },
//   {
//     id:2,
//     name:"Wireless Headphones",
//     price:50,
//     condition:"Used",
//     description:"Noise cancelling wireless headphones with great sound quality.",
//     image:"https://images.unsplash.com/photo-1580894908361-967195033215",
//     seller:"Sarah"
//   },
//   {
//     id:3,
//     name:"Study Desk & Chair",
//     price:120,
//     condition:"Good",
//     description:"Comfortable study table and chair set suitable for hostel rooms.",
//     image:"https://images.unsplash.com/photo-1582582494700-f8ce0b0f1e3b",
//     seller:"Alex"
//   }
// ]

// const product = products.find(p => p.id === Number(id))

// if(!product){
// return <h1 className="p-10 text-xl">Product not found</h1>
// }

// return (

// <div className="min-h-screen bg-gray-100 p-8">

// <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

// <div className="grid md:grid-cols-2 gap-8">

// {/* PRODUCT IMAGE */}

// <img
// src={product.image}
// alt={product.title}
// className="w-full h-96 object-cover rounded-lg"
// />

// {/* PRODUCT INFO */}

// <div>

// <h1 className="text-3xl font-bold mb-4">
// {product.title}
// </h1>

// <p className="text-2xl text-green-600 font-bold mb-2">
// ${product.price}
// </p>

// <p className="text-gray-500 mb-4">
// Condition: {product.condition}
// </p>

// <p className="text-gray-700 mb-6">
// {product.description}
// </p>

// <p className="text-sm text-gray-500 mb-6">
// Seller: {product.seller}
// </p>

// <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
// Contact Seller
// </button>

// </div>

// </div>

// </div>

// </div>

// )

// }

// export default ProductDetails





// import { useParams } from "react-router-dom"
// import { useEffect,useState } from "react"
// import axios from "axios"

// function ProductDetails(){

// const { id } = useParams()

// const [product,setProduct] = useState(null)

// useEffect(()=>{

// axios.get(`http://localhost:5000/api/products/single/${id}`)
// .then((res)=>{
// setProduct(res.data)
// })

// },[id])

// if(!product) return <p>Loading...</p>

// return(

// <div className="p-10">

// <h1 className="text-3xl font-bold">{product.title}</h1>

// <img src={product.image} className="w-96 mt-4"/>

// <p className="text-xl mt-4">₹{product.price}</p>

// <p className="mt-2">Condition: {product.condition}</p>

// <p className="mt-4">{product.description}</p>

// </div>

// )

// }

// export default ProductDetails








// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProduct(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold">{product.name}</h1>
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>

//       <div className="flex gap-4 mt-4">
//         {product.images.map((img, index) => (
//           <img
//             key={index}
//             src={`http://localhost:5000${img}`} // backend URL + relative path
//             alt={`product-${index}`}
//             className="w-32 h-32 object-cover rounded-lg"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;


















import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/products/single/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // 1. Get existing cart or empty array
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // 2. Add product (check if already exists to avoid duplicates)
    const isExist = cart.find(item => item._id === product._id);
    if (!isExist) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    }
    
    // 3. Navigate to cart page
    navigate("/cart");
  };

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden p-8">
        
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* LEFT: IMAGES */}
          <div>
            <img
              src={`http://localhost:5000/${product.images[0]}`}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl mb-4"
            />
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <img key={idx} src={`http://localhost:5000/${img}`} className="w-20 h-20 object-cover rounded-md border" />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded w-fit mb-4">
              {product.condition}
            </span>
            
            <p className="text-3xl font-semibold text-gray-800 mb-6">${product.price}</p>
            
            <div className="border-t border-b py-6 mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-sm text-gray-500"><strong>Category:</strong> {product.category}</p>
              <p className="text-sm text-gray-500"><strong>Pickup:</strong> {product.campus}</p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-300 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                Contact Seller
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
