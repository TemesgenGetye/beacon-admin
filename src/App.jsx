import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Advertisements from './pages/Advertisements';
import Beacons from './pages/Beacons';
import Logs from './pages/Logs';
import Messages from './pages/Messages';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-secondary">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/advertisements" element={<Advertisements />} />
              <Route path="/beacons" element={<Beacons />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
export default App;

// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/authContext';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Advertisements from './pages/Advertisements';
// import Beacons from './pages/Beacons';
// import Logs from './pages/Logs';
// import Messages from './pages/Messages';
// import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />

//           <Route element={<ProtectedRoute />}>
//             <Route
//               path="/*"
//               element={
//                 <div className="flex h-screen overflow-hidden bg-gray-100">
//                   {/* Sidebar */}
//                   <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//                   {/* Main content */}
//                   <div className="flex flex-1 flex-col overflow-hidden">
//                     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//                     <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
//                       <Routes>
//                         <Route path="/" element={<Dashboard />} />
//                         <Route path="/advertisements" element={<Advertisements />} />
//                         <Route path="/beacons" element={<Beacons />} />
//                         <Route path="/logs" element={<Logs />} />
//                         <Route path="/messages" element={<Messages />} />
//                         <Route path="*" element={<Navigate to="/" replace />} />
//                       </Routes>
//                     </main>
//                   </div>
//                 </div>
//               }
//             />
//           </Route>
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
