import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BsGraphUp, BsGearFill, BsCalendarEvent } from "react-icons/bs";
import { FaHospital, FaUserMd, FaUserInjured } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { MdMedicalServices } from "react-icons/md";
import AdminDoctorsPage from "./admin/AdminDoctorsPage";
import AddDoctorForm from "./admin/AddDoctorForm";
import EditDoctorForm from "./admin/EditDoctorForm";
import AdminSpecialtiesPage from "./admin/AdminSpecialtiesPage";
import AdminPatientsPage from "./admin/AdminPatientsPage"; 
import AddSpecialtyForm from "./admin/AddSpecialtyForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminSettingsPage from "./admin/AdminSettingsPage";
import AdminAdminsPage from "./admin/AdminAdminsPage";
import AdminAppointmentsPage from "./admin/AdminAppointmentsPage";
import AdminChanellingCentersPage from "./admin/AdminChannelingCentersPage";
import AddChanellingCenterForm from "./admin/AddChannelingCenterForm";
import EditChanellingCenterForm from "./admin/EditChanellingCenterForm";

export default function AdminHomePage() {
    const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    doctors: 0,
    specialties: 0,
    patients: 0,
    appointments: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {      
      navigate("/login");
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.data.type !== "admin") {
        toast.error("Unauthorized access");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUser(res.data);
        fetchDashboardStats(token);
      }
    }).catch((err) => {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  const fetchDashboardStats = async (token) => {
    try {
      const [doctorsRes, specialtiesRes, appointmentsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => ({ data: { success: false, data: [] } })),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/specialties`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => ({ data: { success: false, data: [] } })),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => ({ data: { success: false, data: [] } }))
      ]);

      const appointments = appointmentsRes.data.success ? appointmentsRes.data.data : [];
      const patientsMap = new Map();
      appointments.forEach(appointment => {
        if (!patientsMap.has(appointment.email)) {
          patientsMap.set(appointment.email, {
            email: appointment.email,
            name: appointment.patientName
          });
        }
      });

      const recentAppointments = appointments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(appointment => ({
          type: 'appointment',
          title: `New appointment booked`,
          description: `${appointment.patientName} - ${appointment.time}`,
          createdAt: appointment.createdAt,
          icon: <BsCalendarEvent className="text-sm md:text-base" />
        }));

      setStats({
        doctors: doctorsRes.data.success ? doctorsRes.data.data.length : 0,
        specialties: specialtiesRes.data.success ? specialtiesRes.data.data.length : 0,
        patients: patientsMap.size,
        appointments: appointments.length
      });

      setRecentActivities(recentAppointments);
    } catch (error) {
      toast.error("Failed to load dashboard statistics");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">

      <div className="md:hidden bg-blue-900 p-4 flex justify-between items-center text-white">
        <div className="flex items-center">
          <h1 className="ml-3 text-lg font-bold">Admin Panel</h1>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-white focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-blue-900 text-white shadow-xl flex flex-col transition-all duration-300`}>
        <div className="p-6 flex items-center justify-center border-b border-blue-500/20 md:block">
          <div className="flex items-center">
            <h1 className="ml-3 text-xl font-bold hidden md:block">Admin Panel</h1>
          </div>
        </div>
        
        <div className="p-4 space-y-2 mt-6 flex-1">
          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin"
            onClick={() => handleNavClick('dashboard')}
          >
            <BsGraphUp className="mr-3 text-lg" /> 
            <span>Dashboard</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'doctors' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/doctors"
            onClick={() => handleNavClick('doctors')}
          >
            <FaUserMd className="mr-3 text-lg" /> 
            <span>Doctors</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'specialties' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/specialties"
            onClick={() => handleNavClick('specialties')}
          >
            <MdMedicalServices className="mr-3 text-lg" /> 
            <span>Specialties</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'chanelling-centers' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/chanelling-centers"
            onClick={() => handleNavClick('chanelling-centers')}
          >
            <FaHospital className="mr-3 text-lg" /> 
            <span>Chanelling Centers</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'patients' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/patients"
            onClick={() => handleNavClick('patients')}
          >
            <FaUserInjured className="mr-3 text-lg" /> 
            <span>Patients</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'appointments' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/appointments"
            onClick={() => handleNavClick('appointments')}
          >
            <BsCalendarEvent className="mr-3 text-lg" /> 
            <span>Appointments</span>
          </Link>

          <Link 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeTab === 'settings' 
                ? 'bg-white/10 text-white shadow-md' 
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
            }`}
            to="/admin/settings"
            onClick={() => handleNavClick('settings')}
          >
            <BsGearFill className="mr-3 text-lg" /> 
            <span>Settings</span>
          </Link>
        </div>

        <div className="p-4 border-t border-blue-500/20">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white group"
          >
            <FiLogOut className="mr-2 text-lg transform group-hover:translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]}` : 'Admin Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {user != null ? (
            <Routes path="/*">
              <Route path="/" element={
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">Dashboard Overview</h3>
                      <button 
                        onClick={() => fetchDashboardStats(localStorage.getItem("token"))}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Refresh Data
                      </button>
                    </div>
        
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium">Total Doctors</p>
                            <p className="text-2xl md:text-3xl font-bold mt-1">{stats.doctors}</p>
                          </div>
                          <FaUserMd className="text-xl md:text-2xl opacity-80" />
                        </div>
                        <div className="mt-4">
                          <div className="h-1 bg-blue-400 rounded-full">
                            <div className="h-1 bg-white rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 md:p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium">Total Specialties</p>
                            <p className="text-2xl md:text-3xl font-bold mt-1">{stats.specialties}</p>
                          </div>
                          <MdMedicalServices className="text-xl md:text-2xl opacity-80" />
                        </div>
                        <div className="mt-4">
                          <div className="h-1 bg-green-400 rounded-full">
                            <div className="h-1 bg-white rounded-full w-2/3"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 md:p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium">Total Patients</p>
                            <p className="text-2xl md:text-3xl font-bold mt-1">{stats.patients}</p>
                          </div>
                          <FaUserInjured className="text-xl md:text-2xl opacity-80" />
                        </div>
                        <div className="mt-4">
                          <div className="h-1 bg-purple-400 rounded-full">
                            <div className="h-1 bg-white rounded-full w-1/2"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 md:p-6 rounded-lg text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs md:text-sm font-medium">Total Appointments</p>
                            <p className="text-2xl md:text-3xl font-bold mt-1">{stats.appointments}</p>
                          </div>
                          <BsCalendarEvent className="text-xl md:text-2xl opacity-80" />
                        </div>
                        <div className="mt-4">
                          <div className="h-1 bg-yellow-400 rounded-full">
                            <div className="h-1 bg-white rounded-full w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                      <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Recent Activity</h4>
                      <div className="space-y-4">
                        {recentActivities.length > 0 ? (
                          recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                {activity.icon}
                              </div>
                              <div className="ml-3 md:ml-4">
                                <p className="text-xs md:text-sm font-medium text-gray-900">{activity.title}</p>
                                <p className="text-xs md:text-sm text-gray-500">{activity.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(activity.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No recent activities found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              } />
 
              <Route path="/doctors" element={<AdminDoctorsPage />} />
              <Route path="/doctors/addDoctor" element={<AddDoctorForm />} />
             <Route path="/doctors/edit/:id" element={<EditDoctorForm />} />
              <Route path="/specialties" element={<AdminSpecialtiesPage />} />
              <Route path="/specialties/addSpecialty" element={<AddSpecialtyForm />} />
              <Route path="/patients" element={<AdminPatientsPage />} />
              <Route path="/admins" element={<AdminAdminsPage />} />
              <Route path="/settings" element={<AdminSettingsPage />} />
              <Route path="/chanelling-centers" element={<AdminChanellingCentersPage />} />
              <Route path="/chanelling-centers/add" element={<AddChanellingCenterForm />} />
              <Route path="/chanelling-centers/edit" element={<EditChanellingCenterForm />} />
              <Route path="/appointments" element={<AdminAppointmentsPage />} />
              <Route path="/*" element={<h1>404 not found the admin page</h1>} />
            </Routes>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}