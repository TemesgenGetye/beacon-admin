import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://proximity-based-marketing.onrender.com/api/v1/advertisements/'
      );
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
            </button>
            <div className="ml-3 relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {/* {user?.name || 'Admin User'} */}
                  Admin User
                </span>
                <button
                  // onClick={logout}
                  className="ml-2 p-2 text-gray-400 rounded-full hover:text-gray-500 hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
