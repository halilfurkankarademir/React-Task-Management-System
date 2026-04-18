import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import userPhoto from "../assets/userPhoto.jpg";

const Sidebar = ({ isMobile, isOpen, toggleSidebar }) => {
    const { t } = useTranslation();
    const username = localStorage.getItem("username");
    const profileImage = localStorage.getItem("profileImage");
    const location = useLocation();

    // Aktif menü öğesini belirle
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
            {isMobile && (
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
                </div>
            )}

            <div className="sidebar-content">
                <div className="sidebar-header">
                    <Link to="/" className="logo-link">
                        <span className="logo-text">{t("sidebar.title")}</span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li className={`nav-item ${isActive("/dashboard")}`}>
                            <Link to="/dashboard" className="nav-link">
                                <i className="bi bi-graph-up"></i>
                                <span className="nav-text">
                                    {t("sidebar.dashboard")}
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/mytasks")}`}>
                            <Link to="/mytasks" className="nav-link">
                                <i className="bi bi-journal-check"></i>
                                <span className="nav-text">
                                    {t("sidebar.myTasks")}
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/archive")}`}>
                            <Link to="/archive" className="nav-link">
                                <i className="bi bi-archive"></i>
                                <span className="nav-text">
                                    {t("sidebar.archive")}
                                </span>
                            </Link>
                        </li>
                        <li className={`nav-item ${isActive("/calendar")}`}>
                            <Link to="/calendar" className="nav-link">
                                <i className="bi bi-calendar3"></i>
                                <span className="nav-text">
                                    {t("sidebar.calendar")}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile dropdown">
                        <a
                            className="profile-link dropdown-toggle"
                            type="button"
                            id="userDropdown"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div className="profile-image">
                                <img
                                    src={profileImage || userPhoto}
                                    alt="Profile"
                                    className="user-avatar"
                                />
                            </div>
                            <span className="username">
                                {username || t("sidebar.guest")}
                            </span>
                        </a>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="userDropdown"
                        >
                            <Link className="dropdown-item" to="/profile">
                                <i className="bi bi-person"></i>{" "}
                                {t("sidebar.profile")}
                            </Link>
                            <Link className="dropdown-item" to="/">
                                <i className="bi bi-house"></i>{" "}
                                {t("sidebar.homePage")}
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/login">
                                <i className="bi bi-box-arrow-right"></i>{" "}
                                {t("sidebar.logout")}
                            </Link>
                        </div>
                    </div>
                    <p className="copyright">&copy; {t("sidebar.copyright")}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
