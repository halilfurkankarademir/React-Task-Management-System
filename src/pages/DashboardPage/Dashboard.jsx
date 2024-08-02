import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import './Dashboard.css';
import Chart from "../../components/Chart.jsx";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation();
    const username = localStorage.getItem('username');

    const [activeTaskCount, setActiveTaskCount] = useState(() => {
        return localStorage.getItem("activeTaskCount") || 0;
    });

    const [completedTaskCount, setCompletedTaskCount] = useState(() => {
        return localStorage.getItem("completedTaskCount") || 0;
    });

    const [averageCompletionTime, setAverageCompletionTime] = useState(0);

    useEffect(() => {
        document.title = t('dashboard.main');

        const handleStorageChange = () => {
            setActiveTaskCount(localStorage.getItem("activeTaskCount") || 0);
            setCompletedTaskCount(localStorage.getItem("completedTaskCount") || 0);
            calculateAverageCompletionTime(); 
        };

        window.addEventListener("storage", handleStorageChange);
        calculateAverageCompletionTime();

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [t]);

    const calculateAverageCompletionTime = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const completedTasks = tasks.filter(task => task.completed);

        if (completedTasks.length === 0) {
            setAverageCompletionTime(0);
            return;
        }

        const totalCompletionTime = completedTasks.reduce((sum, task) => {
            return sum + (task.endTime - task.createTime);
        }, 0);

        const average = ((totalCompletionTime / completedTasks.length)/1000)/60;
        setAverageCompletionTime(Math.round(average));
    };

    useGSAP(() => {
        gsap.from(".text", 0.8, {
            y: -40,
            opacity: 0,
            ease: "power2.inOut",
            delay: 0.5,
        });
        gsap.from(".text2", 0.8, {
            y: 40,
            opacity: 0,
            ease: "power2.inOut",
            delay: 0.5,
        });
        gsap.from(".loader", 2, {
            width: 0,
            ease: "power4.inOut",
            delay: 0.8,
        });
        gsap.to(".pre-loader", 2, {
            top: "-100%",
            ease: "power4.inOut",
            delay: 2,
        });
    });


    return (
        <div>
            <Sidebar />
            <div>
                <div className="dash-container">
                    <h2>
                        {t('dashboard.title')} <i className="bi bi-graph-up-arrow"></i>
                    </h2>
                    <p style={{ fontWeight: "400", color: "#121212" }}>
                        {t('dashboard.stats0')} <b>{username}</b> {t('dashboard.stats1')}
                    </p>
                    <div className="container stats row">
                        <div className="statsCard">
                            <Chart
                                completedTaskCount={completedTaskCount}
                                activeTaskCount={activeTaskCount}
                                averageCompletionTime={averageCompletionTime}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pre-loader">
                <div className="content">
                    <div className="text"><h1>{t('dashboard.myDashboard')}</h1></div>
                    <div className="loader"></div>
                    <div className="text2"><p>{t('dashboard.loading')}</p></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
