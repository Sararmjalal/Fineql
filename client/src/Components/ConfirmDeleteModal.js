import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";


const REMOVE_EXPENSE = gql`
mutation Delete_expense($id: ID!) {
  delete_expense(_id: $id) {
    status
  }
}
`

const ConfirmDelete = ({setShowModal, useFor, _id, refetch}) => {

  const cookie = new Cookies()
  const navigate = useNavigate()

  const [RemoveExpense] = useMutation(REMOVE_EXPENSE)

  const logout = () => {
    cookie.remove('ut', { path: "/" })
    toast.info("You've logged out.")
    navigate('/login')
  }

  const remove = async() => {
    try {
      await RemoveExpense({
        variables: {
          "id": _id
        }
      })

      toast.success("Expense removed successfully!")

      refetch()

    } catch (error) {
      toast.error("Something went wrong. Please try again!")  
    }
    finally {
      setShowModal(false)
    }
  }

  return (
    <>
    <div
    className="bg-black fixed top-0 left-0 w-screen h-screen opacity-50 z-[9999]"
    onClick={() => setShowModal(false)}></div>
    <div
      onKeyDown={(e) => {
       if (e.key === 'Enter' && useFor === "logout")
          return logout()
          remove()
      }}
        className="font-light text-gray-600 bg-white p-5 sm:w-[30rem] h-48 w-11/12 fixed top-[calc(50vh-10rem)]
      sm:left-[calc(50vw-15rem)] left-[calc(50vw-45.8%)] z-[10000]">
        <h1 className="mb-5	text-xl">
          { useFor === "logout" ?
            "Logout"
            :
            "Remove Item"
          }
        </h1>
        <div className="h-8 mt-2 ">
         { useFor === "logout" ?
            "Are you sure you want to logout?"
            :
            "Are you sure you want to delete this item?"
          }
        </div>
      <div className="flex">
        <div className="w-1/2">
          <button
            className="w-full mt-3 mb-12 mr-2 bg-gray-800 text-white px-6 py-3 hover:bg-black font-normal"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
          <div className="w-1/2 pl-2">
            <button
              className="w-full mt-3 mb-12 mr-2 bg-gray-200 px-6 py-3 hover:bg-gray-800 hover:text-white font-normal"
              onClick={() => {
                useFor === "logout" ?
                  logout()
                  :
                  remove()
                }}
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