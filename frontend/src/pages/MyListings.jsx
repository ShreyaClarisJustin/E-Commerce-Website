import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

function MyListings(){

const [products,setProducts] = useState([])

useEffect(()=>{

API.get("/products/my-products",{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})
.then(res=>{
setProducts(res.data)
})
.catch(err=>{
console.log(err)
})

},[])


const deleteProduct = async(id)=>{

await API.delete(`/products/${id}`,{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

setProducts(products.filter(p=>p._id !== id))

}


const markSold = async(id)=>{

await API.put(`/products/${id}/sold`,{},{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})

setProducts(products.map(p =>
p._id === id ? {...p,status:"Sold"} : p
))

}


return(

<div className="bg-gray-50 min-h-screen">

<Navbar/>

<div className="max-w-6xl mx-auto py-10 px-6">

<h1 className="text-3xl font-bold mb-8">
My Listings
</h1>


{products.length === 0 ? (
<p className="text-gray-500">No products listed yet</p>
) : (

<div className="grid md:grid-cols-3 gap-6">

{products.map(p=>(

<div key={p._id} className="bg-white rounded-xl shadow">

<img
src={p.images?.[0] || "https://via.placeholder.com/300"}
className="h-48 w-full object-cover rounded-t-xl"
/>

<div className="p-4">

<h3 className="font-semibold text-lg">{p.name}</h3>

<p className="text-gray-500 text-sm">{p.campus}</p>

<p className="text-green-600 font-bold mt-1">
₹{p.price}
</p>

<p className="text-sm mt-1">
Status: 
<span className={`ml-1 ${p.status === "Sold" ? "text-red-500":"text-green-600"}`}>
{p.status}
</span>
</p>


<div className="flex gap-2 mt-4">

<button
onClick={()=>markSold(p._id)}
className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
>
Mark Sold
</button>

<button
onClick={()=>deleteProduct(p._id)}
className="bg-red-500 text-white px-3 py-1 rounded text-sm"
>
Delete
</button>

</div>

</div>

</div>

))}

</div>

)}

</div>

</div>

)

}

export default MyListings