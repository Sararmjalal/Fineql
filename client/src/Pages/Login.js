import { useState } from "react"
import { gql, useMutation } from '@apollo/client';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const cookie = new Cookies()

  const navigate = useNavigate()

  const [thisUser, setThisUser] = useState({
    username: {
      value: "",
      msg: ""
    },
    password: {
      value: "",
      msg: ""
    }
  })

  const LOGIN = gql`
    mutation Signup($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
      }
    }
  `
  const [Login] = useMutation(LOGIN)

  const login = async () => {
    
    if (!thisUser.username.value)
      return setThisUser({ ...thisUser, username: { ...thisUser.username, msg: "Please enter username!" } })
    
    if (!thisUser.password.value)
      return setThisUser({ ...thisUser, password: { ...thisUser.password, msg: "Please enter password!" } })

    try {

      const x = await Login ({
        variables: {
          "username": thisUser.username.value,
          "password": thisUser.password.value
        }
      })

      cookie.set('ut', x.data.login.token, { path: '/' })
      
      window.location.assign('/dashboard')

    } catch (error) {

      if (error.message === "bad request")
        return setThisUser({ ...thisUser, username: { ...thisUser.username, msg: "This username doesn't exists." }})
      
      if (error.message === "password doesnt match")
       return setThisUser({ ...thisUser, password: { ...thisUser.password, msg: "Wrong password. Try again!" }})
        
    }

  }

  return (
    <div
      className="font-light"
      onKeyDown={(e) => {
        if (e.key === "Enter")
          login()
      }}
    >
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
        onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login