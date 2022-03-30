import React from "react";
import './edit.css';


export default function ToDoListBuilder( {buildList, mainList, changeList, deleteTask}){
    
    console.log("this will build: ",buildList, "this is main: ",mainList);
    const thickChange = (e,inds) => {
        /* console.log(e.target); e.preventDefault(); */
        let tempList = [...mainList];
         tempList.find( (fnd) => {
            //console.log("checked ",fnd, inds);
            if( fnd.id === inds) {
                console.log("fund", fnd.task,fnd.complete);
                fnd.complete = !fnd.complete;
                console.log("changed with ", fnd.complete);

                return true
            }
        }) 
        changeList(tempList);

    }

    const deleteHandler = (thisID) =>
        deleteTask(mainList.filter((item) => item.id !== thisID));
    
    const recordRevision = (e,thisid) => {
        const insadee = e.currentTarget.previousSibling.innerHTML;

        // i can do same without using let, concat and find.
        let tmp = [];
        
        mainList.find( (fnd) => {
            if( fnd.id === thisid) {
                tmp = tmp.concat({...fnd, task:insadee});
            }
            else tmp = tmp.concat(fnd);
        })

        changeList(tmp);

        e.currentTarget.style.display ="none";

    }    
    const whachChange = (e) => { //,id, task
        // should be added all key event(like: delete enter)
        // enter key event will triger the "recordRevision" component https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
        // esc key event will triger canceling.
        
        //console.log(id,e.currentTarget.innerHTML, task)
        e.target.style.fontWeight = "bold";
        e.currentTarget.nextSibling.style.display ="block";
    }


    return ( <>
        <ul className="todo-list">
            {buildList.map((todo, index) => {
                return (
    <li key={index} className={todo.complete ? "completed" : "view"}>
        <div  className="view">
            <input className="toggle" type="checkbox" defaultChecked={todo.complete}
                onClick={(e) => thickChange(e, todo.id)}/>

            <label contenteditable="true" onKeyPress={
                (e) => whachChange(e/* ,todo.id, todo.task */)}>{todo.task}</label>

            <p className="revision" onClick={(e) => recordRevision(e,todo.id)}></p>
            <button onClick={() => deleteHandler(todo.id)} className="destroy"></button>
        </div> 
    </li>
                )
            })}
        </ul>
    </> )
};