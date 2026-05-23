import axios from "axios"

const API = axios.create({
  baseURL: "https://backend-i1xf.onrender.com/api",
})

export default API