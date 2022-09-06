import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReactIconsBi from "react-icons/bi/index"


const Expenses = () => {

  const { data } = useOutletContext()
  const expenses = data.me.myExpenses
  const [showAdd, setShowAdd] = useState(false)


  return (
    <div className=" text-gray-600">
    <h1 className="text-lg mb-2">Expenses</h1>
    <p className="font-light mb-6">You can add or remove expenses here.</p>
    {
        !expenses[0] ?
          <p className="font-light text-sm">You have no expenses yet.</p>
        :
        "Hello"
    }     
      <div>
          <p
          className="mb-2 mt-8 w-max flex gap-1 items-center hover:text-blue-500 cursor-pointer text-sm font-medium"
          onClick={() => setShowAdd(!showAdd)}
          >
            {<ReactIconsBi.BiAddToQueue />}
            Add Expense
          </p>
          {
        showAdd ?
        <div
        className="bg-white lg:w-1/2 h-72  p-4 shadow-2xl shadow-blue-500/10 border-t-[1px] border-gray-100 text-sm"
        >
         
        </div>
        :
        ""
      }
       </div>

  </div>
  )
}

export default Expenses