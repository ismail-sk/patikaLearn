import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({needToDoCount, filterTodos, handleToggle, deleteTask}) => {

   return (
       <ul>
           {filterTodos.map((todo, index) => {
            return (
            <ToDo
                todo={todo}
                handleToggle={handleToggle}
                index={index}
                deleteTask={deleteTask}
            />
            )
           })}
           
           <div>
               {
               needToDoCount>1 ?
                <p>{needToDoCount} items need the todo</p> :
                    (
                        needToDoCount=== 1 ?
                            <p>{needToDoCount} item need the todo</p> :
                                <h3 style = {{color: "blue",
                                font: "'Helvetica Neue', Helvetica, Arial, sans-serif"}}
                                >All todos is done!</h3>
                                )
                }
            </div>
           {/* <button style={{margin: '20px'}} onClick={handleCleaner}>Clear Completed</button> */}
       </ul>
   );
};
 
export default ToDoList;