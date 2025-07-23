import React, { useState, useEffect } from 'react';
import { FaClinicMedical, FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SpecialtyManagementPage() {
  const [specialties, setSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get('/api/specialties');
      setSpecialties(response.data);
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/specialties/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchSpecialties();
    } catch (error) {
      console.error('Error deleting specialty:', error);
    }
  };

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Specialties Management</h1>
        <Link to="/admin/specialties/add" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Specialty
        </Link>
      </div>

      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search specialties..."
          className="pl-10 pr-4 py-2 border rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialties.map(specialty => (
          <div key={specialty._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img src={specialty.icon} alt={specialty.name} className="w-12 h-12 mr-4" />
              <h2 className="text-xl font-semibold">{specialty.name}</h2>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {specialty.description || 'No description available'}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Created: {new Date(specialty.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <Link 
                  to={`/admin/specialties/edit/${specialty._id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </Link>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(specialty._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}