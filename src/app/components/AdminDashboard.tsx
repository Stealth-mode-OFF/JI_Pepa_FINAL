import React from "react";
import { Container } from "./Layout";

export const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_auth_time');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <span className="font-['Montserrat'] font-bold text-lg">Admin Dashboard</span>
        <button 
          onClick={handleLogout}
          className="text-sm font-['Inter'] text-red-600 hover:text-red-700 font-bold uppercase tracking-wider"
        >
          Logout
        </button>
      </nav>
      <Container className="py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="font-['Montserrat'] font-bold text-2xl mb-6">Welcome back</h1>
          <p className="text-gray-600">This is the admin dashboard. Functionality coming soon.</p>
        </div>
      </Container>
    </div>
  );
};
