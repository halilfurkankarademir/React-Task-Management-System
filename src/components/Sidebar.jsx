import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import userPhoto from "../assets/userPhoto.jpg"
const Sidebar = () => {
    const { t } = useTranslation();
    const username = localStorage.getItem('username');

    const [toggle, setToggle] = useState(false);

    const profileImage = localStorage.getItem('profileImage');
    
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebarAll');
        setToggle(prev => {
            const newState = !prev;
            if (newState) {
                sidebar.style.transform = "translateX(-200px)";
            } else {
                sidebar.style.transform = "translateX(0px)";
            }
            return newState;
        });
    };


    return (
        <div className="container-fluid sidebar" id="sidebarAll">
           <div
                className="col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column"
                id="sidebar-container"
            >
                <div>
                    <Link
                        to="/"
                        className="text-decoration-none d-flex align-items-center"
                    >
                        <span className="ms-1 fs-4" id="brand">{t('sidebar.title')}</span>
                    </Link>
                    <i class="bi bi-list" onClick={toggleSidebar}></i>
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item fs-4">
                            <Link
                                to="/dashboard"
                                className="nav-link fs-5"
                                aria-current="page"
                            >
                                <i class="bi bi-graph-up"></i>
                                <span className="ms-3">{t('sidebar.dashboard')}</span>
                            </Link>
                        </li>
                        <li className="nav-item fs-4">
                            <Link to="/mytasks" className="nav-link fs-5">
                                <i className="bi bi-journal-check"></i>
                                <span className="ms-3">{t('sidebar.myTasks')}</span>
                            </Link>
                        </li>

                        {/* <li className="nav-item fs-4">
                            <Link to="/myteams" className="nav-link fs-5">
                                <i className="bi bi-people"></i>
                                <span className="ms-3">{t('sidebar.myTeams')}</span>
                            </Link>
                        </li> */}
                        <li className="nav-item fs-4">
                            <Link to="/archive" className="nav-link fs-5">
                                <i class="bi bi-archive"></i>
                                <span className="ms-3">{t('sidebar.archive')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="dropdown open">
                    <a
                        className="text-decoration-none dropdown-toggle p-4"
                        type="button"
                        id="triggerId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {profileImage && (
                            <img 
                                src={profileImage} 
                                alt="Profile" 
                                className="sidebar-photo" 
                            />
                        )}
                        {
                         !profileImage &&(
                            <img 
                                src={userPhoto} 
                                alt="Profile" 
                                className="sidebar-photo" 
                            />
                         )   
                        }
                        <span className="ms-3">{username}</span>
                    </a>
                    <div className="dropdown-menu fixed-top align-content-center" aria-labelledby="triggerId">
                        <Link className="dropdown-item" to="/profile">
                            {t('sidebar.profile')}
                        </Link>
                        <Link className="dropdown-item" to="/">
                            {t('sidebar.homePage')}
                        </Link>
                        
                    </div>
    
                </div>
                <p className="side-footer" id="side-footer">&copy;{t('sidebar.copyright')}</p>
            </div>
        </div>
    );
};

export default Sidebar;
