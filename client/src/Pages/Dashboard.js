import { useOutletContext } from "react-router-dom";

const Dashboard = () => {

  const { data } = useOutletContext()

  const thisUser = data.me

  return (
    <h1>Dashboard</h1>
  )
}

export default Dashboard