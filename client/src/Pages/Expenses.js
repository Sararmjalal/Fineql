import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import ReactIconsBi from "react-icons/bi/index"
import { toast } from "react-toastify";
import AddExpenseTagsList from "../Components/AddExpenseTagsList";
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css";

const ADD_EXPENSE = gql`
mutation Create_expense($data: ExpenseInfo!) {
  create_expense(data: $data) {
    status
  }
}
`
const Expenses = () => {

  const { data, refetch } = useOutletContext()
  const expenses = data.me.myExpenses
  const tags = data.me.myTags
  const [showAdd, setShowAdd] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [thisExpense, setThisExpense] = useState({
    amount: {
      value: "",
      msg:""
    },
    geo: {
      lat: "35.73825",
      lon: "51.50962"
    },
    tag: {
      value: "",
      msg:""
    },
    date: {
      value: "",
      msg: ""
    },
      MunicipalityZone: {
        value: "",
        msg:""
      },
      Neighbourhood: {
        value: "",
        msg:""
      },
      FormattedAddress: {
        value: "",
        msg:""
      },
      Place: {
        value: "",
        msg:""
      }
  })

  const [AddExpense] = useMutation(ADD_EXPENSE)

  const addExpense = async () => {
    const keys = Object.keys(thisExpense)
    const values = Object.values(thisExpense)
    const checkifEmptyValues = values.every(item => !item.value)

    if(checkifEmptyValues) return values.forEach(item => {
      if (!item.value) {
        item.msg = "This field cannot be empty!"
        keys.forEach(element => {
        setThisExpense({
          ...thisExpense,
          element: item
        })
        })
      }
    })

    try {
      await AddExpense({
        variables: {
          "data": {
            "amount": parseFloat(thisExpense.amount.value),
            "geo": {
              "lat": parseFloat(thisExpense.geo.lat),
              "lon": parseFloat(thisExpense.geo.lon)
            },
            "tags": [thisExpense.tag.value],
            "date": thisExpense.date.value,
            "address": {
              "MunicipalityZone": parseFloat(thisExpense.MunicipalityZone.value),
              "Neighbourhood": thisExpense.Neighbourhood.value,
              "FormattedAddress": thisExpense.FormattedAddress.value,
              "Place": thisExpense.Place.value
            }
          }
        }
      })

      toast.success("Expense added successfully!")
      refetch()
      setShowMenu(false)
      setShowAdd(false)
      setThisExpense({
        amount: {
          value: "",
          msg:""
        },
        geo: {
          lat: "35.73825",
          lon: "51.50962"
        },
        tag: {
          value: "",
          msg:""
        },
        date: {
          value: "",
          msg: ""
        },
          MunicipalityZone: {
            value: "",
            msg:""
          },
          Neighbourhood: {
            value: "",
            msg:""
          },
          FormattedAddress: {
            value: "",
            msg:""
          },
          Place: {
            value: "",
            msg:""
          }
      })

    } catch (error) {
      toast.error("Something went wrong. Please try again!")
    }
    
  }
  
  return (
    <div className=" text-gray-600">
    <h1 className="text-lg mb-2">Expenses</h1>
    <p className="font-light mb-6">You can add or remove expenses here.</p>
    {
        !expenses[0] ?
        <p className="font-light text-sm">You have no expenses yet. Start by adding new one!</p>
        :
        "Hello"
    }     
      <div className="text-sm">
          <p
          className="mb-2 mt-8 w-max flex gap-1 items-center hover:text-blue-500 cursor-pointer font-medium"
          onClick={() => setShowAdd(!showAdd)}
          >
            {<ReactIconsBi.BiAddToQueue />}
            Add Expense
          </p>
          {
        showAdd ?
        <div
        className="bg-white lg:w-1/2 p-4 shadow-2xl shadow-blue-500/10 border-t-[1px] border-gray-100 mb-6"
        >
         <div className="sm:flex gap-3 items-center">
          <div className="sm:w-1/2 mb-4">
            <label className={`${thisExpense.amount.msg ? "text-red-600 font-normal" : ""}`}>Amount</label>
            <div className={`${thisExpense.amount.msg ? "border-[1px] border-red-600" : ""}
            flex gap-1 items-center bg-blue-50 mt-2 pr-2`}>         
            <input
              placeholder="Enter expense amount"
              className={`
              bg-blue-50 p-3 outline-none w-full`}
              type="number"
              value={thisExpense.amount.value}
              onChange={(e) => {
                setThisExpense({
                  ...thisExpense, amount: {
                    value: e.target.value.trimStart(),
                    msg: ""
                }
              })
              }}
              />
                    <ReactIconsBi.BiDollar />
            </div>
              <p className=" text-red-600 font-normal mt-1">{thisExpense.amount.msg}</p>
            </div>
            <div className="sm:w-1/2 mb-4 sm:ml-0.5 relative">
              <label className={`${thisExpense.tag.msg ? "text-red-600 font-normal" : ""}`}>Tag</label>
              <div
              className={`${showMenu? "bg-blue-100" : "bg-blue-50"} 
              ${thisExpense.tag.msg ? "border-[1px] border-red-600" : ""}
              ${thisExpense.tag.value ? "text-gray-600" : "text-gray-400"}
              p-[0.73rem] mt-2 cursor-pointer `}
              onClick={() => {
                setShowMenu(!showMenu)
                setThisExpense({
                  ...thisExpense, tag: {
                    ...thisExpense.tag,
                    msg: ""
                  }
                })
              }
              }
              >
                {
                  
                thisExpense.tag.value ? 
                tags.find(item => item._id === thisExpense.tag.value).name
               :
                "Pick a tag"  
              }
              </div>
              {
                showMenu ? 
                <ul className="absolute top-18 bg-blue-50 w-full">
                  {      
                      tags.map((tag, index) => {
                      return <AddExpenseTagsList
                      tag={tag}
                      index={index}
                        setShowMenu={setShowMenu}
                        thisExpense={thisExpense}
                        setThisExpense={setThisExpense}
                      />
                    })
                  }
                </ul>  
                :
                ""
              }
              <p className=" text-red-600 font-normal mt-1">{thisExpense.tag.msg}</p>
            </div> 
              </div>
                <div className="sm:w-1/2 pr-2">
                  <label className={`${thisExpense.date.msg ? "text-red-600 font-normal" : ""}`}>Date</label>
                  <input
                    className={`${thisExpense.date.msg ? "border-[1px] border-red-600" : ""}
                    mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full cursor-pointer`}
                    type="date"
                    value={thisExpense.date.value}
                      onChange={(e) => 
                      setThisExpense({
                        ...thisExpense, date: {
                          value: e.target.value,
                          msg: ""
                        }
                      })
                    }
                  />
                  <p className=" text-red-600 font-normal mt-1">{thisExpense.date.msg}</p>
              </div>
              <p className="text-base my-6 font-medium">Address</p>
              <div className="sm:flex gap-3 items-center">
                <div className="sm:w-1/2 mb-4">
                <label className={`${thisExpense.MunicipalityZone.msg ? "text-red-600 font-normal" : ""}`}>Municipality Zone</label>
                  <input
                    placeholder="Enter municipality zone number"
                    className={`${thisExpense.MunicipalityZone.msg ? "border-[1px] border-red-600" : ""}
                    mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
                    type="number"
                    value={thisExpense.MunicipalityZone.value}
                      onChange={(e) => 
                      setThisExpense({
                        ...thisExpense,
                          MunicipalityZone: {
                          value: e.target.value.trimStart(),
                            msg: ""
                          }
                        }
                      )
                    }
                  />
                  <p className=" text-red-600 font-normal mt-1">{thisExpense.MunicipalityZone.msg}</p>
                </div>
                <div className="sm:w-1/2 mb-4">
                <label className={`${thisExpense.Neighbourhood.msg ? "text-red-600 font-normal" : ""}`}>Neighbourhood</label>
                  <input
                    placeholder="Enter neighbourhood"
                    className={`${thisExpense.Neighbourhood.msg ? "border-[1px] border-red-600" : ""}
                    mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
                    type="text"
                    value={thisExpense.Neighbourhood.value}
                      onChange={(e) => 
                      setThisExpense({
                        ...thisExpense, Neighbourhood: {
                          value: e.target.value.trimStart(),
                          msg: ""
                        }
                      })
                    }
                  />
                  <p className=" text-red-600 font-normal mt-1">{thisExpense.Neighbourhood.msg}</p>
                </div>
              </div>    
              <div className="sm:flex gap-3 items-center">
                <div className="sm:w-1/2 mb-4">
                <label className={`${thisExpense.FormattedAddress.msg ? "text-red-600 font-normal" : ""}`}>Formatted Address</label>
                  <input
                    placeholder="Enter formatted address"
                    className={`${thisExpense.FormattedAddress.msg ? "border-[1px] border-red-600" : ""}
                    mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
                    type="text"
                    value={thisExpense.FormattedAddress.value}
                      onChange={(e) => 
                      setThisExpense({
                        ...thisExpense, FormattedAddress: {
                          value: e.target.value.trimStart(),
                          msg: ""
                        }
                      })
                    }
                  />
                  <p className=" text-red-600 font-normal mt-1">{thisExpense.FormattedAddress.msg}</p>
                </div>
                <div className="sm:w-1/2 mb-4">
                <label className={`${thisExpense.Place.msg ? "text-red-600 font-normal" : ""}`}>Place</label>
                  <input
                    placeholder="Enter place"
                    className={`${thisExpense.Place.msg ? "border-[1px] border-red-600" : ""}
                    mt-2 bg-blue-50 focus:bg-blue-100  p-3 outline-none w-full`}
                    type="text"
                    value={thisExpense.Place.value}
                      onChange={(e) => 
                      setThisExpense({
                        ...thisExpense, Place: {
                          value: e.target.value.trimStart(),
                          msg: ""
                        }
                      })
                    }
                  />
                  <p className=" text-red-600 font-normal mt-1">{thisExpense.Place.msg}</p>
                </div>
              </div> 
              <div className="w-full h-72 mb-4">
                <MapContainer
                  center={ [thisExpense.geo.lat, thisExpense.geo.lon]}
                  zoom={16}
                  scrollWheelZoom={true}
                  onChange={(e) => console.log("changes", e)}
                  onClick={(e) => console.log("hello e", e.targets)}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </MapContainer>
              </div>
            <div className="flex justify-end mb-2">
            <button className="bg-blue-500 text-white px-6 py-2 font-medium outline-none"
            onClick={addExpense}
            >
            Add 
            </button>
              </div>
        </div>
        :
        ""
      }
      </div>
  </div>
  )
}

export default Expenses