import React from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Login from './Component/Login';
import UserTable from './Table/UserTable'; // Example for redirection after login
import { Toaster } from 'react-hot-toast';
import UserDashboard from './Component/UserDashboard';
import AdminHomePage from './Component/AdminHomePage';
import AdminComplains from './Component/AdminComplains';
import UserHome from './Component/UserHome';
import UserProfile from './Component/UserProfile';
import AdminLoginLogs from './Component/AdminLoginLogs';
import NotFound from "./Component/NotFound";
import PrivateRoute from './Component/PrivateRoute';


//export default function App() {
  // const PreventBackNavigation = () => {
  //   const location = useLocation();  // Get the current location
    
  //   useEffect(() => {
  //     window.history.pushState(null, "", window.location.href);
  //     const handlePopState = () => {
  //       window.history.pushState(null, "", window.location.href);  // Block back
  //     };
  
  //     window.addEventListener("popstate", handlePopState);
  
  //     return () => {
  //       window.removeEventListener("popstate", handlePopState);  // Clean up on unmount
  //     };
  //   }, [location]);
  
  //   return null;  // No UI rendering
  // };

  export default function App() {
    return (
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Wrap protected routes in PrivateRoute */}
          <Route path="/admin-dashboard" element={
            <PrivateRoute>
              <UserTable />
            </PrivateRoute>
          } />
          <Route path="/user-dashboard" element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } />
          <Route path="/user-home" element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          } />
          <Route path="/user-profile" element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } />
          <Route path="/admin-home" element={
            <PrivateRoute>
              <AdminHomePage />
            </PrivateRoute>
          } />
          <Route path="/admin-complains" element={
            <PrivateRoute>
              <AdminComplains />
            </PrivateRoute>
          } />
          <Route path="/user-activity" element={
            <PrivateRoute>
              <AdminLoginLogs />
            </PrivateRoute>
          } />
  
          <Route path="*" element={<NotFound />} />  {/* Catch-all route */}
        </Routes>
      </Router>
    );
  }