import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import AddMenuItemModal from './AddMenuItemModal';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    // Mock menu items
    const mockItems = [
      { 
        id: '1', 
        name: 'Margherita Pizza', 
        price: 18.99, 
        category: 'Pizza', 
        description: 'Fresh mozzarella, tomato sauce, basil',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        status: 'active'
      },
      { 
        id: '2', 
        name: 'Classic Burger', 
        price: 14.99, 
        category: 'Burgers', 
        description: 'Beef patty, lettuce, tomato, onion, pickles',
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
        status: 'active'
      },
      { 
        id: '3', 
        name: 'Caesar Salad', 
        price: 12.99, 
        category: 'Salads', 
        description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
        image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg',
        status: 'inactive'
      },
    ];
    setMenuItems(mockItems);
  }, []);

  const categories = ['all', 'Pizza', 'Burgers', 'Salads', 'Desserts', 'Drinks'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = (itemData) => {
    const newItem = {
      id: Date.now().toString(),
      ...itemData,
      status: 'active'
    };
    setMenuItems([...menuItems, newItem]);
    toast.success('Menu item added successfully');
    setShowAddModal(false);
  };

  const handleEditItem = (itemData) => {
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id ? { ...item, ...itemData } : item
    ));
    toast.success('Menu item updated successfully');
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
      toast.success('Menu item deleted successfully');
    }
  };

  const toggleItemStatus = (itemId) => {
    setMenuItems(menuItems.map(item => 
      item.id === itemId ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
    ));
    toast.success('Item status updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menu Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your restaurant's menu items</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <span className="text-lg font-bold text-orange-600">${item.price}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleItemStatus(item.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <AddMenuItemModal
          item={editingItem}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          categories={categories.filter(c => c !== 'all')}
        />
      )}
    </div>
  );
};

export default MenuManagement;