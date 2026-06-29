import { useState } from 'react'

const date = new Date();
const currentMonth = date.getMonth() + 1; //Bc for some reason JS is weird and starts counting at 0
const currentYear = date.getFullYear();
const currentDay = date.getDate();

const dayOfWeekNum = date.getDay();
const firstDayOfMonthNum = new Date(currentYear, currentMonth - 1, 1).getDay();
const map = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};
const dayOfWeek = map[dayOfWeekNum];
const firstDayOfMonth = map[firstDayOfMonthNum];

function CalendarDay(day) {
  return (
    <div className="h-24 w-24 border rounded bg-gradient-to-br from-sky-300 to-sky-400 p-2 hover:bg-slate-400 transition">
      
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      
    </>
  )
}

export default App
