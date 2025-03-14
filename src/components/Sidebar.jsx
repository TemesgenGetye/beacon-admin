import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MonitorSmartphone,
  Radio,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  ChevronLeft,
  X,
  Handshake,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Advertisements', icon: MonitorSmartphone, path: '/advertisements' },
    { name: 'Assigment', icon: Handshake, path: '/assigment' },
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
        className={`fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 h-[96%] rounded-l-[50px] shadow-xl ml-4 m-auto bg-white transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <button
            className="hidden lg:block text-gray-400 hover:text-gray-600"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="flex items-center justify-between h-16 px-6 py-20">
              <div className="flex items-center">
                <div className="flex items-center justify-center">
                  <Radio className="h-10 w-10 text-primary" />
                </div>
                {!collapsed && (
                  <span className="ml-3 text-xl font-medium text-primary">Beacon Dash</span>
                )}
              </div>
              <div className="flex items-center">
                <button
                  className="text-gray-400 hover:text-gray-600 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-0.5 px-3">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-3 py-4 text-sm font-normal rounded-md transition-colors ${
                    activeItem === item.path
                      ? 'text-primary bg-sky-50/50'
                      : 'text-gray-400 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      activeItem === item.path
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-primary'
                    }`}
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="py-4">
            <div className="space-y-0.5 px-3">
              {bottomNavItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-3 py-2 text-sm font-normal rounded-md transition-colors ${
                    activeItem === item.path
                      ? 'text-primary bg-sky-50/50'
                      : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  <item.icon
                    className={`h-5 w-5 mr-3 ${
                      activeItem === item.path
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-primary'
                    }`}
                  />
                  {!collapsed && <span>{item.name}</span>}
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
