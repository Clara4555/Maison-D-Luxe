import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, Clock, Package, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock orders data
    const mockOrders = [
      {
        id: 'ORD-001',
        customer: 'John Doe',
        email: 'john@example.com',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
          { name: 'Caesar Salad', quantity: 1, price: 12.99 }
        ],
        total: 31.98,
        status: 'pending',
        orderTime: '2024-01-15T10:30:00Z',
        deliveryAddress: '123 Main St, City, State'
      },
      {
        id: 'ORD-002',
        customer: 'Jane Smith',
        email: 'jane@example.com',
        items: [
          { name: 'Classic Burger', quantity: 2, price: 14.99 }
        ],
        total: 29.98,
        status: 'preparing',
        orderTime: '2024-01-15T11:15:00Z',
        deliveryAddress: '456 Oak Ave, City, State'
      },
      {
        id: 'ORD-003',
        customer: 'Mike Johnson',
        email: 'mike@example.com',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 18.99 }
        ],
        total: 18.99,
        status: 'completed',
        orderTime: '2024-01-15T09:45:00Z',
        deliveryAddress: '789 Pine St, City, State'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'preparing':
        return <Package className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track and manage customer orders</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer} • {order.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatTime(order.orderTime)}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </span>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Order Items:</h4>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Delivery Address:</span> {order.deliveryAddress}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200"
                  >
                    Start Preparing
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'completed')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition duration-200"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;