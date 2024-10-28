// AdminDashboard.js
import React from 'react';
import Sidebar from '../components/common/SideBar';
import Header from '../components/common/Header';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-8 bg-gray-100 flex-1">
          <section className="space-y-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Homeowners</h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b font-medium">Name</th>
                    <th className="px-4 py-2 border-b font-medium">Email</th>
                    <th className="px-4 py-2 border-b font-medium">Phone</th>
                    <th className="px-4 py-2 border-b font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with dynamic data */}
                  <tr>
                    <td className="px-4 py-2 border-b">John Doe</td>
                    <td className="px-4 py-2 border-b">john@example.com</td>
                    <td className="px-4 py-2 border-b">123-456-7890</td>
                    <td className="px-4 py-2 border-b text-blue-600 cursor-pointer">Edit | Delete</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Properties</h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b font-medium">Property ID</th>
                    <th className="px-4 py-2 border-b font-medium">Owner</th>
                    <th className="px-4 py-2 border-b font-medium">Location</th>
                    <th className="px-4 py-2 border-b font-medium">Status</th>
                    <th className="px-4 py-2 border-b font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Replace with dynamic data */}
                  <tr>
                    <td className="px-4 py-2 border-b">P-001</td>
                    <td className="px-4 py-2 border-b">John Doe</td>
                    <td className="px-4 py-2 border-b">Downtown</td>
                    <td className="px-4 py-2 border-b">Active</td>
                    <td className="px-4 py-2 border-b text-blue-600 cursor-pointer">Edit | Delete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
