import { useState } from "react";
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

  const [pickedYear, setPickedYear] = useState(years[years.length - 1])

  const clone = []
  
  const expenses = data.me.myExpenses
    .filter(expense => expense.date.slice(0, 4) == pickedYear)
    .map(expense => {
      months.map(month => {
        if (month.number === expense.date.slice(5, 7))
          return clone.push({
            amount: expense.amount,
            month: month.name,
          })
      })
    })
  
  // setChartData(clone)
  
// setTimeout(() => {
//   chartData.forEach((item, i, ref) => {
//     if (ref[i].month === ref[i + 1].month){
//       ref[i].amount = ref[i + 1].amount
//       ref.slice(i + 1, 1)
//     }
//   })
// }, 500);
  
  const x = new Map(clone)

  console.log(x)
  
  let obj = {}

  clone.forEach(item => {
    // console.log(x.get(item.month))
    // if (!obj[item.month]) 
    //   return obj = {
    //     ...obj, x: item.amount
    //   }

    // obj = {...obj, amount: obj.amount + item.amount}
    if (!obj[item.month])
      return obj[item.month] = item.amount
    obj[item.month] += item.amount
  })

  console.log(obj)

  console.log(clone)

  // const highestAmount = expenses.reduce((acc, cur) => (
  //   cur.amount > acc ? Number(cur.amount) : acc
  // ), 0)
  

  // const amounts = [highestAmount, highestAmount * 4 / 5, highestAmount * 3 / 5, highestAmount * 2 / 5, highestAmount / 5, 0]

  const [showMenu, setShowMenu] = useState(false)

  console.log(expenses)

  return (
    <div className=" text-gray-600">
      <h1 className="text-lg mb-2">Dashboard</h1>
      <p className="font-light mb-6">You can see chart of your expenses here.</p>
      {
          !expenses[0] ?
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