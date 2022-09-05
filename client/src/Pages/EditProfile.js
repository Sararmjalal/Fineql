import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";
import { DOMAIN } from "../config/constants";

const EDIT_ME = gql`
mutation EditMe($name: String!, $img: Upload) {
  editMe(name: $name, img: $img) {
    status
  }
}
`

const EditProfile = () => {

  const { data, refetch } = useOutletContext()

  const [thisUser, setThisUser] = useState({
    name: {
      value: data.me.name,
      msg: ""
    },
    img: data.me.img
  })

  const [file, setFile] = useState(null)

  const [EditME] = useMutation(EDIT_ME)

  // useEffect(() => {
  //   if (file) {

  //     const fileReader = new FileReader()

  //     fileReader.onload = function (e) {
  //       setThisUser({ ...thisUser, img: e.target.result })
  //     }

  //     fileReader.readAsDataURL(file)
  //   }
  // }, [file])

  const edit = async () => {

    if (!thisUser.name.value) return setThisUser({
      ...thisUser,
      name: { ...thisUser.name, msg:"Name cannot be empty!" }
    })
      
    try {
      const x = await EditME({
        variables: {
          "name": thisUser.name.value,
          "img": file
        }
      })

      refetch()

      toast.success("Your profile edited successfully!")

    } catch (error) {
      console.error(error.message)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className=" text-gray-600">
      <h1 className="text-lg mb-2">Edit Profile</h1>
      <p className="font-light mb-6">You can edit your profile here.</p>
        <div className="w-72 mx-auto sm:mx-0">
          <label htmlFor="fileInput">
            <div className="bg-gray-100 hover:bg-gray-200 h-48 w-full cursor-pointer mb-4 flex flex-col justify-center">
              <img className={`${thisUser.img? "" : "hidden"} w-full h-full object-cover`}
              src={`${DOMAIN}/${thisUser.img}`}
              onError={(e) => e.target.src = thisUser.img}
            />
            <p className={`${thisUser.img? "hidden" : ""} text-center text-gray-400 font-light text-sm`}>Select image to upload</p>
          </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/jpg, image/jpeg, image/png"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        
        <label className={`${thisUser.name.msg ? "text-red-600 font-normal" : ""}`}>Name</label>
        <input
          placeholder="Enter your name"
          className={`${thisUser.name.msg ? "border-[1px] border-red-600" : ""}
          mt-2 bg-gray-100 focus:bg-gray-200 shadow-2xl shadow-blue-500/10 p-3 outline-none w-full`}
          type="text"
          value={thisUser.name.value}
          onChange={(e) => {
            setThisUser({
              ...thisUser, name: {
                value: e.target.value.trimStart(),
                msg: ""
            }})
          }}
        />
        <p className="text-sm text-red-600 font-normal mt-1">{thisUser.name.msg}</p>
        <div className="flex justify-end mt-4 mb-1">
          <button className="bg-gray-800 text-white px-6 py-2 hover:bg-black font-normal"
            onClick={edit}
          >
            Edit 
            </button>
        </div>
        </div>
    </div>
  )
}

export default EditProfile