// import { useState } from "react"
// import loginreg from "../assets/loginreg.png"   // use your illustration image
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// function AuthPage(){

// const [isLogin,setIsLogin] = useState(true)
// const navigate = useNavigate()
// return(

// <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">

// <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">

// {/* NAVBAR */}

// <div className="flex justify-between items-center px-6 py-4 border-b">

// <h1 className="text-xl font-semibold text-green-700">
// 🏪 Campus Marketplace
// </h1>

// <div className="text-gray-500 text-2xl">
// ☰
// </div>

// </div>


// <div className="grid md:grid-cols-2">

// {/* LEFT ILLUSTRATION */}

// <div className="bg-gray-50 flex items-center justify-center p-10">

// <img
// src={loginreg}
// alt="loginreg"
// className="w-[450px]"
// />

// </div>


// {/* RIGHT FORM */}

// <div className="p-10">

// {/* LOGIN REGISTER SWITCH */}

// <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-6">

// <button
// onClick={()=>setIsLogin(true)}
// className={`w-1/2 py-2 font-semibold ${
// isLogin ? "bg-green-600 text-white" : ""
// }`}
// >
// Login
// </button>

// <button
// onClick={()=>setIsLogin(false)}
// className={`w-1/2 py-2 font-semibold ${
// !isLogin ? "bg-green-600 text-white" : ""
// }`}
// >
// Register
// </button>

// </div>


// <p className="text-gray-500 text-sm mb-6">
// ✔ Access exclusive to verified campus students
// </p>


// {/* EMAIL */}

// <div className="mb-4">

// <label className="block text-gray-700 mb-1">
// College Email
// </label>

// <input
// type="email"
// placeholder="College Email"
// className="w-full border p-3 rounded-lg"
// />

// </div>


// {/* PASSWORD */}

// <div className="mb-4">

// <label className="block text-gray-700 mb-1">
// Password
// </label>

// <input
// type="password"
// placeholder="Password"
// className="w-full border p-3 rounded-lg"
// />

// </div>


// {/* REMEMBER */}

// <div className="flex items-center mb-4">

// <input type="checkbox" className="mr-2"/>

// <span className="text-sm text-gray-600">
// Remember me
// </span>

// </div>


// {/* BUTTON */}

// <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">

// {isLogin ? "Login" : "Register"}

// </button>


// <p className="text-sm text-gray-500 mt-4 text-center">

// {isLogin ? "New user?" : "Already have account?"}

// <span
// className="text-green-600 cursor-pointer ml-1"
// onClick={()=>setIsLogin(!isLogin)}
// >

// {isLogin ? "Register now" : "Login"}

// </span>

// </p>

// </div>

// </div>


// {/* FOOTER */}

// <div className="bg-gray-700 text-white text-sm text-center py-3">

// About | Help | Terms | Contact | © 2026 Campus Marketplace

// </div>

// </div>

// </div>

// )

// }

// export default AuthPage









import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import loginreg from "../assets/loginreg.png"

function AuthPage(){

const navigate = useNavigate()

const [isLogin,setIsLogin] = useState(true)

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [campus,setCampus] = useState("")
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")

// ================= LOGIN =================

const handleLogin = async () => {

  try{

    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email,
        password
      }
    )

    localStorage.setItem("token",res.data.token)

    alert("Login successful")

    navigate("/products")

  }
  catch(error){

    console.error(error)

    alert("Invalid email or password")

  }

}

// ================= REGISTER =================

const handleRegister = async () => {

if(password !== confirmPassword){

alert("Passwords do not match")
return

}

try{

const res = await axios.post(
"http://localhost:5000/api/users/signup",
{
name,
email,
password,
campus
}
)

alert("Registration successful")

setIsLogin(true)

}
catch(error){

console.error(error)

alert("Registration failed")

}

}

return(

<div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">

<div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">

{/* NAVBAR */}

<div className="flex justify-between items-center px-6 py-4 border-b">

<h1 className="text-xl font-semibold text-green-700">
🏪 Campus Marketplace
</h1>

<div className="text-gray-500 text-2xl">
☰
</div>

</div>


<div className="grid md:grid-cols-2">

{/* LEFT IMAGE */}

<div className="bg-gray-50 flex items-center justify-center p-10">

<img
src={loginreg}
alt="login illustration"
className="w-[420px]"
/>

</div>


{/* RIGHT FORM */}

<div className="p-10">

{/* SWITCH LOGIN REGISTER */}

<div className="flex bg-gray-100 rounded-lg overflow-hidden mb-6">

<button
onClick={()=>setIsLogin(true)}
className={`w-1/2 py-2 font-semibold ${
isLogin ? "bg-green-600 text-white" : ""
}`}
>
Login
</button>

<button
onClick={()=>setIsLogin(false)}
className={`w-1/2 py-2 font-semibold ${
!isLogin ? "bg-green-600 text-white" : ""
}`}
>
Register
</button>

</div>

<p className="text-gray-500 text-sm mb-6">
✔ Access exclusive to verified campus students
</p>


{/* REGISTER FIELDS */}

{!isLogin && (

<>

<div className="mb-4">

<label className="block text-gray-700 mb-1">
Full Name
</label>

<input
type="text"
placeholder="Enter your full name"
className="w-full border p-3 rounded-lg"
onChange={(e)=>setName(e.target.value)}
/>

</div>

<div className="mb-4">

<label className="block text-gray-700 mb-1">
Campus
</label>

<select
className="w-full border p-3 rounded-lg"
onChange={(e)=>setCampus(e.target.value)}
>

<option value="">Select Campus</option>
<option>North Campus</option>
<option>South Campus</option>
<option>Main Campus</option>

</select>

</div>

</>

)}


{/* EMAIL */}

<div className="mb-4">

<label className="block text-gray-700 mb-1">
College Email
</label>

<input
type="email"
placeholder="example@campus.ac.in"
className="w-full border p-3 rounded-lg"
onChange={(e)=>setEmail(e.target.value)}
/>

</div>


{/* PASSWORD */}

<div className="mb-4">

<label className="block text-gray-700 mb-1">
Password
</label>

<input
type="password"
placeholder="Enter password"
className="w-full border p-3 rounded-lg"
onChange={(e)=>setPassword(e.target.value)}
/>

</div>


{/* CONFIRM PASSWORD */}

{!isLogin && (

<div className="mb-4">

<label className="block text-gray-700 mb-1">
Confirm Password
</label>

<input
type="password"
placeholder="Confirm password"
className="w-full border p-3 rounded-lg"
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

</div>

)}


{/* BUTTON */}

<button
onClick={isLogin ? handleLogin : handleRegister}
className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>

{isLogin ? "Login" : "Register"}

</button>


<p className="text-sm text-gray-500 mt-4 text-center">

{isLogin ? "New user?" : "Already have account?"}

<span
className="text-green-600 cursor-pointer ml-1"
onClick={()=>setIsLogin(!isLogin)}
>

{isLogin ? "Register now" : "Login"}

</span>

</p>

</div>

</div>


{/* FOOTER */}

<div className="bg-gray-700 text-white text-sm text-center py-3">

About | Help | Terms | Contact | © 2026 Campus Marketplace

</div>

</div>

</div>

)

}

export default AuthPage

