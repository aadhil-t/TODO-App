import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editId, setEditId] = useState(0);
  const [error,setError]=useState('')
  const inputRef = useRef(null);

  // ******** USEEFFECT FOR FOCUS THE INPUT FILED ********//
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // ******** TODO APP ADDING FUNCTION ********//
  const addtoDo = () =>{
    const isDuplicate = toDos.some((todo) => todo.list === toDo.trim());
    if (isDuplicate) {
      setError('Duplicate Element');
      return
    }
    if(toDo.trim() !== '' ){
      setToDos([...toDos,{ list : toDo, id : Date.now(),status:false}])
      setToDo('')
    }
    else{
      setError("write Something")
      return
    }
    setError('')
   
   if (editId){
      const editTodo = toDos.find((todo) => todo.id === editId)
      const updateTodo = toDos.map((value) => value.id === editTodo.id 
      ?  (value ={id : value.id , list : toDo})
      :  (value = {id: value.id,list : value.list}))
      setToDos(updateTodo)
      setEditId(0)
      setToDo('')
    }
  }   
    
  

  // TODO App DELETING FUNCTION ///
  const onDelete = (id) => {
    setToDos(toDos.filter((to) => to.id !== id));
  };

  const onEdit = (id) => {
    const editTodo = toDos.find((value) => value.id === id);
    setToDo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          ref={inputRef}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i title="Add" onClick={addtoDo} className="fas fa-plus"></i>
      </div>
      <span style={{color:'red'}} >{error}</span>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) =>
                  setToDos((prevToDos) =>
                    prevToDos.map((todo) =>
                      todo.id === obj.id ? { ...todo, status: e.target.checked } : todo
                    )
                  )
                }
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p id={obj.status === true ? 'list' : ''}>{obj.list}</p>
            </div>
            <div className="right">
              <i title="Edit" onClick={() => onEdit(obj.id)} className="fas fa-edit"></i>
              <i title="Delete" onClick={() => onDelete(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
