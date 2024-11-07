// AdminDashboard.js
import React, { useState, useEffect } from 'react';

import { Users, Home, Trash2, RefreshCw, Settings, Sidebar } from 'lucide-react';
import Header from '../components/common/Header';
import toast from 'react-hot-toast';
import UserMange from '../components/common/UserManage';
import ProprtyManage from '../components/common/PropertyManage';
import HomeownerForm from '../components/homeowner/HomeownerForm';
import Setting from '../components/common/Setting';
import { Route, Routes } from 'react-router-dom';
import SideBar from '../components/common/SideBar';
import Overview from '../components/common/Overview';

function AdminDashboard() {
  return(
    <div className="flex">
      <SideBar/>
      <Header/>
      <div className="flex-1 p-4">
        <Routes>
          <Route path='/' element={<Overview/>}/>
          <Route path="/users" element={<UserMange />} />
          <Route path="/property" element={<ProprtyManage />} />
          <Route path="/homeowner" element={<HomeownerForm />} />
          <Route path="/settings" element={<Setting/>} />
          {/* Add other nested routes as needed */}
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard;
