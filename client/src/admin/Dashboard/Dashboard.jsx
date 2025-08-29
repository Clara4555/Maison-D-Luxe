import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingBag, TrendingUp, Clock, CheckCircle, Package } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Chart from '../Common/Chart';
import RecentOrders from '../Common/RecentOrders';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    monthlyOrders: 0,
    monthlyRevenue: 0,
    statusBreakdown: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/stats/dashboard', {
        headers: { 'auth-token': token }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 1500, 2500, 2200, 2800, 2100],
        borderColor: 'rgb(114, 47, 55)',
        backgroundColor: 'rgba(114, 47, 55, 0.1)',
        tension: 0.4,
      },
    ],
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening at your restaurant.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Orders"
          value={stats.todayOrders.toLocaleString()}
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Today's Revenue"
          value={`$${stats.todayRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Monthly Orders"
          value={stats.monthlyOrders.toLocaleString()}
          icon={Package}
          color="orange"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toFixed(2)}`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
          <Chart data={chartData} type="line" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status</h3>
          <div className="space-y-4">
            {stats.statusBreakdown.map((status) => (
              <div key={status._id} className="flex justify-between items-center">
                <span className="capitalize text-gray-700 dark:text-gray-300">{status._id}</span>
                <span className="font-bold text-gray-900 dark:text-white">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        </div>
        <div className="p-6">
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.name}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;