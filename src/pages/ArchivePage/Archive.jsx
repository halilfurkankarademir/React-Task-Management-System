import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useTranslation } from "react-i18next";
import "./Archive.css";

const Archive = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t("archive.main");
    }, [t]);

    const [savedTasks, setSavedTasks] = useState(() => {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    });

    const [archiveTasks, setArchiveTasks] = useState(() => {
        const archive = localStorage.getItem("archiveTasks");
        return archive ? JSON.parse(archive) : [];
    });

    useEffect(() => {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            setSavedTasks(JSON.parse(tasks));
        }
    }, []);

    const clearArchive = () => {
        if (archiveTasks.length !== 0) {
            setArchiveTasks([]);
            localStorage.setItem("archiveTasks", JSON.stringify([]));
        } else {
            alert("Archive is already empty!");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="archive-container">
                <h2 className="archive-title">
                    {t("archive.title")}{" "}
                    <i className="bi bi-archive" id="archiveIco"></i>
                </h2>
                <p style={{ fontWeight: "400", color: "#121212" }}>
                    {t("archive.description")}
                </p>
                <button
                    type="button"
                    onClick={clearArchive}
                    className="clearArchiveButton"
                >
                    {t("archive.button")}
                </button>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col" className="table-head">
                                {t("myTasks.tasks")}
                            </th>
                            <th
                                scope="col"
                                className="table-head"
                                id="archive-prio"
                            >
                                {t("myTasks.prio")}
                            </th>
                            <th scope="col" className="table-head">
                                {t("myTasks.dueDate")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {archiveTasks.map((taskItem) => (
                            <tr
                                key={taskItem.id}
                                className={
                                    taskItem.completed ? "completed" : ""
                                }
                            >
                                <td className="table-task">{taskItem.task}</td>
                                <td
                                    className={taskItem.priority}
                                    id="archive-prio2"
                                >
                                    {taskItem.priority}
                                </td>
                                <td>{taskItem.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Archive;
