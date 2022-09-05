import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

const Home = () => {

  const cookie = new Cookies()

  const navigate = useNavigate()

  useEffect(() => {

    if (cookie.get("ut"))
      window.location.assign('/dashboard')
    
    navigate('/login')

  }, [])

}

export default Home