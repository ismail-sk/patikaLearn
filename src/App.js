import './App.css';
import React, { useState, useMemo } from 'react';
import ToDoList from './components/ToDoList';

import defaultData from "./components/data.json";

function App() {
    const [theList, setTheList] = useState(defaultData);
    const needToDoCount = useMemo(()=> theList.filter((todo) => !(todo.complete)).length , [theList]);
    const compToDoCount = useMemo(()=> (Number(theList.length)-Number(needToDoCount)), [theList]);
    const [status, setStatus] = useState("all");

    const filterHandler = () => {
      var tmp = [...theList];
      switch (status) {

        case "comp":
          return(tmp.filter((todo) => todo.complete));
  
        case "nonC":
          return(tmp.filter((todo) => !(todo.complete)));
  
        default:
          return(tmp);
  
      }
    };
    const showList = useMemo(filterHandler, [theList,status]);

    // holding clicked button values for filtering
    const filterStatusHandler = (e) => {

      // console.log("pre setted ", status);

      setStatus(e.target.name);

      // console.log(e.target.name, "setted ", status);
      filterHandler()
    };
    function Headers() {
      const [ userInput, setUserInput ] = useState('');
      
      const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
      };
    
      // adding task
      const addTask = (userInput ) => {

        if(userInput === "") {
          return false
        }        
        let copy = [...theList];
        let hold = { id: findDifID(theList.length), task: userInput, complete: false };
        copy = [hold, ...copy];

        setTheList(copy);
      };
      // finding non used IDs for adding task (addTask)
        const findDifID = (par) => {
          var bu = theList;
          //console.log(typeof(bu), bu)
          var largest = Number(par);
          for (var i=0; i<=par-1;i++) {
            if (bu[i].id>largest) {
              largest = bu[i].id;
              //console.log("new largest",bu[i].id);
            }
          }
          //console.log(largest);
          return largest+1;
        };

    return (
      <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input className="new-todo" placeholder="What needs to be done?" 
               value={userInput} type="text" onChange={handleChange} /* autoFocus *//>
          </form>
        </header>
    )
  }

  function MainBody( {checkAllToComp, invert=false} ) {

    const allisCompleted = () =>{

    if(invert) {
      {
        checkAllToComp(theList.map((it)=> {
          return {...it, complete: false}}))
        }
      }
    else
        checkAllToComp(theList.filter((item) => item.complete ? item.complete:  item.complete = true ))
      }
    
    return (
      <section className="main">
          <input onClick={
            () => {needToDoCount>0 ? allisCompleted(checkAllToComp  = setTheList)
              : allisCompleted(checkAllToComp  = setTheList, invert=true)}
            }

             className="toggle-all" type="checkbox" id="toggle-all"/>

          <label htmlFor="toggle-all" className={theList.length === 0 ? "hidden" : "show"}>
            Mark all as complete
          </label>
            
            <ToDoList
            buildList = {showList}
            mainList = {theList}
            changeList = {setTheList}
            deleteTask = {setTheList}
            />
        </section>
    )
  }
  
  function Footer( {removeTodos} ) {

    const clearCompleted = () => removeTodos(theList.filter((item) => !item.complete));

    return (
    <footer className="footer">
      <span className="todo-count">
        {/* <!-- This should be `0 items left` by default --> */}
        <><strong>{needToDoCount}</strong> items left</>
        {/*
        needToDoCount>1 ?
            <><strong>{needToDoCount}</strong> items left</> :
              (
                needToDoCount=== 1 ?
                      <><strong>{needToDoCount}</strong> item left</> :
                          <>All todos is done!</>
                          ) */}
      </span>

      <ul className="filters">

        <li>
        <a className= {status === "all" ? "selected": undefined} name="all" onClick={filterStatusHandler}> All </a> 
        </li>

        <li>
        <a className= {status === "nonC" ? "selected": undefined} name="nonC" onClick={filterStatusHandler} > Active </a>
        </li>

        <li>
        <a className= {status === "comp" ? "selected": undefined} name="comp" onClick={filterStatusHandler}> Completed </a>
        </li>

      </ul>

      {/* <!-- Hidden if no completed items are left ↓ --> */}
      <button onClick={() => clearCompleted(removeTodos = setTheList)}
      className={compToDoCount===0 ? "hidden" : "clear-completed"}>
        Clear completed
      </button>
    </footer>
    )
  }
    return (
      <>
      <Headers />
      <MainBody />
      <Footer />
      </>
    );
}

export default App;
