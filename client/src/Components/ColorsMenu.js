const ColorsMenu = (props) => {

  const {color, index, setShowMenu, tag, setTag } = props

  return(
    <li
    className="p-[0.73rem] cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-blue-100"
    onClick={() => {
      setShowMenu(false)
      setTag({
        ...tag, color: {
          ...tag.color,
          value: color.value
      }})}
    }
    >
      {color.name}
    </li>
  )
}

export default ColorsMenu