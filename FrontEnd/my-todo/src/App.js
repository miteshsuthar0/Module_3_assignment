import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const Todo = () => {

  const [task, settask] = useState("");
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/todo');
      const data = await response.json();
      settasks(data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { task };
  
      if (task.trim() !== '') {
        await fetch("http://localhost:5000/todo", {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body)
        });
        settasks([...tasks, task]);
        settask("");
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/todo/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task', err);
    }
  };

  return (
    <div className="App container">
      <h1 className="title" style={{ fontSize: "13vh", color: "white", textShadow: "0.5vh 0.5vh 0.5vh black" }}>To Do List App</h1>
      <br /><br />
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label className='lable col-2' style={{ backgroundColor: "lightgray" }}>Enter The Task: </label>
          <input type="text" className='inpt col-7' value={task} onChange={(e) => settask(e.target.value)} style={{ backgroundColor: "white" }} />
          <button type='submit' className='greenbtn' style={{ borderTopRightRadius: 'none', borderBottomRigthRadius: 'none' }} >Add Task</button>
          <ul className='text-center'>
        <br />
        {tasks.map((item) => (
          <li
            style={{
              backgroundColor: 'white',
              color: 'black',
              height: '5vh',
              width: '50vh',
              borderRadius: '2vh',
              alignContent: 'center',
              textAlign: 'center',
              marginBottom: '2vh',
              listStyle: 'none',
              marginLeft: '25vw'
            }}
            key={item.id}
          >
            {item.Tasks}
            <button onClick={() => deleteTask(item.id)} style={{ marginLeft: '7px', marginRight: '5px', float: 'right', borderRadius: '2vh' }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
        </div>
      </form>
    </div>
  );
}
export default Todo;
