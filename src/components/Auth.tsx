import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import './componentsStyles/authStyle.scss';
import axios from "axios";
import Store from "../store/store";
import {useNavigate} from "react-router-dom";

const Auth: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        axios.post('http://localhost:3001/login', {
            "email": `${username}`,
            "password": `${password}`
        }).then(res => {
            console.log(res.data)
            Store.login(res.data.user.email)
            localStorage.setItem('accessToken', res.data.accessToken)
            navigate('/home')
        }).catch(error => {
            console.log(error)
        })
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-header">Вход</h2>
                <div className="login-input-group">
                    <label className="login-label" htmlFor="username-input">Имя пользователя:</label>
                    <input
                        className="login-input"
                        type="text"
                        id="username-input"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="login-input-group">
                    <label className="login-label" htmlFor="password-input">Пароль:</label>
                    <input
                        className="login-input"
                        type="password"
                        id="password-input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button className="login-button" type="submit">Войти</button>
            </form>
        </div>
    );
};

export default observer(Auth);