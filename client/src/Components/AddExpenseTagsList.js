const AddExpenseTagsList = ({tag, setShowMenu, thisExpense, setThisExpense}) => {

  return (
    <li
    className="p-[0.73rem] cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-blue-100"
    onClick={() => {
      setShowMenu(false)
      setThisExpense({
        ...thisExpense,
        tag: {
          value: tag._id,
          msg:""
        }
      })
    }}
    >
      {tag.name}
    </li>
  )
}

export default AddExpenseTagsList