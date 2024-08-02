import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import TodoForm from "./TodoForm";
import "../styles/App.css";
import { useTranslation } from "react-i18next";
import CustomModal from '../components/Modal3'; 

const TodoItem = () => {
    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
        setIsModalVisible(false); 
      };
    

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [filteredTasks, setFilteredTasks] = useState(tasks);

    const updateLocalStorage = (newTasks) => {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        const activeTaskCount = newTasks.filter(
            (task) => !task.completed
        ).length;
        const completedTaskCount = newTasks.filter(
            (task) => task.completed
        ).length;
        localStorage.setItem("activeTaskCount", activeTaskCount);
        localStorage.setItem("completedTaskCount", completedTaskCount);
    };

    const addTask = (task, priority) => {
        const date = new Date();
        const formattedDate = `${date
            .getFullYear()
            .toString()
            .padStart(4, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        const newTask = {
            id: Date.now(),
            task,
            priority,
            date: formattedDate,
            completed: false,
            createTime: date.getTime(), 
        };
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);
        setFilteredTasks(newTasks);
        updateLocalStorage(newTasks);

        const createdDates = JSON.parse(localStorage.getItem("createdDates")) || [];
        localStorage.setItem(
            "createdDates",
            JSON.stringify([...createdDates, newTask.createTime])
        );

        const archiveTasks =
            JSON.parse(localStorage.getItem("archiveTasks")) || [];
        localStorage.setItem(
            "archiveTasks",
            JSON.stringify([...archiveTasks, newTask])
        );
    };

    const toggleComplete = (id) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                const completedTime = task.completed ? null : Date.now();
                const updatedTask = {
                    ...task,
                    completed: !task.completed,
                    endTime: completedTime,
                };
                if(task.completed){
                    setIsModalVisible(false);
                }
                else{
                    setIsModalVisible(true);
                }
                if (completedTime) {
                    const diff = completedTime - task.createTime;
                    localStorage.setItem('diff',diff);
                    const taskData = JSON.parse(localStorage.getItem("tasks")) || [];
                    const updatedTaskData = taskData.map(t =>
                        t.id === id ? updatedTask : t
                    );
                    localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
                }
    
                return updatedTask;
            }
            return task;
        });
        setTasks(newTasks);
        setFilteredTasks(newTasks);
        updateLocalStorage(newTasks);  
        
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        setFilteredTasks(newTasks);
        updateLocalStorage(newTasks);
    };

    const [order, setOrder] = useState("asc");

    const sortTable = (col) => {
        const sortedTasks = [...filteredTasks];
        if (order === "asc") {
            sortedTasks.sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setOrder("dsc");
        } else {
            sortedTasks.sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setOrder("asc");
        }
        setFilteredTasks(sortedTasks);
    };

    const searchItem = (searchInput) => {
        if (searchInput !== "") {
            const newArr = tasks.filter(
                (item) =>
                    item.task
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                    item.date.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredTasks(newArr);
        } else {
            setFilteredTasks(tasks);
        }
    };

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <div>
            <TodoForm addTask={addTask} searchItem={searchItem} />
            <div>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="table-head"
                                onClick={() => sortTable("task")}
                            >
                                {t("myTasks.tasks")}
                            </th>
                            <th scope="col" className="table-head">
                                {t("myTasks.prio")}
                            </th>
                            <th
                                scope="col"
                                className="table-head"
                                onClick={() => sortTable("date")}
                            >
                                {t("myTasks.dueDate")}
                            </th>
                            <th scope="col" className="table-head">
                                {t("myTasks.action")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((taskItem) => (
                            <tr
                                key={taskItem.id}
                                className={
                                    taskItem.completed ? "completed" : ""
                                }
                            >
                                <td
                                    className="table-task"
                                    onClick={() => toggleComplete(taskItem.id)}
                                >
                                    {taskItem.task}
                                </td>
                                <td className={taskItem.priority}>
                                    {taskItem.priority}
                                </td>
                                <td>{taskItem.date}</td>
                                <td>
                                    <FaCheck
                                        className="icon icon-check"
                                        title="Complete"
                                        onClick={() =>
                                            toggleComplete(taskItem.id)
                                        }
                                    />
                                    <FaTrash
                                        className="icon icon-trash"
                                        title="Delete"
                                        onClick={() => deleteTask(taskItem.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CustomModal isVisible={isModalVisible} handleClose={handleCloseModal} />
        </div>
    );
};

export default TodoItem;
