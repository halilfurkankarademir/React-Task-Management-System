import { FaArrowUp } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
    HashRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import MyTasks from "./pages/MyTasksPage/MyTasks";
import Homepage from "./pages/HomePageMain/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import MyTeamsPage from "./pages/MyTeams/MyTeamsPage";
import Archive from "./pages/ArchivePage/Archive";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Calendar from "./pages/CalendarPage/Calendar";
import { useTranslation } from "react-i18next";
import { UserProvider } from "./context/UserContext";
import useDeviceDetect from "./components/useDeviceDetect";
import Sidebar from "./components/Sidebar";
import "./styles/responsive.css";

const Wrapper = () => {
    const { t } = useTranslation();
    const today = new Date();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    const location = useLocation();
    const { isMobile, isTablet } = useDeviceDetect();
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

    // Ekran genişliğine göre sidebar durumunu otomatik ayarla
    useEffect(() => {
        setIsSidebarOpen(!isMobile);
    }, [isMobile]);

    // Sidebar toggle fonksiyonu
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div
                className={`app-container ${
                    isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
            >
                {location.pathname !== "/" && (
                    <Sidebar
                        isMobile={isMobile}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                )}
                <div className="main-content">
                    <Routes>
                        <Route exact path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/mytasks" element={<MyTasks />} />
                        <Route path="/myteams" element={<MyTeamsPage />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                    {location.pathname !== "/" && (
                        <p className="currentDate">
                            {t(`dates.months.${monthIndex}`)} {day}, {year}
                        </p>
                    )}
                </div>
            </div>
            <FaArrowUp
                className="arrowIcon"
                href="#"
                onClick={() => window.scrollTo(0, 0)}
            />
        </>
    );
};

function App() {
    return (
        <UserProvider>
            <Router>
                <Wrapper />
            </Router>
        </UserProvider>
    );
}

export default App;
