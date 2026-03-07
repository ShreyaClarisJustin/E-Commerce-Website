// import { useEffect, useState } from "react"
// import API from "../services/api"

// function Home(){

// const [products,setProducts] = useState([])

// useEffect(()=>{
// API.get("/products")
// .then(res=>{
// setProducts(res.data.products)
// })
// },[])

// return(
// <div>

// <h1>Campus Marketplace</h1>

// {products.map(p=>(
// <div key={p._id}>

// <h3>{p.name}</h3>
// <p>₹{p.price}</p>

// </div>
// ))}

// </div>
// )

// }

// export default Home





// import React from "react";
// import homepic from "../assets/home.png";
// import books from "../assets/books.png";
// import electronics from "../assets/electronics.png";
// import furniture from "../assets/furniture.png";
// import hostel from "../assets/hostel.png";
// import aad from "../assets/aad.png";
// import lamp from "../assets/lamp.png";
// import calculator from "../assets/calculator.png";
// import study_table from "../assets/study_table.png";
// // import Navbar from "../components/Navbar";
// const Home = () => {
//   const products = [
//     {
//       name: "Introduction to Algorithms",
//       price: 500,
//       image: aad,
//       condition: "Used",
//       campus: "North Campus",
//     },
//     {
//       name: "Wooden Study Table",
//       price: 1200,
//       image: study_table,
//       condition: "Good",
//       campus: "North Campus",
//     },
//     {
//       name: "Scientific Calculator",
//       price: 1500,
//       image: calculator,
//       condition: "Good",
//       campus: "North Campus",
//     },
//     {
//       name: "Table Lamp",
//       price: 400,
//       image: lamp,
//       condition: "Like New",
//       campus: "North Campus",
//     },
//   ];

//   return (
//     <div>

//     {/* <Navbar /> */}
//     <div className="bg-gray-50 min-h-screen">

//       {/* HERO SECTION */}

//       <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
//         <div>
//           <h1 className="text-5xl font-bold text-gray-800 mb-6">
//             Buy & Sell Within Campus
//           </h1>

//           <p className="text-gray-600 mb-6 text-lg">
//             Find textbooks, electronics, furniture and more from students in your campus.
//           </p>

//           <button className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500">
//             Browse Products
//           </button>
//         </div>

//         {/* <img
//           src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
//           alt="campus"
//           className="w-96 mx-auto"
//         /> */}
//         <img src={homepic} alt="home" className="w-[500px] mx-auto" />
//       </div>

//       {/* CATEGORIES */}

//       <div className="max-w-7xl mx-auto px-6 py-10">

//         <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <img src={books} alt="books" className="mx-auto"/>
//             <h3 className="font-semibold mt-2">Books</h3>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <img src={electronics} alt="electronics" className="mx-auto"/>
//             <h3 className="font-semibold mt-2">Electronics</h3>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <img src={furniture} alt="furniture" className="mx-auto"/>
//             <h3 className="font-semibold mt-2">Furniture</h3>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow text-center">
//             <img src={hostel} alt="hostel" className="mx-auto"/>
//             <h3 className="font-semibold mt-2">Hostel Items</h3>
//           </div>

//         </div>
//       </div>

//       {/* PRODUCTS */}

//       <div className="max-w-7xl mx-auto px-6 py-10">

//         <h2 className="text-3xl font-bold mb-8">Latest Listings</h2>

//         <div className="grid md:grid-cols-4 gap-6">

//           {products.map((p, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={p.image}   
//                 alt={p.name}
//                 className="h-48 w-full object-cover rounded-t-xl"
//               />

//               <div className="p-4">

//                 <h3 className="font-semibold">{p.name}</h3>

//                 <p className="text-sm text-gray-500">{p.campus}</p>

//                 <p className="text-green-600 font-bold mt-2">₹{p.price}</p>

//                 <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//                   Add to Cart
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>

//       </div>

//     </div>
//     </div>
//   );
// };

// export default Home;















import React from "react";
import ProductCard from "../components/ProductCard";
// import products from "../data/productss";
import homepic from "../assets/home.png";
import books from "../assets/books.png";
import electronics from "../assets/electronics.png";
import furniture from "../assets/furniture.png";

// import aad from "../assets/aad.png";
// import lamp from "../assets/lamp.png";
// import calculator from "../assets/calculator.png";
// import study_table from "../assets/study_table.png";
import hostel from "../assets/hostel.png";
// import Navbar from "../components/Navbar";     
const categories = [
  { name: "Books", image: books },
  { name: "Electronics", image: electronics },
  { name: "Furniture", image: furniture },
  { name: "Hostel Items", image: hostel },
];

// const products = [
//   {
//     title: "Introduction to Algorithms",
//     price: 500,
//     image: aad,
//   },
//   {
//     title: "Wooden Study Table",
//     price: 2000,
//     image: study_table,
//   },
//   {
//     title: "Scientific Calculator",
//     price: 700,
//     image: calculator,
//   },
//   {
//     title: "Table Lamp",
//     price: 300,
//     image: lamp,
//   },
// ];

export default function Home() {
  return (
    <div className="bg-gray-50">

      {/* NAVBAR */}

      {/* <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

          <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            📦 Campus Marketplace
          </h1>

          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex gap-6 items-center font-medium">
            <a href="/" className="hover:text-green-600">Home</a>
            <a href="/products" className="hover:text-green-600">Products</a>

            <a
              href="/add-product"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Sell Item
            </a>

            <a href="/cart" className="text-xl">🛒</a>

            <a
              href="/login"
              className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white"
            >
              Login
            </a>
          </div>

        </div>
      </nav> */}



      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10 px-6">

          <div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Buy & Sell Within <span className="text-green-600">Campus</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Find textbooks, electronics, furniture and more from students in your campus.
            </p>

            <button className="mt-6 bg-yellow-400 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500">
              Browse Products
            </button>
          </div>

          <img
            src={homepic}
            alt="homepic"
            className="rounded-xl shadow-lg"
          />

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto mt-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition p-6 text-center cursor-pointer"
            >
              <img src={cat.image} className="w-16 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">{cat.name}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* LATEST LISTINGS */}

      {/* <section className="max-w-7xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-bold mb-8">Latest Listings</h2>

        <div className="grid md:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.title}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={product.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {product.title}
                </h3>

                <p className="text-green-600 font-bold mt-2">
                  ₹ {product.price}
                </p>

                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Add to Cart
                </button>
              </div>

            </div> */}
          {/* ))}

        </div>
      </section> */}

      {/* FEATURES */}

      <section className="bg-gray-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center px-6">

          <div>
            <h3 className="text-xl font-semibold">🎓 Students Only</h3>
            <p className="text-gray-600 mt-2">
              Buy and sell safely within your campus community.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">💰 Affordable</h3>
            <p className="text-gray-600 mt-2">
              Get second-hand items at cheaper prices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">⚡ Quick Deals</h3>
            <p className="text-gray-600 mt-2">
              Meet and exchange items directly on campus.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-xl font-semibold">
            Campus Marketplace
          </h2>

          <p className="text-gray-400 mt-2">
            Buy and sell items easily within your campus.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            © 2026 Campus Marketplace
          </p>

        </div>
      </footer>

    </div>
  );
}