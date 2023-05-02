import React from "react";
import { Link } from "react-router-dom";
import styles from "./componentsStyles/header.module.scss";
import Store from "../store/store";
import {observer} from "mobx-react-lite";

const Header: React.FC = () => {

    const onLogout = () => {
      Store.logout()
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/newtask">Создать задачу</Link>
                    <Link to="/home">Список задач</Link>
                </div>
                <div className={styles.logout}>
                    {Store.email ? <div className={styles.headerEmail}>{Store.email} <button onClick={onLogout}>Выйти</button></div> : <span>Вы не авторизованы</span>}
                </div>
            </nav>
        </header>
    );
};

export default observer(Header);