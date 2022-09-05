import Avatar from "../assets/jpg/UserAvatar.jpg"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ConfirmDelete from "./ConfirmDeleteModal"
import { DOMAIN } from "../config/constants"

const DashboardMenu = (props) => {

  const { setMobileMenu, mobileMenu, thisUser, refetch } = props

  const [img, setImg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()

  useEffect(() => {

    if (thisUser.img)
    {
      console.log("geeeeee")
      setImg(thisUser.img)

      refetch()
    }

  }, [thisUser])

  return (
    <>
    <div className="sm:fixed sm:top-0 sm:left-0 sm:h-screen sm:w-[16rem] sm:m-0 mt-6 mx-6 shadow-2xl shadow-blue-400/10">
      <div className="flex bg-blue-500">
        <Link to="/dashboard">
          <div className="w-16  p-3">
              <img
                src={`${DOMAIN}/${img}`}
                onError={(e) => e.target.src = Avatar}
                className="rounded-full aspect-square object-cover"></img>
          </div>
        </Link>
        <div className="sm:w-1/2 w-[calc(75%-70px)]">
            <p className=" text-dark-text-color pt-5">Welcome {thisUser.name.length > 5 ?
              thisUser.name.slice(0, 5) + "..." : thisUser.name}
              !
            </p>
        </div>
        <div className="block sm:hidden w-1/4 text-right pt-5 pr-3">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            <svg className="w-6 h-6" fill="#dcdcdc" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0
              110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
      <ul
        className={`${mobileMenu ? "absolute top-18 shadow-2xl shadow-blue-400/10" : "hidden"}
        sm:block sm:shadow-none bg-white cursor-pointer w-[calc(100%-3rem)] sm:w-full font-light`}
        onClick={() => {
          if (mobileMenu)
            setMobileMenu(false)
        }}
      >
        <Link to="/dashboard">
           <li className=" h-16 border-b-[1px] border-gray-100 flex flex-col justify-center hover:bg-gray-100">
            <p className={`${location.pathname === '/dashboard' ? "text-blue-500 font-normal" : ""}
            w-full text-center`}>
              Dashboard
            </p>
          </li>
        </Link>
        <Link to="/dashboard/profile/edit">  
          <li className=" h-16 border-b-[1px] border-gray-100 flex flex-col justify-center hover:bg-gray-100">
          <p className={`${location.pathname === '/dashboard/profile/edit' ? "text-blue-500 font-normal" : ""}
            w-full text-center`}>
              Edit Profile
            </p>
          </li>
        </Link>
        <Link to="/dashboard/tags">
          <li className=" h-16 border-b-[1px] border-gray-100 flex flex-col justify-center hover:bg-gray-100">
          <p className={`${location.pathname === '/dashboard/tags' ? "text-blue-500 font-normal" : ""}
            w-full text-center`}>
              Tags
            </p>
          </li>
        </Link>
        <Link to="/dashboard/orders">  
          <li className=" h-16 border-b-[1px] border-gray-100 flex flex-col justify-center hover:bg-gray-100">
          <p className={`${location.pathname === '/dashboard/orders' ? "text-blue-500 font-normal" : ""}
            w-full text-center`}>
              Orders
            </p>
          </li>
        </Link>
          <li
            className=" h-16 border-b-[1px] border-gray-100 flex flex-col justify-center hover:bg-gray-100"
            onClick={() => setShowModal(true)}
          >
          <p className="w-full text-center">Exit</p>
        </li>
      </ul>
      </div>
      {
        showModal ?
          <ConfirmDelete
          setShowModal={setShowModal}
          />
          :
          ""
      }
      </>
  )
}

export default DashboardMenu