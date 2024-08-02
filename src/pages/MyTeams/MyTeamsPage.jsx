import React, { useTransition } from "react";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const MyTeamsPage = () => {
    const { t } = useTranslation();
    
    useEffect(()=>{
        document.title= t('myTeams.main')
    },[])
    
    return (
        <div>
            <Sidebar></Sidebar>
        </div>
    );
};

export default MyTeamsPage;
