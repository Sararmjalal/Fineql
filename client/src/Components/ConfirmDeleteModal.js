import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

const ConfirmDelete = (props) => {

  const cookie = new Cookies()

  const navigate = useNavigate()

  const logout = () => {
    cookie.remove('ut', { path: "/" })
    navigate('/login')
  }

  return (
    <>
    <div
    className="bg-black fixed top-0 left-0 w-screen h-screen opacity-50 z-10"
    onClick={() => props.setShowModal(false)}
    ></div>
    <div
      onKeyDown={(e) => {
       if (e.key === 'Enter')
       logout()
      }}
        className="font-light text-gray-600 bg-white p-5 sm:w-[30rem] h-48 w-11/12 fixed top-[calc(50vh-10rem)]
      sm:left-[calc(50vw-15rem)] left-[calc(50vw-45.8%)] z-20">
      <h1 className="mb-5	text-xl">Logout</h1>
      <div className="h-8 mt-2 ">Are you sure you want to logout?</div>
      <div className="flex">
        <div className="w-1/2">
          <button
            className="w-full mt-3 mb-12 mr-2 bg-gray-800 text-white px-6 py-3 hover:bg-black font-normal"
            onClick={() => props.setShowModal(false)}
          >
            Cancel
          </button>
        </div>
          <div className="w-1/2 pl-2">
              <button
                className="w-full mt-3 mb-12 mr-2 bg-gray-200 px-6 py-3 hover:bg-gray-800 hover:text-white font-normal"
                onClick={logout}
              >
                Yes
              </button>
          </div>
      </div>
    </div>
  </>
  )
}

export default ConfirmDelete