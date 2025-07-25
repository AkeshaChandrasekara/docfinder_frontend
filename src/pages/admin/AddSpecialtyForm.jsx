import { useState } from 'react';
import { FaClinicMedical, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import uploadMediaToSupabase from '../../utils/mediaUpload';

export default function AddSpecialtyPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
   
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, icon: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
     
     

      const specialtyData = {
        name: formData.name,
        description: formData.description,
       
      };

      const token = localStorage.getItem('token');
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/specialties', 
        specialtyData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Specialty added successfully');
      navigate('/admin/specialties');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add specialty');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add New Specialty</h2>
            <button 
              onClick={() => navigate('/admin/specialties')}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty Name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

             
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/specialties')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Adding...' : 'Add Specialty'}
          </button>
        </div>
      </div>
    </div>
  );
}