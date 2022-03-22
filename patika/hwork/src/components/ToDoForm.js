import React, { useState } from 'react';

const ToDoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }
    return (
        <form /* style={{alignItems: "center"}}  */onSubmit={handleSubmit}>
            <input className='inBox' value={userInput} type="text" onChange={handleChange} placeholder="Add task..."/>
            <button>Submit</button>
        </form>
    );
};



export default ToDoForm;