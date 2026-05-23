import { Link } from "react-router-dom";

// function Navbar() {
//   return (
    // <nav className="bg-white shadow">

    //   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        {/* <h1 className="text-xl font-bold text-green-600 flex items-center gap-2">
          📦 Campus Marketplace
        </h1> */}

        {/* SEARCH BAR */}
        {/* <div className="w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none"
          />
        </div> */}

        {/* NAV LINKS */}
        {/* <div className="flex gap-6 font-medium">

          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-green-600">
            Products
          </Link>

          <Link to="/add-product" className="hover:text-green-600">
            Add Product
          </Link>

          <Link to="/my-listings" className="hover:text-green-600">
            My Listings
          </Link>

          <Link to="/auth" className="hover:text-green-600">
            Login
          </Link>

        </div> */}

    //   </div>

    // </nav>
//   );
// }

// export default Navbar;



// function Cart() {
//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold">Shopping Cart</h1>
//       <p>Your cart is empty.</p>
//     </div>
//   );
// }

// export default Cart;



import { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b py-4">
            <div className="flex gap-4 items-center">
              <img src={`https://backend-i1xf.onrender.com/${item.images[0]}`} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Cart;
