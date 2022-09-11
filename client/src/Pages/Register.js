import { useEffect, useState } from "react"
import { gql, useMutation } from '@apollo/client';
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const REGISTER = gql`
mutation Signup($name: String!, $username: String!, $password: String!) {
  signup(name: $name, username: $username, password: $password) {
    token
  }
}
`

const Register = () => {
  
  const cookie = new Cookies()
  
  const navigate = useNavigate()
  
  const location = useLocation()
  
  const [thisUser, setThisUser] = useState({
    name: {
      value: "",
      msg: ""
    },
    username: {
      value: "",
      msg: ""
    },
    password: {
      value: "",
      msg: ""
    }
  })
  
  useEffect(() => {
    if (location.pathname !== "/login/register" || location.search !== "?=true")
      
      return navigate("/error-404")

  }, [])
  
  const [Register] = useMutation(REGISTER)
  
  const register = async () => {
    
    if (!thisUser.name.value)
      return setThisUser({ ...thisUser, name: { ...thisUser.name, msg: "Please enter name!" } })
      
      if (!thisUser.username.value)
      return setThisUser({ ...thisUser, username: { ...thisUser.username, msg: "Please enter username!" } })
    
    if (!thisUser.password.value)
    return setThisUser({ ...thisUser, password: { ...thisUser.password, msg: "Please enter password!" } })

    try {
      
      const x = await Register ({
        variables: {
          "name": thisUser.name.value,
          "username": thisUser.username.value,
          "password": thisUser.password.value
        }
      })

      cookie.set('ut', x.data.signup.token, { path: '/' })
      
      window.location.assign("/dashboard")

    } catch (error) {
      
      if (error.message === "this username already exists")
        return setThisUser({ ...thisUser, username: { ...thisUser.username, msg: "This username already exists." }})

    }

  }


  return (
        <div
        className="font-light"
        onKeyDown={(e) => {
          if (e.key === "Enter")
            return register()
        }}
      >
      <div className="w-full mb-4">
        <label className={`${thisUser.name.msg ? "text-red-600 font-normal" : ""}`}>Name</label>
        <input
          placeholder="Enter your name"
          className={`${thisUser.name.msg ? "border-[1px] border-red-600" : ""}
          mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full text-sm`}
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
        </div>
      <div className="flex w-full">
      <div className="w-1/2 mr-2">
        <label className={`${thisUser.username.msg ? "text-red-600 font-normal" : ""}`}>Username</label>
        <input
          placeholder="Enter your username"
          className={`${thisUser.username.msg ? "border-[1px] border-red-600" : ""}
          mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full text-sm`}
          type="text"
          value={thisUser.username.value}
          onChange={(e) => {
            setThisUser({
              ...thisUser, username: {
                value: e.target.value.trimStart(),
                msg: ""
            }})
          }}
        />
        <p className="text-sm text-red-600 font-normal mt-1">{thisUser.username.msg}</p>
      </div>
      <div className="w-1/2 ml-2">
        <label className={`${thisUser.password.msg ? "text-red-600 font-normal" : ""}`}>Password</label>
        <input
          placeholder="Enter your password"
          className={`${thisUser.password.msg ? "border-[1px] border-red-600" : ""}
          mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full text-sm`}
          type="password"
          value={thisUser.password.value}
          onChange={(e) => {
            setThisUser({
              ...thisUser, password: {
                value: e.target.value.trim(),
                msg: ""
            }})
          }}
        />
        <p className="text-sm text-red-600 font-normal">{thisUser.password.msg}</p>
      </div>
    </div>
    <div className="flex justify-end mt-4 mb-1">
        <button className="bg-blue-500 text-white px-6 py-2 font-medium outline-none"
          onClick={register}
      >
        Register
      </button>
    </div>
  </div>
  )
  
}

export default Register 