import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {useLocation  } from 'react-router-dom';

function UpdatetodoList(props){

    const [data,setData] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: ''
    });

    useEffect(()=>{
        axios.get('http://localhost:4000/todos/'+id)
            .then(response => {
                setData({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    },[data])
    
    const location = useLocation();
    var id = location.pathname.toString();
    id = id.replace('/edit/','');

    function onChangeTodoDescription(e){
        e.preventDefault();
        setData(prevState => ({
            ...prevState,
            todo_description: e.target.value
        }))
    }

    function onChangeTodoResponsible(e) {
        e.preventDefault();
        setData(prevState => ({
            ...prevState,
            todo_responsible: e.target.value
            }))
    }

    function onChangeTodoPriority(e) {
        e.preventDefault();
        setData(prevState => ({
            ...prevState,
            todo_priority: e.target.value
            }))
    }

    function onChangeTodoCompleted(e) {
        e.preventDefault();
        setData(prevState => ({
            ...prevState,
            todo_completed: !prevState.todo_completed
            }))
    }
    
    function handleSubmit(){
        if (data == null){
            return;
        }
        const obj = {
            todo_description: data.todo_description,
            todo_responsible: data.todo_responsible,
            todo_priority: data.todo_priority,
            todo_completed: data.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/'+id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    return(
        <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                        className="form-control"
                        value={data.todo_description}
                        onChange={onChangeTodoDescription}
                        />
            </div>
            <div className="form-group">
                <label>Responsible: </label>
                <input 
                        type="text" 
                        className="form-control"
                        value={data.todo_responsible}
                        onChange={onChangeTodoResponsible}
                        />
            </div>
            <div className="form-group">
                <label>Priority: </label>
                <input 
                        type="text" 
                        className="form-control"
                        value={data.todo_priority}
                        onChange={onChangeTodoPriority}
                        />
            </div>
            <div className="form-group">
                <label>Completed: </label>
                <input 
                        type="text" 
                        className="form-control"
                        onChange={onChangeTodoCompleted}
                        value={data.todo_completed}
                        />
            </div>
            <br />

            <div className="form-group">
                <button onClick={handleSubmit} value="Update Todo" className="btn btn-primary"> Update </button>
            </div>
        </form>
    </div>
    )
}

export default UpdatetodoList;