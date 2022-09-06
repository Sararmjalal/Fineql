import { useState } from "react"
import ColorsMenu from "./ColorsMenu"
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";


const EDIT_TAG = gql`
mutation Edit_tag($id: ID!, $data: tagInfo!) {
  edit_tag(_id: $id, data: $data) {
    status
  }
}

`

const TagsList = ({tags, tag, colors, index, refetch}) => {

  const [editmode, setEditmode] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [thisTag, setThisTag] = useState(null)

  const [EditTag] = useMutation(EDIT_TAG)

  const setInitial = (_id) => {
    const thisTag = tags.find(item => item._id === _id)
    setThisTag({
      _id,
      name: {
        value: thisTag.name,
        msg: ""
      },
      color: {
        value: thisTag.color,
        msg: ""
      }
    })
  }

  const editTag = async() => {
    try {
      await EditTag({
        variables:{
          "id": thisTag._id,
          "data": {
            "name": thisTag.name.value,
            "color": thisTag.color.value
          }
        }
      })

      setEditmode(false)

      toast.success("Tag edited successfully!")

      await refetch()

    } catch (error) {
      toast.error("Something went wrong. Please try again!")

    }
  }

  return(
    <>
    <li className="flex items-center gap-2 w-full p-5 text-sm">
      <div className="w-6 h-6 rounded-full"
      style={{background: tag.color}}
      >
      </div>
      {tag.name}
      <button
      className="w-max ml-auto text-gray-400 hover:text-blue-500"
      onClick={() => {
        setEditmode(!editmode)
        setInitial(tag._id)
      }}
      >
        Edit
      </button>
    </li>
    {
        editmode ?
        <div
        className="bg-white h-max  p-4 border-t-[1px] border-b-[1px] border-gray-100 text-sm"
        >
          <div className="flex">
          <div className="w-1/2 mb-4 mr-2">
            <label className={`${thisTag.name.msg ? "text-red-600 font-normal" : ""}`}>Name</label>
            <input
              placeholder="Enter your tag name"
              className={`${thisTag.name.msg ? "border-[1px] border-red-600" : ""}
              mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
              type="text"
              value={thisTag.name.value}
              onChange={(e) => {
                setThisTag({
                  ...thisTag, name: {
                    value: e.target.value.trimStart(),
                    msg: ""
                }})
              }}
            />
              <p className="text-sm text-red-600 font-normal mt-1">{tag.name.msg}</p>
            </div>
            <div className="w-1/2 mb-4 ml-2 relative">
              <label className={`${thisTag.color.msg ? "text-red-600 font-normal" : ""}`}>Color</label>
              <div
              className={`${showMenu? "bg-blue-100" : "bg-blue-50"} 
              ${thisTag.color.msg ? "border-[1px] border-red-600" : ""}
              ${thisTag.color.value ? "text-gray-600" : "text-gray-400"}
              p-[0.73rem] mt-2 cursor-pointer `}
              onClick={() => {
                setShowMenu(!showMenu)
                setThisTag({
                  ...thisTag, color: {
                    ...thisTag.color,
                    msg: ""
                }})}
              }
              >
                {colors.find(item => item.value === thisTag.color.value).name}
              </div>
              {
                showMenu ? 
                <ul className="absolute top-18 bg-blue-50 w-full z-30">
                  {      
                    colors.map((color, index) => {
                      return <ColorsMenu
                      color={color}
                      index={index}
                      setShowMenu={setShowMenu}
                      tag={thisTag}
                      setTag={setThisTag}
                      />
                    })
                  }
                </ul>  
                :
                ""
              }
              <p className="text-sm text-red-600 font-normal mt-1">{tag.color.msg}</p>
            </div> 
          </div>
          <div className="flex justify-end mb-1">
          <button className="bg-blue-500 text-white px-6 py-2 font-medium outline-none"
            onClick={editTag}
          >
            Edit 
            </button>
        </div>
        </div>
        :
        ""
      }
    </>
  )
}

export default TagsList