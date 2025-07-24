import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditDoctorForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [chanellingCenters, setChanellingCenters] = useState([]);
  const [photoPreview, setPhotoPreview] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    qualifications: "",
    experience: "",
    bio: "",
    photo: null,
    existingPhoto: "",
    hospital: "",
    chanellingCenter: "",
    availableDays: []
  });

  useEffect(() => {
    fetchSpecialties();
    fetchChanellingCenters();
    
    if (location.state?.doctor) {
      const doctor = location.state.doctor;
      initializeFormData(doctor);
    } else {
      fetchDoctor();
    }
  }, [id, location.state]);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      initializeFormData(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
      toast.error("Failed to load doctor data");
      navigate("/admin/doctors");
    }
  };

  const initializeFormData = (doctor) => {
    setFormData({
      firstName: doctor.firstName || "",
      lastName: doctor.lastName || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      specialty: doctor.specialty?._id || doctor.specialty || "",
      qualifications: doctor.qualifications?.join(", ") || "",
      experience: doctor.experience || "",
      bio: doctor.bio || "",
      photo: null,
      existingPhoto: doctor.photo || "",
      hospital: doctor.hospital || "",
      chanellingCenter: doctor.chanellingCenter?._id || doctor.chanellingCenter || "",
      availableDays: doctor.availableDays?.length ? doctor.availableDays : []
    });
    setPhotoPreview(doctor.photo || "");
  };

  const fetchSpecialties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/specialties`);
      setSpecialties(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      toast.error("Failed to load specialties");
    }
  };

  const fetchChanellingCenters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chanelling-centers`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setChanellingCenters(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching chanelling centers:", error);
      toast.error(error.response?.data?.message || "Failed to load chanelling centers");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const addAvailableDay = () => {
    setFormData(prev => ({
      ...prev,
      availableDays: [
        ...prev.availableDays,
        { day: "", slots: [{ startTime: "", endTime: "", isAvailable: true }] }
      ]
    }));
  };

  const removeAvailableDay = (index) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.filter((_, i) => i !== index)
    }));
  };

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...formData.availableDays];
    updatedDays[index][field] = value;
    setFormData(prev => ({ ...prev, availableDays: updatedDays }));
  };

  const addTimeSlot = (dayIndex) => {
    const updatedDays = [...formData.availableDays];
    updatedDays[dayIndex].slots.push({ startTime: "", endTime: "", isAvailable: true });
    setFormData(prev => ({ ...prev, availableDays: updatedDays }));
  };

  const removeTimeSlot = (dayIndex, slotIndex) => {
    const updatedDays = [...formData.availableDays];
    updatedDays[dayIndex].slots = updatedDays[dayIndex].slots.filter((_, i) => i !== slotIndex);
    setFormData(prev => ({ ...prev, availableDays: updatedDays }));
  };

  const handleTimeSlotChange = (dayIndex, slotIndex, field, value) => {
    const updatedDays = [...formData.availableDays];
    updatedDays[dayIndex].slots[slotIndex][field] = value;
    setFormData(prev => ({ ...prev, availableDays: updatedDays }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.specialty) {
      toast.error("Specialty is required");
      return false;
    }
    if (!formData.qualifications.trim()) {
      toast.error("Qualifications are required");
      return false;
    }
    if (!formData.experience || isNaN(formData.experience)) {
      toast.error("Valid experience is required");
      return false;
    }

    for (const day of formData.availableDays) {
      if (!day.day) {
        toast.error("Day selection is required for all availability entries");
        return false;
      }
      for (const slot of day.slots) {
        if (!slot.startTime || !slot.endTime) {
          toast.error("Both start and end times are required for all time slots");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      let photoUrl = formData.existingPhoto;
      
      if (formData.photo) {
        photoUrl = await uploadMediaToSupabase(formData.photo);
      }

      const doctorData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        specialty: formData.specialty,
        qualifications: formData.qualifications.split(",").map(q => q.trim()).filter(q => q),
        experience: Number(formData.experience),
        bio: formData.bio.trim(),
        photo: photoUrl,
        hospital: formData.hospital.trim(),
        chanellingCenter: formData.chanellingCenter || undefined,
        availableDays: formData.availableDays.map(day => ({
          day: day.day,
          slots: day.slots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable !== false 
          }))
        }))
      };

      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctors/${id}`,
        doctorData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Doctor updated successfully");
      navigate("/admin/doctors");
    } catch (err) {
      console.error("Error updating doctor:", err);
      toast.error(err.response?.data?.message || "Failed to update doctor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Edit Doctor</h2>
            <button 
              onClick={() => navigate("/admin/doctors")}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty *
                </label>
                <select
                  name="specialty"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.specialty}
                  onChange={handleChange}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map(specialty => (
                    <option key={specialty._id} value={specialty._id}>{specialty.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hospital/Clinic
                </label>
                <input
                  name="hospital"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.hospital}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (years) *
                </label>
                <input
                  name="experience"
                  type="number"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications (comma separated) *
                </label>
                <input
                  name="qualifications"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MD, MBBS, etc."
                  value={formData.qualifications}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chanelling Center
                </label>
                <select
                  name="chanellingCenter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.chanellingCenter}
                  onChange={handleChange}
                >
                  <option value="">Select Chanelling Center</option>
                  {chanellingCenters.map(center => (
                    <option key={center._id} value={center._id}>
                      {center.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="flex items-center space-x-4 mb-2">
                  {photoPreview && (
                    <img 
                      src={photoPreview} 
                      alt="Current doctor" 
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/8815/8815112.png";
                      }}
                    />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Available Days & Times *
                  </label>
                  <button
                    type="button"
                    onClick={addAvailableDay}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Day
                  </button>
                </div>

                {formData.availableDays.length === 0 && (
                  <p className="text-sm text-gray-500 mb-4">No availability added yet</p>
                )}

                {formData.availableDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <select
                        value={day.day}
                        onChange={(e) => handleDayChange(dayIndex, 'day', e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeAvailableDay(dayIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {day.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center space-x-3">
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => handleTimeSlotChange(dayIndex, slotIndex, 'startTime', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => handleTimeSlotChange(dayIndex, slotIndex, 'endTime', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addTimeSlot(dayIndex)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Time Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Updating...' : 'Update Doctor'}
          </button>
        </div>
      </div>
    </div>
  );
}