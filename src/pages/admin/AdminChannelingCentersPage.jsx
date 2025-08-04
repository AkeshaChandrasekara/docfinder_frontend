import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  FaPlus, 
  FaTrash, 
  FaSearch, 
  FaEdit, 
  FaClinicMedical, 
  FaHospital,
  FaSpinner
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminChanellingCentersPage() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chanelling-centers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      const data = Array.isArray(response?.data) ? response.data : 
                  (response?.data?.data ? response.data.data : []);
      
      setCenters(data);
      setError(null);
    } catch (error) {
      setError("Failed to load chanelling centers");
      toast.error("Failed to load chanelling centers");
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCenters = centers.filter(center => 
    center?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (centerId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/chanelling-centers/${centerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Chanelling center deleted successfully");
      fetchCenters();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete center");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Loading chanelling centers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h3 className="text-lg font-medium text-red-600 mb-2">Error Loading Centers</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchCenters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
 
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FaHospital className="text-2xl text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Chanelling Centers Management</h2>
          </div>
          <div className="flex space-x-3">
            <Link 
              to="/admin/chanelling-centers/add"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <FaPlus className="mr-2" /> New Center
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">Manage all chanelling centers in the system</p>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search centers..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="text-right text-sm text-gray-500 flex items-center justify-end md:justify-center">
            Showing {filteredCenters.length} of {centers.length} centers
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <div key={center._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3 mr-4">
                      <FaHospital className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{center.name}</h3>
                      <p className="text-sm text-gray-500">
                        {center.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate("/admin/chanelling-centers/edit", { state: { center } })}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(center._id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaHospital className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No matching centers found" : "No chanelling centers available"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try a different search term" : "Add a new center to get started"}
            </p>
            <Link
              to="/admin/chanelling-centers/add"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Add Center
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}