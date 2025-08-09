import { useState } from 'react';
import { 
  BsGearFill, 
  BsShieldLock, 
  BsBellFill,
  BsPaletteFill,
  BsDatabaseFill,
  BsGlobe
} from 'react-icons/bs';
import { FaUserCog, FaFileExport } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'DocFinder',
    siteLogo: '',
    adminEmail: 'admin@docfinder.com',
    timezone: 'UTC',
    maintenanceMode: false,
    analyticsEnabled: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BsGearFill className="mr-3 text-blue-600" />
          System Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Configure your application preferences and system parameters
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
   
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
          <div className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'general' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <RiDashboardFill className="mr-3" />
              General Settings
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'security' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BsShieldLock className="mr-3" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'appearance' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BsPaletteFill className="mr-3" />
              Appearance
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'notifications' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BsBellFill className="mr-3" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'users' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaUserCog className="mr-3" />
              Admin Management
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                activeTab === 'backup' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BsDatabaseFill className="mr-3" />
              Backup & Export
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={formData.siteName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="CET">Central European Time (CET)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Logo
                    </label>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                        {formData.siteLogo ? (
                          <img src={formData.siteLogo} alt="Logo" className="h-full w-full rounded-full" />
                        ) : (
                          <BsGlobe className="text-lg" />
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id="siteLogo"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setFormData(prev => ({
                              ...prev,
                              siteLogo: URL.createObjectURL(e.target.files[0])
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor="siteLogo"
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                      >
                        Change
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    id="maintenanceMode"
                    checked={formData.maintenanceMode}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                    Enable Maintenance Mode
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="analyticsEnabled"
                    id="analyticsEnabled"
                    checked={formData.analyticsEnabled}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="analyticsEnabled" className="ml-2 block text-sm text-gray-700">
                    Enable Analytics Tracking
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <BsShieldLock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      These security settings affect how users interact with your application.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Password Requirements</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum 8 characters, at least one uppercase letter, one number and one special character
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Require admins to use 2FA for accessing the dashboard
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Login Attempts</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Lock accounts after 5 failed login attempts
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <BsDatabaseFill className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Regularly backup your data to prevent any loss of information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <BsDatabaseFill className="text-blue-500 mr-3 text-xl" />
                    <h3 className="text-lg font-medium text-gray-900">Database Backup</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Create a complete backup of your database including all records and settings.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white shadow-sm">
                    Backup Now
                  </button>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <FaFileExport className="text-green-500 mr-3 text-xl" />
                    <h3 className="text-lg font-medium text-gray-900">Export Data</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Export your data in CSV format for analysis or migration purposes.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white shadow-sm">
                      Export Users
                    </button>
                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white shadow-sm">
                      Export Appointments
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Backup History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          July 15, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Full Backup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          45.2 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          July 8, 2025
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Full Backup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          42.7 MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && activeTab !== 'security' && activeTab !== 'backup' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                {activeTab === 'appearance' && <BsPaletteFill className="text-4xl text-blue-600" />}
                {activeTab === 'notifications' && <BsBellFill className="text-4xl text-blue-600" />}
                {activeTab === 'users' && <FaUserCog className="text-4xl text-blue-600" />}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {activeTab === 'appearance' && 'Appearance Settings'}
                {activeTab === 'notifications' && 'Notification Settings'}
                {activeTab === 'users' && 'Admin Management Settings'}
              </h3>
              <p className="text-gray-500 max-w-md text-center">
                This section is under development. Check back soon for more configuration options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}