import React, { useState } from 'react';
import { Save, Upload, Clock, MapPin, Phone, Mail, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'The Golden Fork',
    description: 'Authentic Italian cuisine with a modern twist',
    address: '123 Main Street, Downtown, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@goldenfork.com',
    website: 'https://goldenfork.com',
    logo: 'https://images.pexels.com/photos/1186116/pexels-photo-1186116.jpeg'
  });

  const [operatingHours, setOperatingHours] = useState({
    monday: { open: '11:00', close: '22:00', closed: false },
    tuesday: { open: '11:00', close: '22:00', closed: false },
    wednesday: { open: '11:00', close: '22:00', closed: false },
    thursday: { open: '11:00', close: '22:00', closed: false },
    friday: { open: '11:00', close: '23:00', closed: false },
    saturday: { open: '10:00', close: '23:00', closed: false },
    sunday: { open: '10:00', close: '21:00', closed: false }
  });

  const [categories, setCategories] = useState([
    'Pizza', 'Burgers', 'Salads', 'Pasta', 'Desserts', 'Drinks'
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleRestaurantInfoChange = (e) => {
    setRestaurantInfo({ ...restaurantInfo, [e.target.name]: e.target.value });
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setOperatingHours({
      ...operatingHours,
      [day]: { ...operatingHours[day], [field]: value }
    });
  };

  const handleSaveRestaurantInfo = () => {
    // Save restaurant info
    toast.success('Restaurant information updated successfully');
  };

  const handleSaveOperatingHours = () => {
    // Save operating hours
    toast.success('Operating hours updated successfully');
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      toast.success('Category added successfully');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
    toast.success('Category removed successfully');
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your restaurant settings and preferences</p>
      </div>

      {/* Restaurant Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Restaurant Information</h2>
          <button
            onClick={handleSaveRestaurantInfo}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                name="name"
                value={restaurantInfo.name}
                onChange={handleRestaurantInfoChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={restaurantInfo.description}
                onChange={handleRestaurantInfoChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={restaurantInfo.address}
                onChange={handleRestaurantInfoChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={restaurantInfo.phone}
                onChange={handleRestaurantInfoChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={restaurantInfo.email}
                onChange={handleRestaurantInfoChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={restaurantInfo.website}
                onChange={handleRestaurantInfoChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Restaurant Logo
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={restaurantInfo.logo}
                  alt="Logo"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <input
                    type="url"
                    name="logo"
                    value={restaurantInfo.logo}
                    onChange={handleRestaurantInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Logo URL"
                  />
                </div>
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Upload className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            <Clock className="w-5 h-5 inline mr-2" />
            Operating Hours
          </h2>
          <button
            onClick={handleSaveOperatingHours}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>

        <div className="space-y-4">
          {days.map(day => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-24">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {day}
                </span>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={operatingHours[day].closed}
                  onChange={(e) => handleOperatingHoursChange(day, 'closed', e.target.checked)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Closed</span>
              </label>
              {!operatingHours[day].closed && (
                <>
                  <input
                    type="time"
                    value={operatingHours[day].open}
                    onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input
                    type="time"
                    value={operatingHours[day].close}
                    onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Menu Categories</h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
            >
              {category}
              <button
                onClick={() => handleRemoveCategory(category)}
                className="ml-2 text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button
            onClick={handleAddCategory}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;