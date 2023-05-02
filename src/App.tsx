import React, {FC} from 'react';
import './App.css';
import {observer} from "mobx-react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import CreateTask from "./components/CreateTask";

const App: FC = () => {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Auth/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/newtask" element={<CreateTask/>} />
                </Routes>
            </>

    );
};

export default observer(App);
