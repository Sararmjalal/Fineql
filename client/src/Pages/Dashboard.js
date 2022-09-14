import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const Dashboard = () => {

  const { data, refetch } = useOutletContext()
  
  const years = [... new Set(data.me.myExpenses.map(expense => (expense.date.slice(0, 4))))].sort()
  
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  }

  const [chartData, setChartData] = useState([])

  const [tagData, setTagData] = useState([])

  const [showMenu, setShowMenu] = useState(false)

  const [pickedYear, setPickedYear] = useState(years[years.length - 1])
  
  const buildChartData = () => {

    const obj = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    }

    data.me.myExpenses
      .filter(expense => expense.date.slice(0, 4) == pickedYear)
      .forEach(expense => obj[months[expense.date.slice(5, 7)]] += expense.amount);
    
    const newData = Object.entries(obj).map(([key, value]) => ({
      month: key,
      Amount: value
    }));

    setChartData(newData)

  }    

  const buildTagData = () => {

    const { myTags, myExpenses } = data.me

    const obj = {}

    myTags.forEach(tag => {
        obj[tag.name] = 0
    })
    
    myExpenses
      .filter(({ date }) => date.slice(0, 4) == pickedYear)
      .forEach(({ tags, amount }) => obj[tags[0].name] += amount);
    
    const newData = Object.entries(obj).map(([key, value]) => ({
      tag: key,
      Amount: value
    }));

    setTagData(newData)

  }
   
    useEffect(() => {
      buildChartData()
      buildTagData()
      refetch()
    }, [pickedYear])


  return (
    <div className=" text-gray-600">
      <h1 className="text-lg mb-2">Dashboard</h1>
      <p className="font-light mb-6">You can see chart of your expenses here.</p>
      {
          !data.me.myExpenses[0] ?
            <p className="font-light text-sm">You have no expenses yet.</p>
          :
          <div>
            <div className="mb-6 lg:w-1/2">
              <p className="mb-6">Your expenses chart based on time</p>
              <div className="relative">
                <div className="flex gap-2 justify-end w-full text-sm mb-6">
                  <p className="mt-1 mr-[3.7rem]">Pick a year:</p>
                  <ul className="flex flex-col cursor-pointer absolute z-50">
                  <div
                    className={`text-gray-600 px-3 py-1 ${showMenu ? "bg-blue-100" : "bg-blue-50"} relative`}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    {pickedYear}
                  </div>
                  {
                    showMenu ?
                      years.reverse().map(year => (
                        <li
                          className="text-gray-600 px-3 py-1 bg-blue-50 hover:bg-blue-100"
                          onClick={() => {
                            setShowMenu(false)
                            setPickedYear(year)
                          }}
                        >
                        {year}
                      </li>
                      ))
                      :
                      ""
                  }
                  </ul>
                </div>
                <div className="w-full">
                <LineChart width={800} height={400} data={chartData} fontSize={14}>
                  <Line type="monotone" dataKey="Amount" stroke="#3b82f6" strokeWidth={2} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip wrapperStyle={{outline: "none"}}/>
                </LineChart>
                </div>
              </div>
            </div>
            <div className="mb-24 lg:w-1/2">
              <p className="mb-8">Your expenses chart based on tags</p>
              <div>
              <BarChart width={800} height={400} data={tagData} fontSize={14}>
                <XAxis dataKey="tag" fontSize={14} />
                <YAxis />
                <Tooltip wrapperStyle={{outline: "none"}} fontSize={14} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="Amount" fill="#3b82f6" barSize={30} />
              </BarChart>
              </div>
            </div>
          </div>
      }     
    </div>
  )
}

export default Dashboard