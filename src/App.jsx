import { FaArrowUp } from "react-icons/fa";
import React, { useEffect } from "react";
import {
    HashRouter as Router,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import MyTasks from "./pages/MyTasksPage/MyTasks";
import Homepage from "./pages/HomePageMain/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import MyTeamsPage from "./pages/MyTeams/MyTeamsPage";
import Archive from "./pages/ArchivePage/Archive";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Calendar from "./pages/CalendarPage/Calendar"
import Mobile from "./pages/MobileRedicert/MobilePage";
import { useTranslation } from "react-i18next";
import useDeviceDetect from "./components/useDeviceDetect";
import { UserProvider } from "./context/UserContext";

const Wrapper = () => {
    const { t } = useTranslation();
    const today = new Date();
    const monthIndex = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    const location = useLocation();
    const navigate = useNavigate();
    const { isMobile } = useDeviceDetect();
    useEffect(() => {
        if (isMobile) {
            navigate("/mobile");
        }
    }, [isMobile, navigate]);

    return (
        <>
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
                <Route path="/mobile" element={<Mobile />} />
            </Routes>
            {location.pathname !== "/homepage" && location.pathname !== "/mobile" && location.pathname !== "/" &&(
                <p className="currentDate">
                    {t(`dates.months.${monthIndex}`)} {day}, {year}
                </p>
            )}
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
                <div
                    style={{ display: "flex" }}
                >
                    <main>
                        <Wrapper />
                    </main>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
