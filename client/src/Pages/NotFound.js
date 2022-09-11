import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <div className="relative h-screen">
      <div className="lg:w-1/2 w-[96%] h-[24rem] absolute top-[calc(50%-12rem)] lg:left-[25%] left-[2%] text-center">
        <h1 className="text-[200px]  leading-[190px] text-blue-500 font-black">404</h1>
        <h2 className="text-[70px] text-gray-800 mb-2">Not Found!</h2>
        <button
          className="bg-gray-800 hover:bg-black hover py-3 px-6 text-white w-[21rem] outline-none"
          onClick={() => navigate(-1)}
        >
          Take me back
        </button>
      </div>
    </div>
  )
}

export default NotFound 