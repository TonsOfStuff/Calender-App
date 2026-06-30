import { useState } from 'react'

const date = new Date();
const currentMonth = date.getMonth() + 1; //Bc for some reason JS is weird and starts counting at 0
const currentYear = date.getFullYear();
const currentDay = date.getDate();

const dayOfWeekNum = date.getDay();
const firstDayOfMonthNum = new Date(currentYear, currentMonth - 1, 1).getDay();
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
const firstDayOfMonth = weekmap[firstDayOfMonthNum];

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
const currentMonthName = monthMapNum[currentMonth];

function GenerateDay({month}){
  let dayArray = [];

  for (let i = 0; i < monthMap[month]; i++){
    dayArray.push (
      <div key = {i}className = "bg-slate-300 h-30 w-full p-1">{i + 1}</div>
    )
  }

  return dayArray;
}

function Calendar({month, day}) {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentDay, setCurrentDay] = useState(day);

  

  return (
    <div className="h-fit w-screen border bg-gradient-to-br from-gray-300 to-gray-500 p-2 hover:bg-slate-400 transition p-7">
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
        <GenerateDay month={currentMonthName} />
      </div>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Calendar month={currentMonth} day={currentDay} />
    </>
  )
}

export default App
