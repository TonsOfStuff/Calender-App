import { useState } from 'react'
import { useEffect } from 'react';

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

function AddMenuItem({day, currentTasks, onSave, onClose}){
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(day.dateID, inputText)
    setInputText("");
  }

  const daySpecificTasks = currentTasks[day.dateID] || [];

  return(
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-sky-100 border-2 border-sky-400 p-6 rounded-xl shadow-2xl z-50 w-72 text-slate-800">
      <h3 className="font-bold text-lg mb-1 text-slate-800">Manage Schedule</h3>
      <p className="text-xs text-slate-500 mb-4 font-mono">{day.dateKey}</p>
      
      <div className="max-h-24 overflow-y-auto flex flex-col gap-1 mb-4 bg-white/60 p-2 rounded border border-sky-200">
        {daySpecificTasks.length === 0 ? (
          <p className="text-xs italic text-slate-400">No events scheduled.</p>
        ) : (
          daySpecificTasks.map(t => (
            <div key={t.id} className="text-xs bg-sky-200/80 px-2 py-1 rounded text-slate-700">{t.text}</div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="New entry description..." 
          className="w-full p-2 text-xs rounded border border-slate-300 focus:outline-sky-500" 
        />
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" onClick={onClose} className="px-3 py-1.5 bg-slate-400 text-white rounded text-xs font-semibold hover:bg-slate-500">
            Close
          </button>
          <button type="submit" className="px-3 py-1.5 bg-sky-600 text-white rounded text-xs font-semibold hover:bg-sky-700">
            Save Entry
          </button>
        </div>
      </form>
    </div>
  )
}


function GenerateDay({month, monthNum, firstDayOfMonthNum, setFocusDay}) {
  let check = false;
  let dayArray = [];

  //Formula: 7 - ((days + gap) mod 7)

  for (let i = 0; i < monthMap[month] + firstDayOfMonthNum + (7 - (monthMap[month] + firstDayOfMonthNum) % 7) % 7; i++){
    if (i === firstDayOfMonthNum || (i + 1 - firstDayOfMonthNum <= monthMap[month] && check === true)){
      let dayNum = i + 1 - firstDayOfMonthNum;

      const formattedMonth = String(monthNum).padStart(2, "0")
      const formattedDay = String(dayNum).padStart(2, "0")
      const dateID = `${currentYear}-${formattedMonth}-${formattedDay}`


      check = true;
      if (currentDay === i + 1 - firstDayOfMonthNum && month === monthMapNum[currentMonth]){ //If tonights the night
        dayArray.push (
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "bg-slate-500 h-30 w-full p-1 flex hover:bg-slate-400">{i + 1 - firstDayOfMonthNum}</button>
        )
      }else{
        dayArray.push (
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "bg-slate-300 h-30 w-full p-1 flex hover:bg-slate-400">{i + 1 - firstDayOfMonthNum}</button>
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







function Calendar({month, tasks, saveTask}) {
  

  let firstDayOfMonthNum = new Date(currentYear, month - 1, 1).getDay();
  const currentMonthName = monthMapNum[month];

  const [focusedDay, setFocusedDay] = useState(null)

  let checkCalenderClick = null;
  if (focusedDay !== null){
    console.log("askdnhasjhd")
    checkCalenderClick = (
      <AddMenuItem day={focusedDay} currentTasks={tasks} onSave = {saveTask} onClose={() => {setFocusedDay(null)}}/>
    )
  }

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
        <GenerateDay month={currentMonthName} monthNum = {currentMonth} firstDayOfMonthNum={firstDayOfMonthNum} setFocusDay={(dayObj) => {setFocusedDay(dayObj)}}/>
      </div>

      {checkCalenderClick}
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)

  const [onMonth, setMonth] = useState(currentMonth);

  //Saving to local storage here
  const [allEvents, setAllEvents] = useState(() => {
    let savedData = localStorage.getItem("calenderTasks");

    return savedData ? JSON.parse(savedData) : {};
  })

  useEffect(() => {
    localStorage.setItem("calenderTasks", JSON.stringify(allEvents));
  }, [allEvents])

  const addNewTask = (dateKey, taskText) => {
    if (!taskText.trim()) return;

    setAllEvents((prevEvents) => {
      const existingTasks = prevEvents[dateKey] || [];
      const newTaskObj = {
        id: Date.now(),
        text: taskText
      };
      return {
        ...prevEvents,
        [dateKey]: [...existingTasks, newTaskObj]
      };
    });
  };

  return (
    <>
      
      <Calendar month={onMonth} tasks={allEvents} saveTask={addNewTask} />
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
