import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  FaPlus, 
  FaTrash, 
  FaSearch, 
  FaEdit, 
  FaUserMd, 
  FaSpinner,
  FaHospital,
  FaPhone,
  FaEnvelope,
  FaBriefcaseMedical
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      const data = Array.isArray(response?.data) ? response.data : 
                  (response?.data?.data ? response.data.data : []);
      
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => 
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.specialty?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (doctorId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/${doctorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete doctor");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FaUserMd className="text-2xl text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Doctor Management</h2>
          </div>
          <div className="flex space-x-3">
            <Link 
              to="/admin/doctors/addDoctor"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> New Doctor
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">Manage all doctors in the system</p>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="text-right text-sm text-gray-500 flex items-center justify-end md:justify-center">
            Showing {filteredDoctors.length} of {doctors.length} doctors
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredDoctors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            src={doctor.photo} 
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {doctor.firstName} {doctor.lastName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FaHospital className="mr-1 text-xs" />
                            {doctor.hospital || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaBriefcaseMedical className="text-blue-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {doctor.specialty?.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <FaEnvelope className="mr-2 text-blue-500" />
                        {doctor.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaPhone className="mr-2 text-blue-500" />
                        {doctor.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {doctor.experience || 0} years
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
  onClick={() => navigate(`/admin/doctors/edit/${doctor._id}`, { state: { doctor } })}
  className="text-blue-600 hover:text-blue-900 mr-4"
  title="Edit"
>
  <FaEdit className="h-4 w-4" />
</button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaUserMd className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No matching doctors found" : "No doctors available"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try a different search term" : "Add a new doctor to get started"}
            </p>
            <Link
              to="/admin/doctors/addDoctor"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add Doctor
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}