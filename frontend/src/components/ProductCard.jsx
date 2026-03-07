export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

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

        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg">
          Add to Cart
        </button>
      </div>

    </div>
  );
}