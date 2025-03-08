'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MonitorSmartphone,
  Radio,
  FileText,
  MessageSquare,
  X,
  Settings,
  HelpCircle,
  ChevronLeft,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Advertisements', icon: MonitorSmartphone, path: '/advertisements' },
    { name: 'Beacons', icon: Radio, path: '/beacons' },
    { name: 'Logs', icon: FileText, path: '/logs' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
  ];

  const bottomNavItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 transition-opacity duration-200 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center">
              <Radio className="h-8 w-8 text-primary" />
              {!collapsed && <span className="ml-2 text-lg font-semibold">AdBeacon</span>}
            </div>
            <div className="flex items-center">
              <button
                className="text-gray-500 hover:text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="hidden lg:block text-gray-500 hover:text-gray-700"
                onClick={() => setCollapsed(!collapsed)}
              >
                <ChevronLeft
                  className={`h-5 w-5 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeItem === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      activeItem === item.path
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t px-3 py-4">
            <div className="space-y-1">
              {bottomNavItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeItem === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      activeItem === item.path
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
