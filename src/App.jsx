import { useState } from 'react'

const date = new Date();
const currentMonth = date.getMonth() + 1; //Bc for some reason JS is weird and starts counting at 0
const currentYear = date.getFullYear();
const currentDay = date.getDate();

const dayOfWeekNum = date.getDay();
const weekmap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};
const dayOfWeek = weekmap[dayOfWeekNum];

const monthMap = {
  "January": 31,
  "February": 28,
  "March": 31,
  "April": 30,
  "May": 31,
  "June": 30,
  "July": 31,
  "August": 31,
  "September": 30,
  "October": 31,
  "November": 30,
  "December": 31
}
const monthMapNum = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}


function GenerateDay({month, firstDayOfMonthNum}) {
  let check = false;
  let dayArray = [];

  //Formula: 7 - ((days + gap) mod 7)

  for (let i = 0; i < monthMap[month] + firstDayOfMonthNum + (7 - (monthMap[month] + firstDayOfMonthNum) % 7) % 7; i++){
    if (i === firstDayOfMonthNum || (i + 1 - firstDayOfMonthNum <= monthMap[month] && check === true)){
      check = true;
      if (currentDay === i + 1 - firstDayOfMonthNum && month === monthMapNum[currentMonth]){ //If tonights the night
        dayArray.push (
          <button key={i} className = "bg-slate-500 h-30 w-full p-1 flex hover:bg-slate-400">{i + 1 - firstDayOfMonthNum}</button>
        )
      }else{
        dayArray.push (
          <button key={i} className = "bg-slate-300 h-30 w-full p-1 flex hover:bg-slate-400">{i + 1 - firstDayOfMonthNum}</button>
        )
      }
      
    }else{
      dayArray.push(
        <div key={i} className="bg-slate-300 h-30 w-full p-1"> </div>
      )
    }
    
  }

  return dayArray;
}

function Calendar({month}) {
  

  let firstDayOfMonthNum = new Date(currentYear, month - 1, 1).getDay();
  const currentMonthName = monthMapNum[month];

  return (
    <div className="h-300 w-auto border bg-gradient-to-br from-gray-300 to-gray-500 p-2 hover:bg-slate-400 transition p-7">
      <h1 className="text-2xl font-bold mb-4">{currentMonthName}</h1>
      <div className="grid grid-cols-7 text-center mb-1 gap-1">
          <div className = "bg-slate-200">Sunday</div>
          <div className="bg-slate-200">Monday</div>
          <div className="bg-slate-200">Tuesday</div>
          <div className="bg-slate-200">Wednesday</div>
          <div className="bg-slate-200">Thursday</div>
          <div className="bg-slate-200">Friday</div>
          <div className="bg-slate-200" >Saturday</div>
      </div>
      <div className = "grid grid-cols-7 items-start gap-1 align-items-top">
        <GenerateDay month={currentMonthName} firstDayOfMonthNum={firstDayOfMonthNum}/>
      </div>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)

  const [onMonth, setMonth] = useState(currentMonth);

  return (
    <>
      
      <Calendar month={onMonth} />
      <div className="flex gap-4 mb-6 justify-center">
        <button onClick={() => setMonth(1)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">Jan</button>
        <button onClick={() => setMonth(2)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">Feb</button>
        <button onClick={() => setMonth(3)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">Mar</button>
        <button onClick={() => setMonth(4)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">Apr</button>
        <button onClick={() => setMonth(5)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">May</button>
        <button onClick={() => setMonth(6)} className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700">Jun</button>
      </div>
    </>
  )
}

export default App
