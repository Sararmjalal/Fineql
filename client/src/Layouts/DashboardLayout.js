import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import Loading from "../Components/Loading"
import DashboardMenu from "../Components/DashboardMenu"
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
query Me {
  me {
    _id
    name
    username
    img
    myTags {
      _id
      name
      color
    }
    myExpenses {
      _id
      amount
      tags {
        _id
        name
        color
      }
      geo {
        lat
        lon
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }
  }
}
`
const DashboardLayout = () => {

  const cookie = new Cookies()
  const navigate = useNavigate()
  const [mobileMenu, setMobileMenu] = useState(false)
  const { data, loading, refetch } = useQuery(GET_USER)

  useEffect(() => {
    if (!cookie.get("ut"))
      navigate("/login")
    if (data)
      refetch()
  }, [])
  
  if (loading) return <Loading />
  
  return (
    <div className="w-full">
      <DashboardMenu
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        thisUser={data.me}
        refetch={refetch}
      />
      <div
        className="sm:ml-[17.5rem] min-h-screen overflow-y-auto m-6"
        onClick={() => setMobileMenu(false)}
      >
        <Outlet
        context={{data, refetch}}
        />
      </div>
    </div>
  )
  
}

export default DashboardLayout 