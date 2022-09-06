import { useState } from "react";
import ReactIconsBi from "react-icons/bi/index"
import { useOutletContext } from "react-router-dom";
import ColorsMenu from "../Components/ColorsMenu";
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";
import TagsList from "../Components/TagsList";


const ADD_TAG = gql`
mutation Create_tag($data: tagInfo!) {
  create_tag(data: $data) {
    status
  }
}
`

const Tags = () => {

  const {data, refetch } = useOutletContext()

  const [showAdd, setShowAdd] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [tag, setTag] = useState({
    name: {
      value: "",
      msg: ""
    },
    color: {
      value: "",
      msg: ""
    }
  })
  const colors = [
    {
      name:"Dark Gray",
      value: "#374151"
    },
    {
      name:"Light Gray",
      value: "#94a3b8"
    },
    {
      name:"Blue",
      value: "#3b82f6"
    },
    {
      name:"Purple",
      value: "#9333ea"
    },
    {
      name:"Yellow",
      value: "#facc15"
    },
    {
      name:"Pink",
      value: "#ec4899"
    },
  ]
  const tags = data.me.myTags
  const [AddTag] = useMutation(ADD_TAG)

  const addTag = async() => {
    try {
      await AddTag({
        variables: {
          "data": {
            "name": tag.name.value,
            "color": tag.color.value
          }
        }
      })

      toast.success("Tag added successfully!")
      refetch()
      setShowMenu(false)
      setShowAdd(false)
      setTag({
        name: {
          value: "",
          msg: ""
        },
        color: {
          value: "",
          msg: ""
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <div className=" text-gray-600">
      <h1 className="text-lg mb-2">Tags</h1>
      <p className="font-light mb-6">You can add or edit your tags here.</p>
      <div>
        {
          !tags[0] ?
            <p className="font-light text-sm">You have no tags yet. Start by adding new one!</p>
            :
            <ul className="shadow-2xl shadow-blue-500/10 lg:w-1/2">
              {
              tags.map((tag, index) => {
              return(
                <TagsList
                tags={tags}
                tag={tag}
                colors={colors}
                index={index}
                refetch={refetch}
                />
              )
            })
              }
            </ul>
        }
      </div>
      <div>
      <p
      className="mb-2 mt-8 w-max flex gap-1 items-center hover:text-blue-500 cursor-pointer text-sm font-medium"
      onClick={() => setShowAdd(!showAdd)}
      >
        {<ReactIconsBi.BiAddToQueue />}
        Add Tag
      </p>
      {
        showAdd ?
        <div
        className="bg-white lg:w-1/2 h-max  p-4 shadow-2xl shadow-blue-500/10 border-t-[1px] border-gray-100 text-sm"
        >
          <div className="flex">
          <div className="w-1/2 mb-4 mr-2">
            <label className={`${tag.name.msg ? "text-red-600 font-normal" : ""}`}>Name</label>
            <input
              placeholder="Enter your tag name"
              className={`${tag.name.msg ? "border-[1px] border-red-600" : ""}
              mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
              type="text"
              value={tag.name.value}
              onChange={(e) => {
                setTag({
                  ...tag, name: {
                    value: e.target.value.trimStart(),
                    msg: ""
                }})
              }}
            />
              <p className="text-sm text-red-600 font-normal mt-1">{tag.name.msg}</p>
            </div>
            <div className="w-1/2 mb-4 ml-2 relative">
              <label className={`${tag.color.msg ? "text-red-600 font-normal" : ""}`}>Color</label>
              <div
              className={`${showMenu? "bg-blue-100" : "bg-blue-50"} 
              ${tag.color.msg ? "border-[1px] border-red-600" : ""}
              ${tag.color.value ? "text-gray-600" : "text-gray-400"}
              p-[0.73rem] mt-2 cursor-pointer `}
              onClick={() => {
                setShowMenu(!showMenu)
                setTag({
                  ...tag, color: {
                    ...tag.color,
                    msg: ""
                }})}
              }
              >
                {
                  
                tag.color.value ? 
                colors.find(item => item.value === tag.color.value).name
               :
                "Pick a color"  
              }
              </div>
              {
                showMenu ? 
                <ul className="absolute top-18 bg-blue-50 w-full">
                  {      
                    colors.map((color, index) => {
                      return <ColorsMenu
                      color={color}
                      index={index}
                      setShowMenu={setShowMenu}
                      tag={tag}
                      setTag={setTag}
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
          <button className="bg-blue-500 text-white px-6 py-2 font-medium"
            onClick={addTag}
          >
            Add 
            </button>
        </div>
        </div>
        :
        ""
      }
      </div>
    </div>
  )
}

export default Tags