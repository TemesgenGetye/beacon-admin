import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MonitorSmartphone,
  Radio,
  FileText,
  MessageSquare,
  X,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Advertisements', icon: MonitorSmartphone, path: '/advertisements' },
    { name: 'Beacons', icon: Radio, path: '/beacons' },
    { name: 'Logs', icon: FileText, path: '/logs' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <Radio className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">AdBeacon</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  activeItem === item.path
                    ? 'bg-primary text-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveItem(item.path)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    activeItem === item.path
                      ? 'text-black'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
