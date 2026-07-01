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
    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-sky-100 border-2 border-sky-400 p-6 rounded-xl shadow-2xl z-0 w-152 h-102 text-slate-800">
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

function GenerateDay({month, monthNum, firstDayOfMonthNum, setFocusDay, allTasks}) {
  let check = false;
  let dayArray = [];

  //Formula: 7 - ((days + gap) mod 7)

  for (let i = 0; i < monthMap[month] + firstDayOfMonthNum + (7 - (monthMap[month] + firstDayOfMonthNum) % 7) % 7; i++){
    if (i === firstDayOfMonthNum || (i + 1 - firstDayOfMonthNum <= monthMap[month] && check === true)){ 
      let dayNum = i + 1 - firstDayOfMonthNum;

      const formattedMonth = String(monthNum).padStart(2, "0")
      const formattedDay = String(dayNum).padStart(2, "0")
      const dateID = `${formattedMonth}/${formattedDay}/${currentYear}`; // Format: MM-DD-YYYY

      const dayTasks = allTasks[dateID] || [];

      const maxVisibleTasks = 3;
      const visibleTasks = dayTasks.slice(0, maxVisibleTasks);
      const extraTaskCount = dayTasks.length - maxVisibleTasks;

      

      check = true;
      if (currentDay === dayNum && month === monthMapNum[currentMonth]){ //If tonights the night
        dayArray.push (
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "bg-slate-200 h-30 w-full p-1 flex flex-col hover:bg-slate-400">
            <span className="text-left font-bold text-slate-700 text-sm">{dayNum}</span>
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
          <button onClick={() => setFocusDay({dayNum, dateID})} key={i} className = "bg-slate-300 h-30 w-full p-1 flex flex-col hover:bg-slate-400">
            <span className="text-left font-bold text-slate-700 text-sm">{dayNum}</span>
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
      }
      
    }else{
      dayArray.push(
        <div key={i} className="bg-slate-300 h-30 w-full p-1"> </div>
      )
    }
    
  }

  return dayArray;
}







function Calendar({month, tasks, saveTask, deleteTask, finishTask, redoTask, changeMonth}) {
  

  let firstDayOfMonthNum = new Date(currentYear, month - 1, 1).getDay();
  const currentMonthName = monthMapNum[month];

  const [focusedDay, setFocusedDay] = useState(null)

  let checkCalenderClick = null;
  if (focusedDay !== null){
    checkCalenderClick = (
      <AddMenuItem day={focusedDay} currentTasks={tasks} onSave = {saveTask} onClose={() => {setFocusedDay(null)}} deleteTask={deleteTask} finishTask={finishTask} redoTask={redoTask}/>
    )
  }

  return (
    <div className="h-300 w-auto border bg-gradient-to-br from-gray-300 to-gray-500 p-2 hover:bg-slate-400 transition p-7">
      <div className="flex justify-left gap-4 mb-4">
        <button className="scale-150 hover:scale-190" onClick={() => changeMonth(month - 1)}><span className="content-center">&#8592;</span></button>
        <h1 className="text-center text-2xl min-w-30 font-bold">{currentMonthName}</h1>
        <button className="scale-150 hover:scale-190" onClick={() => changeMonth(month + 1)}><span className="content-center">&#8594;</span></button>
      </div>
      
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
        <GenerateDay month={currentMonthName} monthNum = {month} firstDayOfMonthNum={firstDayOfMonthNum} setFocusDay={(dayObj) => {setFocusedDay(dayObj)}} allTasks = {tasks}/>
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

  const changeMonth = (newMonth) => {
    if (newMonth > 12){
      newMonth = 1;
    }
    if (newMonth < 1){
      newMonth = 12;
    }
    setMonth(newMonth);
  }

  return (
    <>
      <Calendar month={onMonth} tasks={allEvents} saveTask={addNewTask} deleteTask={deleteTask} finishTask={finishTask} redoTask={redoTask} changeMonth={changeMonth} />
    </>
  )
}

export default App
