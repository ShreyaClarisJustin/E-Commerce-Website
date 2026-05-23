// // import React from "react";
// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   return (
// //     <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

// //       {/* Logo */}
// //       <div className="flex items-center gap-2 text-xl font-bold">
// //         📦 <span>Campus Marketplace</span>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="w-1/3">
// //         <input
// //           type="text"
// //           placeholder="Search products..."
// //           className="w-full border rounded-lg px-4 py-2 focus:outline-none"
// //         />
// //       </div>

// //       {/* Right Icons */}
// //       <div className="flex items-center gap-6">

// //         <button className="font-medium">
// //           Categories
// //         </button>

// //         {/* My Listings Link */}
// //         <Link to="/my-listings" className="font-medium">
// //           My Listings
// //         </Link>

// //         <button className="text-xl">
// //           🛒
// //         </button>

// //         <button className="text-xl">
// //           👤
// //         </button>

// //       </div>

// //     </nav>
// //   );
// // };

// // export default Navbar;






// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

//         {/* LOGO */}
//         <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
//           📦 Campus Marketplace
//         </h1>

//         {/* SEARCH BAR */}
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="border rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//         {/* NAV LINKS */}
//         <div className="flex gap-6 items-center font-medium">

//           <Link to="/" className="hover:text-green-600">
//             Home
//           </Link>

//           <Link to="/products" className="hover:text-green-600">
//             Products
//           </Link>

//           <Link
//             to="/add-product"
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             Sell Item
//           </Link>

//           <Link to="/cart" className="text-xl">
//             🛒
//           </Link>

//           <Link
//             to="/auth"
//             className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white"
//           >
//             Login
//           </Link>

//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;







import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="text-xl md:text-2xl font-bold text-green-600 flex items-center gap-2 whitespace-nowrap">
            📦 <span className="hidden sm:inline">Campus Marketplace</span>
          </Link>

          {/* SEARCH BAR - Hidden on extra small, shown on larger */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <input
              type="text"
              placeholder="Search products..."
              className="border rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex gap-6 items-center font-medium text-gray-700">
            <Link to="/" className="hover:text-green-600 transition">Home</Link>
            <Link to="/products" className="hover:text-green-600 transition">Products</Link>
            <Link to="/add-product" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Sell Item
            </Link>
            <Link to="/cart" className="text-xl">🛒</Link>
            <Link to="/auth" className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition">
              Login
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="text-xl lg:hidden">🛒</Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH BAR - Only visible on small screens below Desktop */}
        <div className="md:hidden pb-4 px-2">
           <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-white border-t`}>
        <div className="flex flex-col p-4 space-y-4 font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-green-600">Home</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="hover:text-green-600">Products</Link>
          <Link to="/add-product" onClick={() => setIsOpen(false)} className="text-green-600 font-bold">Sell Item</Link>
          <hr />
          <Link 
            to="/auth" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-green-600 text-white py-3 rounded-lg"
          >
            Login / Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;