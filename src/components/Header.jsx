import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  // const { user, logout } = useAuth();

  return (
    <header className="sticky top-2 z-35">
      <div className="px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" color="#4cd7f6" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center gap-3">
                <section className="bg-white px-4 py-1 rounded-3xl flex items-center gap-2 ">
                  <div className="flex flex-col items-end">
                    <span className="text-[12px] font-medium text-gray-700">
                      {/* {user?.name || 'Admin User'}
                       */}
                      Admin User
                    </span>
                    <span className="text-[9px] text-gray-500">Administrator</span>
                  </div>
                  <div className="h-10 w-10 rounded-lg  flex items-center justify-center">
                    <User className="h-6 w-5 " />
                  </div>
                </section>

                {/* Notifications */}

                <section className="flex items-center justify-center gap-3">
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <span className="sr-only">View notifications</span>
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                  </div>

                  {/* Logout */}

                  <button
                    // onClick={logout}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
