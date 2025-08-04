import React, { useState, useEffect } from 'react';
import { FaUserMd, FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DoctorManagementPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchDoctors();
    } catch (error) {
      
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors Management</h1>
        <Link to="/admin/doctors/add" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Doctor
        </Link>
      </div>

      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
          className="pl-10 pr-4 py-2 border rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Photo</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Specialty</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map(doctor => (
              <tr key={doctor._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={doctor.photo} alt={doctor.firstName} className="w-10 h-10 rounded-full" />
                </td>
                <td className="py-3 px-4">{doctor.firstName} {doctor.lastName}</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {doctor.specialty?.name}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div>{doctor.email}</div>
                  <div className="text-sm text-gray-500">{doctor.phone}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link to={`/admin/doctors/edit/${doctor._id}`} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </Link>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}