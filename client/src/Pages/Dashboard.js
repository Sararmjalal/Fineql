import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const Dashboard = () => {
  console.log("age kar nakoni mamanet ...")
  
  const { data, refetch } = useOutletContext()
  
  const years = [... new Set(data.me.myExpenses.map(expense => (expense.date.slice(0, 4))))].sort()
  
  const months = [{
    name: "Jan",
    number: '01'
    },
    {
      name: "Feb",
      number: '02'
      },
      {
        name: "Mar",
        number: '03'
      },
      {
        name: "Apr",
        number: '04'
      },
      {
        name: "May",
        number: '05'
      },
      {
        name: "Jun",
        number: '06'
      },
      {
        name: "Jul",
        number: '07'
      },
      {
        name: "Aug",
        number: '08'
      },
      {
        name: "Sep",
        number: '09'
      },
      {
        name: "Oct",
        number: '10'
      },
      {
        name: "Nov",
        number: '11'
      },
      {
        name: "Dec",
        number: '12'
      },
  ]

  const [chartData, setChartData] = useState([])

  const [tagData, setTagData] = useState([])

  const [showMenu, setShowMenu] = useState(false)

  const [pickedYear, setPickedYear] = useState(years[years.length - 1])
  
  const buildChartData = () => {
   
    const array = []
    let obj = {}

    data.me.myExpenses.filter(expense => expense.date.slice(0, 4) == pickedYear).forEach(expense => {
      months.forEach(month => {
        if (month.number === expense.date.slice(5, 7))
          return array.push({
            amount: expense.amount,
            month: month.name,
          })
          array.push(
            {
              amount: 0,
              month: month.name,
            }
            )
          })
        })
        
    array.forEach(item => {
      if (!obj[item.month])
      return obj[item.month] = item.amount
      obj[item.month] += item.amount
    })
      
    const monthes = Object.keys(obj)
    const amounts = Object.values(obj)
    const clone = []

    monthes.forEach(month => {
      clone.push({month})
    })

    amounts.forEach((amount, index) => {
      clone[index] = {...clone[index], Amount: amount}
    })

    setChartData(clone)

  }    

  const buildTagData = () => {

      const array = []
      let obj = {}

      data.me.myTags.forEach(tag => {
        data.me.myExpenses.filter(expense => expense.date.slice(0, 4) == pickedYear).forEach(expense => {
          if(expense.tags[0]._id === tag._id)
          return array.push({
            name: tag.name,
            amount: expense.amount
          })
          array.push({
            name: tag.name,
            amount: 0
          })
        })
      })

      array.forEach(item => {
        if(obj[item.name])
        return obj[item.name] += item.amount
        obj[item.name] = item.amount
      })

    const tags = Object.keys(obj)
    const amounts = Object.values(obj)
    const clone = []

    tags.forEach(tag => {
      clone.push({tag})
    })

    amounts.forEach((amount, index) => {
      clone[index] = {...clone[index], Amount: amount}
    })

    setTagData(clone)
  }
   
    useEffect(() => {
      buildChartData()
      buildTagData()
      refetch()
    }, [pickedYear])

    console.log("tagdata", tagData)
    console.log("chartdata", chartData)

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