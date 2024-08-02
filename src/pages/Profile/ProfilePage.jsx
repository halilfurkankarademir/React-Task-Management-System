import React, { useState, useEffect } from "react";
import "./Profile.css";
import Sidebar from "../../components/Sidebar";
import { useTranslation } from "react-i18next";
import CustomModal from "../../components/Modal2";
import UserPhoto from "../../assets/userPhoto.jpg"; 
import LanguageSwitch from "../../components/LanguageSwitch/LanguageSwitch";

const ProfilePage = () => {
    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        document.title = t('profile.main');
    }, [t]);

    const handleCloseModal = () => {
        setIsModalVisible(false); 
    };

    const [profileInput, setProfileInput] = useState(
        localStorage.getItem("username") || ""
    );
    const [profileImage, setProfileImage] = useState(
        localStorage.getItem("profileImage") || UserPhoto 
    );
    const [fullName, setFullName] = useState(
        localStorage.getItem("fullName") || ""
    );
    const [email, setEmail] = useState(
        localStorage.getItem("email") || ""
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("username", profileInput);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", email);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");
                setProfileImage(`data:image/jpeg;base64,${base64String}`);
                localStorage.setItem("profileImage", `data:image/jpeg;base64,${base64String}`);
            };
            reader.readAsDataURL(file);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div className="profile-container" id="profilePage">
            <Sidebar />
            <LanguageSwitch></LanguageSwitch>
            <h1>{t('profile.title')} <i className="bi bi-person-badge"></i></h1>
            <img
                src={profileImage}
                alt="Profile"
                className="photo"
            />
            <select name="theme" id="" className="select-theme">
                <option value="default">{t('profile.theme')}</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
            <form onSubmit={handleSubmit} className="profile-form">
                <label htmlFor="photoInput" className="custom-file-upload">
                    {t('profile.select')}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    placeholder="Change"
                    name="photoInput"
                    id="photoInput"
                    style={{ display: "none" }}
                />
                
                <label htmlFor="fullname">{t('profile.fullName')}</label>
                <input
                    type="text"
                    placeholder={t('profile.fullNameP')}
                    name="fullname"
                    minLength={4}
                    maxLength={32}
                    className="inputProfile"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                />
                <label htmlFor="profile">{t('profile.username')}</label>
                <input
                    type="text"
                    placeholder={t('profile.usernameP')}
                    name="profile"
                    value={profileInput}
                    onChange={(e) => setProfileInput(e.target.value)}
                    maxLength={12}
                    className="inputProfile"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder={t('profile.emailP')}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    className="inputProfile"
                />
                <button type="submit" className="save-button" onClick={showModal}>{t('profile.save')}</button>
            </form>
            <CustomModal isVisible={isModalVisible} handleClose={handleCloseModal} />
        </div>
    );
};

export default ProfilePage;
