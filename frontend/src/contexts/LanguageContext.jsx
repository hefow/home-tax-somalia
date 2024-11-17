import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translation objects
const translationData = {
  en: {
    settings: {
      title: 'Settings',
      darkMode: 'Dark Mode',
      darkModeDesc: 'Toggle dark mode theme',
      language: 'Language',
      languageDesc: 'Select your preferred language',
      notifications: 'Email Notifications',
      notificationsDesc: 'Receive email alerts for important updates',
      save: 'Save Settings',
      saveSuccess: 'Settings saved successfully',
      saveError: 'Failed to save settings'
    },
    sidebar: {
      title: 'Admin Panel',
      overview: 'Overview',
      users: 'Users',
      allUsers: 'All Users',
      addUser: 'Add User',
      properties: 'Properties',
      allProperties: 'All Properties',
      addProperty: 'Add Property',
      settings: 'Settings',
      logout: 'Logout'
    },
    overview: {
      title: 'Dashboard Overview',
      welcome: 'Welcome back! Here\'s what\'s happening today.',
      stats: {
        totalUsers: 'Total Users',
        properties: 'Properties',
        homeowners: 'Homeowners',
        monthlyRevenue: 'Monthly Revenue',
        active: 'Active',
        new: 'new',
        thisMonth: 'This Month'
      },
      charts: {
        revenueTrends: 'Revenue Trends',
        recentActivities: 'Recent Activities',
        viewAll: 'View All',
        amount: 'Amount',
        date: 'Date'
      },
      systemStatus: {
        title: 'System Status',
        online: {
          title: 'System Online',
          description: 'All services running'
        },
        performance: {
          title: 'Performance',
          description: 'Optimal conditions'
        },
        updates: {
          title: 'Updates Available',
          description: '2 system updates'
        }
      }
    },
    users: {
      title: 'User Management',
      stats: {
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        newThisMonth: 'New This Month',
        adminUsers: 'Admin Users'
      },
      table: {
        user: 'User',
        contact: 'Contact',
        status: 'Status',
        role: 'Role',
        joinedDate: 'Joined Date',
        actions: 'Actions',
        active: 'Active',
        inactive: 'Inactive',
        lastActivity: 'Last activity'
      },
      filters: {
        searchPlaceholder: 'Search users...',
        allRoles: 'All Roles',
        adminsOnly: 'Admins Only',
        homeownersOnly: 'Homeowners Only',
        sortBy: {
          newest: 'Newest First',
          oldest: 'Oldest First',
          alphabetical: 'Alphabetical'
        }
      }
    },
    properties: {
      title: 'Property Management',
      stats: {
        totalProperties: 'Total Properties',
        occupiedProperties: 'Occupied Properties',
        newThisMonth: 'New This Month',
        totalValue: 'Total Value'
      },
      table: {
        property: 'Property',
        owner: 'Owner',
        type: 'Type',
        value: 'Value',
        addedDate: 'Added Date',
        actions: 'Actions',
        noOwner: 'No Owner',
        location: 'Location'
      },
      filters: {
        searchPlaceholder: 'Search properties...',
        allTypes: 'All Types',
        house: 'House',
        apartment: 'Apartment',
        commercial: 'Commercial',
        land: 'Land',
        sortBy: {
          newest: 'Newest First',
          oldest: 'Oldest First',
          valueHigh: 'Highest Value',
          valueLow: 'Lowest Value'
        }
      }
    }
  },
  so: {
    settings: {
      title: 'Hagaajinta',
      darkMode: 'Habka Madow',
      darkModeDesc: 'Dooro habka madow',
      language: 'Luqadda',
      languageDesc: 'Dooro luqaddaada',
      notifications: 'Ogeysiisyada Emailka',
      notificationsDesc: 'Hel farriimo muhiim ah',
      save: 'Kaydi',
      saveSuccess: 'Hagaajinta waa la keydiyey',
      saveError: 'Waa la waayey in la keydiyo hagaajinta'
    },
    sidebar: {
      title: 'Maamulka',
      overview: 'Guud ahaan',
      users: 'Isticmaalayaasha',
      allUsers: 'Dhammaan Isticmaalayaasha',
      addUser: 'Kudar Isticmaale',
      properties: 'Hantida',
      allProperties: 'Dhammaan Hantida',
      addProperty: 'Kudar Hanti',
      settings: 'Hagaajinta',
      logout: 'Ka bax'
    },
    overview: {
      title: 'Guud ahaan Dashboard-ka',
      welcome: 'Ku soo dhawoow! Halkan waxaa ku qoran waxa maanta dhacaya.',
      stats: {
        totalUsers: 'Wadarta Isticmaalayaasha',
        properties: 'Hantida',
        homeowners: 'Milkiileyaasha',
        monthlyRevenue: 'Dakhliga Bishii',
        active: 'Firfircoon',
        new: 'cusub',
        thisMonth: 'Bishan'
      },
      charts: {
        revenueTrends: 'Isbedelada Dakhliga',
        recentActivities: 'Dhaqdhaqaaqyada Dhowaan',
        viewAll: 'Arag Dhammaan',
        amount: 'Qadarka',
        date: 'Taariikhda'
      },
      systemStatus: {
        title: 'Xaaladda Sistemka',
        online: {
          title: 'Sistem Shaqeynaya',
          description: 'Dhammaan adeegyadu way shaqeynayaan'
        },
        performance: {
          title: 'Waxqabadka',
          description: 'Xaalad wanaagsan'
        },
        updates: {
          title: 'Cusbooneysiino La Heli Karo',
          description: '2 cusbooneysiino sistem'
        }
      }
    }
  },
  ar: {
    settings: {
      title: 'الإعدادات',
      darkMode: 'الوضع المظلم',
      darkModeDesc: 'تبديل الوضع المظلم',
      language: 'اللغة',
      languageDesc: 'اختر لغتك المفضلة',
      notifications: 'إشعارات البريد الإلكتروني',
      notificationsDesc: 'تلقي تنبيهات البريد الإلكتروني للتحديثات المهمة',
      save: 'حفظ الإعدادات',
      saveSuccess: 'تم حفظ الإعدادات بنجاح',
      saveError: 'فشل في حفظ الإعدادات'
    },
    sidebar: {
      title: 'لوحة الإدارة',
      overview: 'نظرة عامة',
      users: 'المستخدمون',
      allUsers: 'جميع المستخدمين',
      addUser: 'إضافة مستخدم',
      properties: 'العقارات',
      allProperties: 'جميع العقارات',
      addProperty: 'إضافة عقار',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج'
    },
    overview: {
      title: 'نظرة عامة على لوحة التحكم',
      welcome: 'مرحباً بعودتك! إليك ما يحدث اليوم.',
      stats: {
        totalUsers: 'إجمالي المستخدمين',
        properties: 'العقارات',
        homeowners: 'أصحاب المنازل',
        monthlyRevenue: 'الإيرادات الشهرية',
        active: 'نشط',
        new: 'جديد',
        thisMonth: 'هذا الشهر'
      },
      charts: {
        revenueTrends: 'اتجاهات الإيرادات',
        recentActivities: 'النشاطات الأخيرة',
        viewAll: 'عرض الكل',
        amount: 'المبلغ',
        date: 'التاريخ'
      },
      systemStatus: {
        title: 'حالة النظام',
        online: {
          title: 'النظام متصل',
          description: 'جميع الخدمات تعمل'
        },
        performance: {
          title: 'الأداء',
          description: 'ظروف مثالية'
        },
        updates: {
          title: 'تحديثات متوفرة',
          description: 'تحديثان للنظام'
        }
      }
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  const [translations, setTranslations] = useState(translationData[language]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    setTranslations(translationData[language]);
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 