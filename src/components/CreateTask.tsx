import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Store from "../store/store";
import "./componentsStyles/createTask.scss"
import axios, {AxiosResponse} from "axios";
import {Task} from "../types/Task";



const CreateTask: React.FC = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!Store.email) {
            navigate('/')
        }
    }, [])

    const [task, setTask] = useState<Task>({ id: Number(new Date()), name: "", description: "", done: false });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(task);
        addTodo().then(res => {
            console.log(res)
            navigate('/home')
        }).catch(e => console.log(e))
    };

    const addTodo = async () => {
      return await axios.post<Task>('http://localhost:3001/todos', task)
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label>
                Название задачи
                <input
                    type="text"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                />
            </label>
            <br />
            <label>
                Описание
                <input
                    type="text"
                    value={task.description}
                    onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                    }
                />
            </label>
            <br />
            <button type="submit">Подтвердить</button>
        </form>
    );
};

export default CreateTask;