// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App




// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
// import AddProduct from "./pages/AddProduct"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/add-product" element={<AddProduct />} />

//       </Routes>
//     </BrowserRouter>

//   )
// }

// export default App



// import Home from "./pages/Home";


// function App() {
//   return <Home />;
// }

// export default App;



// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import AuthPage from "./pages/AuthPage";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/auth" element={<AuthPage />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/auth" element={<AuthPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;





import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails"
import MyListings from "./pages/MyListings"
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/cart" element={<Cart />} />
        
      </Routes>
    </div>
  );
}

export default App;