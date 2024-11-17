import React, { useState } from 'react';
import { Save, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../../config/constants';

function Settings() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { language, setLanguage, translations } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: false
  });

  const handleEmailNotifications = async (enabled) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/settings/email-notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ emailNotifications: enabled })
      });

      if (!response.ok) throw new Error('Failed to update email settings');

      const data = await response.json();
      
      setSettings(prev => ({
        ...prev,
        emailNotifications: enabled
      }));

      toast.success(enabled ? 'Email notifications enabled' : 'Email notifications disabled');
      
      // Show additional success message if enabled
      if (enabled) {
        toast.success('Test email sent to your email address', {
          duration: 5000,
          icon: '📧'
        });
      }

    } catch (error) {
      console.error('Email settings error:', error);
      toast.error('Failed to update email settings');
      // Revert the toggle if failed
      setSettings(prev => ({
        ...prev,
        emailNotifications: !enabled
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveSettings = () => {
    try {
      // Save settings to localStorage or backend
      localStorage.setItem('settings', JSON.stringify(settings));
      toast.success(translations.settings.saveSuccess);
    } catch (error) {
      toast.error(translations.settings.saveError);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Reload translations immediately
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">
            {translations.settings.title}
          </h2>
          
          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white">
                  {translations.settings.darkMode}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {translations.settings.darkModeDesc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                />
                <motion.div
                  className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full 
                    peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  whileTap={{ scale: 0.95 }}
                />
              </label>
            </div>

            {/* Language Selector */}
            <div>
              <h3 className="font-medium dark:text-white mb-2">
                {translations.settings.language}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {translations.settings.languageDesc}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['en', 'so', 'ar'].map((lang) => (
                  <motion.button
                    key={lang}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLanguageChange(lang)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      language === lang
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      language === lang
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {lang === 'en' ? 'English' : lang === 'so' ? 'Somali' : 'العربية'}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Email Notifications with Loading State */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  {translations.settings.notifications}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {translations.settings.notificationsDesc}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleEmailNotifications(e.target.checked)}
                  disabled={isUpdating}
                  className="sr-only peer"
                />
                <motion.div
                  className={`w-11 h-6 bg-gray-200 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:bg-blue-600 
                    after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                    after:bg-white after:rounded-full after:h-5 after:w-5 
                    after:transition-all ${isUpdating ? 'opacity-50' : ''}`}
                  whileTap={{ scale: 0.95 }}
                />
                {isUpdating && (
                  <div className="absolute right-0 ml-3">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                  </div>
                )}
              </label>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveSettings}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 
                transition-colors flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Save className="h-5 w-5 mr-2" />
              {translations.settings.save}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 