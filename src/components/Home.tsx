import React, {FC, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Store from "../store/store";
import {useNavigate} from "react-router-dom";
import {Task} from "../types/Task";
import './componentsStyles/tasksStyle.scss'
import axios from "axios";

const Home: FC = () => {

    const [tasks, setTasks] = useState<Task[]>(Store.tasks);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate()

    const loadTasks = (query?: string) => {
        const url = query ? `http://localhost:3001/todos${query}` : 'http://localhost:3001/todos';
        axios.get<Task[]>(url).then(res => {
            Store.setTasks(res.data)
            setTasks(res.data)
        })
    }
    useEffect(() => {
        if (!Store.email) {
            navigate('/')
        } else {
            loadTasks()
        }
    }, [])

    useEffect(() => {
        const query = filter === 'all' ? '' : `?done=${filter === 'done'}`;
        loadTasks(query);
    }, [filter]);

    const handleDeleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        axios.delete(`http://localhost:3001/todos/${id}`)
        Store.setTasks(updatedTasks)
    };

    const handleCheckboxChange = (id: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                axios.patch(`http://localhost:3001/todos/${id}`, { done: !task.done })
                return { ...task, done: !task.done };
            }
            return task;
        });
        setTasks(updatedTasks);
        Store.setTasks(updatedTasks)
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <div className="tasks-list">
                <div className="tasks-list__header">
                    <h3>Tasks List</h3>

                    <select onChange={handleFilterChange}>
                        <option value="all">Все</option>
                        <option value="done">Выполненные</option>
                        <option value="undone">Невыполненные</option>
                    </select>

                </div>
                <div className="tasks-list__content">
                    {tasks.map(task => (
                        <div className="task" key={task.id}>
                            <div className="task__header">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={() => handleCheckboxChange(task.id)}
                                    />
                                    {task.name}
                                </div>
                                <button onClick={() => handleDeleteTask(task.id)}>X</button>
                            </div>
                            <div className="task__description">
                                <div className="desc__text">
                                    {task.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default observer(Home);