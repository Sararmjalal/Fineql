import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import Loading from "../Components/Loading";


const LoginSignupLayout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const cookie = new Cookies()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cookie.get("ut"))
      navigate("/dashboard")
    setLoading(false)
  }, [])
  
  if (loading) return <Loading />
  
  return (
    <div className="h-screen bg-gray-50 text-gray-600">
      <div className="bg-white shadow-2xl shadow-blue-400/10 overflow-hidden mx-auto
      relative top-[calc(50%-12rem)] sm:w-[30rem] w-[calc(100%-1rem)] h-max">
        <div className="flex w-full">
          <div
            className={`${!location.search ?
              "bg-white text-blue-500"
              :
              "bg-blue-500 hover:bg-blue-600 text-white"}
              text-center w-1/2 sm:h-[5rem] h-[4.5rem]`}
          >
            <Link style={{width: "100%", height: "100%", display:"flex", flexDirection:"column", justifyContent:"center"}}to="/login">
              <p className="text-xl font-semibold">Login</p>
             </Link>
          </div>
          <div className={`${location.search ?
              "bg-white text-blue-500"
              :
              "bg-blue-500 hover:bg-blue-600 text-white"}
              text-center w-1/2 sm:h-[5rem] h-[4.5rem] flex flex-col justify-center`}
          >
            <Link style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
              to='./register?=true'>
             <p className="text-xl font-semibold">Register</p>
            </Link>
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>  
  )
  
}

export default LoginSignupLayout 