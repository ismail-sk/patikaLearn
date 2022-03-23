import React, { useEffect, useMemo, useState } from 'react';

// components
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

// example datas
import data from "./components/data.json";

// style
import './App.css';

export default function App() {
  
  // main states
  const [ toDoList, setToDoList ] = useState(data);
  const [filterTodos, setFilterTodos] = useState([]);

  // helper states
  const [status, setStatus] = useState("all");
  const needToDoCount = useMemo(()=> toDoList.filter((todo) => !(todo.complete)).length , [toDoList]);
  /* const [needToDoCount, setNeedToDoCount] = useState(0);
  const [compToDoCount, setCompToDoCount] = useState(0); */
  const compToDoCount = useMemo(()=> (toDoList.length-needToDoCount), [toDoList]);

  // ticking handler for shifting beetween completed/nonCompleted
  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  };

  // "Clear Completed" button for removing completed items
  const handleCleaner = () => {
    if (compToDoCount){
    let filtered = toDoList.filter((task) => {
      //console.log(task.task);
      return !task.complete;
    });
    //console.log( "last bef exit ", filtered);
    setToDoList(filtered);}
  };

  // adding task (part of ToDoForm.js)
  const addTask = (userInput ) => {
    if(userInput === "") {
      return false
    }
    let copy = [...toDoList];
    let hold = { id: findDifID(toDoList.length), task: userInput, complete: false };
    copy = [...copy, hold];
    setToDoList(copy);    
  };
  // finding non used IDs for adding task (addTask) (part of ToDoForm.js)
  const findDifID = (par) => {
    var bu = toDoList;
    console.log(typeof(bu), bu)

    var largest = Number(par);
    for (var i=0; i<=par-1;i++){
        if (bu[i].id>largest) {
            largest = bu[i].id;
            //console.log("new largest",bu[i].id);
        }
    }
    console.log(largest);
    return largest+1;
  };

  // deleting one task
  const deleteTask = (deleteThis) => {
    var delThis = Number(deleteThis.id);
    //console.log("deleteThisID is: ",delThis.id);
    var tmp = [...toDoList];

    let findd = tmp.findIndex( (fnd) => {
      //console.log(fnd.id,delThis);
      if( fnd.id === delThis) {
        //console.log("Found: id = ", fnd, " listID = ",tmp," object: ", fnd.task);
        return fnd;
      }
    });
    tmp.splice(findd,1);
    
    setToDoList(tmp);
  };
  
  // triggering items builder after related changes
  useEffect(() => {
    console.log("Changed log ",toDoList);
    filterHandler();
  },[toDoList, status])
  
  // counting items after every changes
  useEffect(() => {
    console.log(
      "All item count: ", toDoList.length,
      "need the todo count:", needToDoCount,
      "completed item count: ", compToDoCount );
  }, [filterTodos && toDoList])
  
  // filtering by button values
  const filterHandler = () => {
    switch (status) {

      case "comp":
        setFilterTodos(toDoList.filter((todo) => todo.complete));// todo.complete === true
        break;

      case "nonC":
        setFilterTodos(toDoList.filter((todo) => !(todo.complete)));
        break;

      default:
        setFilterTodos(toDoList);
        break;

    }
  };

  // holding clicked button values for filtering
  const filterStatusHandler = (e) => {
    //console.log(e.target.value);
    setStatus(e.target.value);
  };

  function ButtonBar() {
    return (
      <>
      
        <button className= {status === "all" ? "activeSelected": undefined} value="all" onClick={filterStatusHandler}> All </button> 
        <button className= {status === "comp" ? "activeSelected": undefined} value="comp" onClick={filterStatusHandler}> Completed </button>
        <button className= {status === "nonC" ? "activeSelected": undefined} value="nonC" onClick={filterStatusHandler} > Uncompleted </button>
        <button onClick={handleCleaner} style={{ backgroundColor:"rgb(223, 210, 210)"}}>Clear Completed</button>
      
{/* {status === "comp" && "activeSelected"} -- this is returning false and react give error. "did you try the say false a class name?"--

<form>
<select onChange={filterStatusHandler} name='todos'>
          <option value="all">All</option>
          <option value="comp">Completed</option>
          <option value="nonC">Uncompleted</option>
        </select>
</form> */}
      </>
    )
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>todos</h1>
      </header>
      
        <div className='plane'>
          <div className='controlBox'>
            <ButtonBar/>
            
            <ToDoForm
              addTask={addTask}
              />
          </div>
        
          <div className='box'>
            <ToDoList
              toDoList={toDoList}
              handleToggle={handleToggle}
              deleteTask={deleteTask}
              filterTodos={filterTodos}
              needToDoCount={needToDoCount}
              />
        </div>
      </div>
    </div>
  );
}
