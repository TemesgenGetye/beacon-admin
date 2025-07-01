import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Advertisements from './pages/Advertisements';
import Beacons from './pages/Beacons';
import Logs from './pages/Logs';
import Messages from './pages/Messages';
import Assigment from './pages/Assigment';
import Setting from './pages/Setting';
import Help from './pages/Help';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// // Lazy-loaded pages
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Advertisements = lazy(() => import('./pages/Advertisements'));
// const Beacons = lazy(() => import('./pages/Beacons'));
// const Logs = lazy(() => import('./pages/Logs'));
// const Messages = lazy(() => import('./pages/Messages'));
// const Assigment = lazy(() => import('./pages/Assigment'));
// const Setting = lazy(() => import('./pages/Setting'));
// const Help = lazy(() => import('./pages/Help'));
// const Login = lazy(() => import('./pages/Login'));
// const NotFound = lazy(() => import('./pages/NotFound'));

const MainLayout = ({ sidebarOpen, setSidebarOpen, children }) => (
  <div className="flex h-screen overflow-hidden bg-secondary">
    <nav>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </nav>
    <div className="flex flex-1 flex-col overflow-hidden">
      <header>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </header>
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">{children}</main>
    </div>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/advertisements" element={<Advertisements />} />
                    <Route path="/assigment" element={<Assigment />} />
                    <Route path="/beacons" element={<Beacons />} />
                    <Route path="/logs" element={<Logs />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export default App;
