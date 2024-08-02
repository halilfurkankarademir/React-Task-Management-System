import React from "react";
import { useEffect } from "react";
import TodoItem from "../../components/TodoItem";
import Sidebar from '../../components/Sidebar'
import { useTranslation } from "react-i18next";
import './MyTasks.css';

const Todo = () => {
    const {t} = useTranslation();
    useEffect(()=>{
        document.title= t('myTasks.main');
    },[t])
    
    return (
        <div>
            <Sidebar></Sidebar>
            <div>
                <div className="todo-container">
                    <h2>{t('myTasks.title')}</h2>
                    <i class="bi bi-clipboard-check"></i>
                    <p style={{fontWeight:"400", color:"#121212"}}>{t('myTasks.description')}</p>
                    <TodoItem />
                </div>
            </div>
        </div>
    );
};

export default Todo;
    