import React from 'react';

const ToDo = ({todo, handleToggle, deleteTask}) => {

    const handleClick = (e) => {
        e.preventDefault()
        //console.log(e.currentTarget, e.currentTarget.parentElement, e.currentTarget.id)
        handleToggle(e.currentTarget.parentElement.id)
    }

    return ( // e.target.parentElement.remove()  key={todo.id + todo.task}
        <li key={todo.id + todo.task} id={todo.id} name="todo" value={todo.id}
         
        className={todo.complete ? "completed" : "nonComp"}>
            <div className= "tick" onClick={handleClick}/>

            <input  /* key= {todo.index} */
                    className='tBox'
                    type="text"
                    defaultValue={todo.task} />

            <div id={todo.index} onClick={(e) => deleteTask(e.target.parentElement)}>Delete X</div>
        </li>
    );
};

export default ToDo;