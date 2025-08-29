import React, { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle, Clock, Package, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders', {
        headers: { 'auth-token': token },
        params: { status: filterStatus }
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { 'auth-token': token } }
      );
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
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
    return new Date(timeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-600"></div>
      </div>
    );
  }
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
          <div key={order._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.orderNumber}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer.name} • {order.customer.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatTime(order.createdAt)}</p>
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

            {order.deliveryAddress && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Delivery Address:</span> {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                </p>
              </div>
            )}

            {order.specialInstructions && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order._id, 'confirmed')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200"
                  >
                    Confirm Order
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </>
              )}
              {order.status === 'confirmed' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'preparing')}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200"
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order._id, 'ready')}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200"
                  >
                    Mark Ready
                  </button>
                </>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'delivered')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition duration-200"
                >
                  Mark Delivered
                </button>
              )}
              {(order.status === 'confirmed' || order.status === 'preparing') && (
                <button
                  onClick={() => updateOrderStatus(order._id, 'cancelled')}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Orders will appear here when customers place them'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;

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