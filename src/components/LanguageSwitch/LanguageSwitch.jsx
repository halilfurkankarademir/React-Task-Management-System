import React, { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const handleLanguageChange = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher" id='language'>
      <select name="lang" id="language-select" onChange={handleLanguageChange}>
        <option value="">{t('profile.lang')}</option>
        <option value="en">English</option>
        <option value="tr">Turkish</option>
      </select>
    </div>
  );
};

export default LanguageSwitch;
