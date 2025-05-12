import React, { useEffect, useState } from "react";
import {useQuery} from './QueryContext'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";



const ControlBar = () => {
  const {updateQuery} = useQuery()

  const colorsObj = [
    {
      colorName:"Yellow" ,
      colorCode:"yellow" ,
      color:"bg-yellow-500"
    },
    {
      colorName:"Black & White" ,
      colorCode:"black_and_white" ,
      color:"bg-gray-500"
    },
    {
      colorName:"Green" ,
      colorCode:"green" ,
      color:"bg-green-500"
    },
    {
      colorName:"Blue" ,
      colorCode:"blue" ,
      color:"bg-blue-500"
    },
    {
      colorName:"Purple" ,
      colorCode:"purple" ,
      color:"bg-purple-500"
    }
  ]
  const [searchQuery, setSearchQuery]= useState('')

  const searchFunc = (e) => {
    const value = e.target.value
    setSearchQuery(value)
  }

  useEffect(()=>{
    const delay = setTimeout(()=>{
      if(searchQuery){ 
        updateQuery("search", searchQuery);
      }
    }, 500)
    return ()=> clearInterval(delay)
  }, [searchQuery])

  return (
    <div className="px-2 py-4 flex justify-between items-center">
      <div className="flex gap-2 ">
       <div className="flex">
            <select className="rounded-full border border-gray-300 px-3 py-2 cursor-pointer" name="colors" id="colors">
            <option key="all" value="all">All</option>
            {colorsObj.map((color,index)=>(
              <option className="" key={`${color.colorName}-${index}`} value={color.colorName}>{color.colorName}</option>
            ))}
            {/* <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option> */}
            </select>
       </div>

      </div>
      <div className="relative h-[40px]  p-2 flex items-center bg-neutral-100 border-1 border-neutral-300 rounded-4xl">
        <input
          className="px-4 transition-all ease-in-out duration-400 focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={(e)=>searchFunc(e)}
        />
        <HiMiniMagnifyingGlass className="absolute right-2" size={22} />
      </div>
    </div>
  );
};

export default ControlBar;
