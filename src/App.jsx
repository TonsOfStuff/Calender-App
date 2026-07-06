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

function AddMenuItem({day, currentTasks, onSave, onClose, deleteTask, finishTask, redoTask}) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(day.dateID, inputText)
    setInputText("");
  }

  const daySpecificTasks = currentTasks[day.dateID] || [];

  return(
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-sky-100 border-2 border-sky-400 p-6 rounded-xl shadow-lg z-0 w-152 h-102 text-slate-800">
      <h3 className="font-bold text-lg mb-1 text-slate-800">Manage Schedule</h3>
      <p className="text-xs text-slate-500 mb-4 font-mono">{day.dateID}</p>
      
      <div className="max-h-51 overflow-y-auto flex flex-col gap-1 mb-4 bg-white/60 p-2 rounded border border-sky-200 ">
        {daySpecificTasks.length === 0 ? (
          <p className="text-xs italic text-slate-400">No events scheduled.</p>
        ) : (
          daySpecificTasks.map(t => (
            <div key={t.id} className="flex gap-2 text-xs bg-sky-200/80 px-2 py-1 rounded text-slate-700">
              {t.done === true ? (
                <p className="content-center wrap-anywhere mr-auto line-through"><s>{t.text}</s></p>
              ) : (
                <p className="content-center wrap-anywhere mr-auto">{t.text}</p>
                
              )}
              {t.done === true ? (
                <button onClick = {() => redoTask(day.dateID, t.id)} className="self-center bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Redo</button>
              ) : (
                <button onClick = {() => finishTask(day.dateID, t.id)} className="self-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Finish</button>
              )}
              <button onClick = {() => deleteTask(day.dateID, t.id)} className="self-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
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

function GenerateDay({month, monthNum, year, firstDayOfMonthNum, setFocusDay, allTasks}) {
  let check = false;
  let dayArray = [];

  //Formula for a full box calender bc it looks better: 7 - ((days + gap) mod 7) 
  let daysOfTheMonth = monthMap[month];
  if (month === "February" && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    daysOfTheMonth = 29; // Leap year
  }

  for (let i = 0; i < daysOfTheMonth + firstDayOfMonthNum + (7 - (daysOfTheMonth + firstDayOfMonthNum) % 7) % 7; i++){
    if (i === firstDayOfMonthNum || (i + 1 - firstDayOfMonthNum <= daysOfTheMonth && check === true)){ 
      let dayNum = i + 1 - firstDayOfMonthNum;

      const formattedMonth = String(monthNum).padStart(2, "0")
      const formattedDay = String(dayNum).padStart(2, "0")
      const dateID = `${formattedMonth}/${formattedDay}/${year}`; // Format: MM-DD-YYYY

      const dayTasks = allTasks[dateID] || [];

      const maxVisibleTasks = 3;
      const visibleTasks = dayTasks.slice(0, maxVisibleTasks);
      const extraTaskCount = dayTasks.length - maxVisibleTasks;

      

      check = true;
      if (currentDay === dayNum && month === monthMapNum[currentMonth] && year === currentYear){ //If tonights the night
        dayArray.push (
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "shadow-[-1px_1px_0px_0px_rgba(0,0,0,0.5)] rounded-md bg-sky-600 sm:h-30 h-20 w-full p-1 flex flex-col hover:bg-slate-400">
            <span className="text-left font-bold text-slate-100 text-sm">{dayNum}</span>
            <div className="w-full mt-1 flex flex-col gap-1 overflow-hidden">
              {visibleTasks.map((task) => (
                <div key={task.id} className="text-[10px] bg-blue-500 text-white px-1 py-0.5 rounded truncate w-full text-left">
                  {task.text}
                </div>
              ))}
              {extraTaskCount > 0 && (
                <div className="text-[10px] bg-gray-500 text-white px-1 py-0.5 rounded truncate w-full text-left">
                  +{extraTaskCount} more
                </div>
              )}
            </div>
          </button>
        )
      }else{
        dayArray.push (
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "shadow-[-1px_1px_0px_0px_rgba(0,0,0,0.5)] border-gray-800 border-r border-t rounded-md bg-gray-900 sm:h-30 h-20 w-full p-1 flex flex-col hover:bg-slate-400">
            <span className="text-left font-bold text-slate-600 text-sm">{dayNum}</span>
            <div className="w-full mt-1 flex flex-col gap-1 overflow-hidden">
              {visibleTasks.map((task) => (
                <div key={task.id} className="text-[10px] bg-blue-500 text-white px-1 py-0.5 rounded truncate w-full text-left">
                  {task.text}
                </div>
              ))}
              {extraTaskCount > 0 && (
                <div className="text-[10px] text-white px-1 py-0.5 rounded truncate w-full text-left">
                  +{extraTaskCount} more
                </div>
              )}
            </div>
          </button>
        )
      }
      
    }else{
      dayArray.push(
        <div key={i} className="shadow-[-1px_1px_0px_0px_rgba(0,0,0,0.5)] border-gray-800 border-r border-t rounded-md bg-gray-900 sm:h-30 h-20 w-full p-1"> </div>
      )
    }
    
  }

  return dayArray;
}







function Calendar({month, year, tasks, saveTask, deleteTask, finishTask, redoTask, changeMonth, changeYear}) {
  

  let firstDayOfMonthNum = new Date(year, month - 1, 1).getDay();
  const currentMonthName = monthMapNum[month];

  const [focusedDay, setFocusedDay] = useState(null)

  let checkCalenderClick = null;
  if (focusedDay !== null){
    checkCalenderClick = (
      <AddMenuItem day={focusedDay} currentTasks={tasks} onSave = {saveTask} onClose={() => {setFocusedDay(null)}} deleteTask={deleteTask} finishTask={finishTask} redoTask={redoTask}/>
    )
  }

  return (
    <div className="min-h-screen h-auto w-auto border bg-linear-to-b from-gray-900 to-gray-800 p-2 ">
      <div className="text-white grid grid-cols-2 gap-4 sm:mb-8 mb:2">
        <div className="flex justify-center sm:gap-4 gap-1">
          <button className="sm:scale-150 sm:shover:scale-190 scale-50 hover:scale-100" onClick={() => changeMonth(month - 1)}><span className="content-center">&#8592;</span></button>
          <h1 className="text-center content-middle text-xs sm:text-2xl min-w-17 sm:min-w-35 font-bold">{currentMonthName}</h1>
          <button className="sm:scale-150 sm:hover:scale-190 scale-50 hover:scale-100" onClick={() => changeMonth(month + 1)}><span className="content-center">&#8594;</span></button>
        </div>
        

        <div className="flex self-center justify-center sm:gap-4 gap-1">
          <button className="sm:scale-150 sm:hover:scale-190 scale-50 hover:scale-100" onClick={() => changeYear(year - 1)}><span className="content-center">&#8592;</span></button>
          <h1 className="text-center content-center text-xs sm:text-2xl min-w-17 sm:min-w-35 font-bold">{year}</h1>
          <button className="scale-50 hover:scale-100 sm:scale-150 sm:hover:scale-190" onClick={() => changeYear(year + 1)}><span className="content-center">&#8594;</span></button>
        </div>
      </div>
      
      <div className="inset-shadow-gray-500 bg-gray-900 p-2 rounded-md">
        <div className="text-white grid grid-cols-7 text-center mb-1 p-2 pb-0 sm:gap-1">
            <div className = "rounded-md sm:grid hidden bg-gray-900">Sunday</div>
            <div className = "rounded-md text-xs sm:hidden bg-gray-900 grid">Sun</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden">Monday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Mon</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden">Tuesday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Tue</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden">Wednesday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Wed</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden">Thursday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Thu</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden">Friday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Fri</div>
            <div className="rounded-md bg-gray-900 sm:grid hidden" >Saturday</div>
            <div className="rounded-md text-xs bg-gray-900 sm:hidden">Sat</div>
        </div>
        <div className = "text-white grid grid-cols-7 items-start gap-1 p-2 align-items-top">
          <GenerateDay month={currentMonthName} monthNum = {month} year={year} firstDayOfMonthNum={firstDayOfMonthNum} setFocusDay={(dayObj) => {setFocusedDay(dayObj)}} allTasks = {tasks}/>
        </div>
      </div>

      {checkCalenderClick}
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  const [onYear, setYear] = useState(currentYear);
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
        text: taskText,
        done: false
      };
      return {
        ...prevEvents,
        [dateKey]: [...existingTasks, newTaskObj]
      };
    });
  };

  const deleteTask = (dateKey, taskId) => {
    console.log("Deleting task with ID:", taskId, "from date:", dateKey);
    setAllEvents((prevEvents) => {
      const existingTasks = prevEvents[dateKey] || [];
      const updatedTasks = existingTasks.filter(task => task.id !== taskId);
      return {
        ...prevEvents,
        [dateKey]: updatedTasks
      };
    });
  };

  const finishTask = (dateKey, taskId) => {
    setAllEvents((prevEvents) => {
      const existingTasks = prevEvents[dateKey] || [];
      const targetTask = existingTasks.find(task => task.id === taskId);
      if (!targetTask) return prevEvents;

      const updatedTask = {...targetTask, done: true};
      const remainingTasks = existingTasks.filter(task => task.id !== taskId);

      const updatedTaskList = [...remainingTasks, updatedTask];

      return {
        ...prevEvents,
        [dateKey]: updatedTaskList
      };
    });
  }

  const redoTask = (dateKey, taskId) => {
    setAllEvents((prevEvents) => {
      const existingTasks = prevEvents[dateKey] || [];
      const targetTask = existingTasks.find(task => task.id === taskId);
      if (!targetTask) return prevEvents;

      const updatedTask = {...targetTask, done: false};
      const remainingUnfinishedTasks = existingTasks.filter(task => task.id !== taskId && task.done === false);
      const remainingFinishedTasks = existingTasks.filter(task => task.id !== taskId && task.done === true);

      const updatedTaskList = [...remainingUnfinishedTasks, updatedTask, ...remainingFinishedTasks ];

      return {
        ...prevEvents,
        [dateKey]: updatedTaskList
      };
    });
  }

  const changeYear = (newYear) => {
    setYear(newYear);
  }

  const changeMonth = (newMonth) => {
    if (newMonth > 12){
      changeYear(onYear + 1);
      newMonth = 1;
    }
    if (newMonth < 1){
      changeYear(onYear - 1);
      newMonth = 12;
    }
    setMonth(newMonth);;
  }

  return (
    <>
      <Calendar month={onMonth} year={onYear} tasks={allEvents} saveTask={addNewTask} deleteTask={deleteTask} finishTask={finishTask} redoTask={redoTask} changeMonth={changeMonth} changeYear={changeYear} />
    </>
  )
}

export default App
