import { useState } from "react"
import ConfirmModal from "./ConfirmModal"

const ExpensesList = ({ expense, index, refetch }) => {
  
  const [showModal, setShowModal] = useState(false)

  return (

    <li className="flex items-center gap-2 w-full p-6 text-sm">
      <div className="sm:w-1/5 w-1/4">
      {expense.amount} $
      </div>
      <div className=" flex items-center gap-2">
      <div className="w-4 h-4 rounded-full"
      style={{background: expense.tags[0].color}}>
      </div>
        {expense.tags[0].name}
      </div>
      <button
          className="w-max ml-auto text-gray-400 hover:text-blue-500"
          onClick={() => setShowModal(true)}
      >
      Remove
      </button>
      {
         showModal ?
        <ConfirmModal
            setShowModal={setShowModal}
            useFor="remove"
            _id={expense._id}
            refetch={refetch}
        />
        :
        ""
     }
    </li>

  )
}

export default ExpensesList