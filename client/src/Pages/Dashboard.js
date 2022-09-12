import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  
  const { data } = useOutletContext()
  
  const years = [... new Set(data.me.myExpenses.map(expense => (expense.date.slice(0, 4))))].sort()
  
  const months = [{
    name: "January",
    number: '01'
    },
    {
      name: "February",
      number: '02'
      },
      {
        name: "March",
        number: '03'
      },
      {
        name: "April",
        number: '04'
      },
      {
        name: "May",
        number: '05'
      },
      {
        name: "June",
        number: '06'
      },
      {
        name: "July",
        number: '07'
      },
      {
        name: "August",
        number: '08'
      },
      {
        name: "September",
        number: '09'
      },
      {
        name: "October",
        number: '10'
      },
      {
        name: "November",
        number: '11'
      },
      {
        name: "December",
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
      months.map(month => {
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
      clone[index] = {...clone[index], amount}
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
      clone[index] = {...clone[index], amount}
    })

    setTagData(clone)
  }
   
    useEffect(() => {
      buildChartData()
      buildTagData()
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
              <p className="font-light text-sm mb-6">Your expenses chart based on time</p>
              <div>
                <div className="flex gap-2 justify-end w-full text-sm mb-6">
                  <p className="mt-1">Pick a year:</p>
                  <ul className="flex flex-col cursor-pointer">
                  <div
                    className={`text-gray-600 px-3 py-1 ${showMenu ? "bg-blue-100" : "bg-blue-50"}`}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    {pickedYear}
                  </div>
                  {
                    showMenu ?
                      years.reverse().map(year => (
                        <div
                          className="text-gray-600 px-3 py-1 bg-blue-50 hover:bg-blue-100"
                          onClick={() => {
                            setShowMenu(false)
                            setPickedYear(year)
                          }}
                        >
                        {year}
                      </div>
                      ))
                      :
                      ""
                  }
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-6 lg:w-1/2">
             <p className="font-light text-sm">Your expenses chart based on tags</p>
            </div>
          </div>
      }     
    </div>
  )
}

export default Dashboard