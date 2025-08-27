import React, { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingBag, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import StatsCard from '../Common/StatsCard';
import Chart from '../Common/Chart';
import RecentOrders from '../Common/RecentOrders';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    growthRate: 0
  });

  useEffect(() => {
    // Mock data - replace with real API calls
    setStats({
      totalUsers: 1248,
      totalRevenue: 28540,
      totalOrders: 856,
      growthRate: 12.5
    });
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 28540],
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening at your restaurant.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="blue"
          change="+12%"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
          change="+8.2%"
        />
        <StatsCard
          title="Orders"
          value={stats.totalOrders.toLocaleString()}
          icon={ShoppingBag}
          color="orange"
          change="+15%"
        />
        <StatsCard
          title="Growth"
          value={`${stats.growthRate}%`}
          icon={TrendingUp}
          color="purple"
          change="+3.1%"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
          <Chart data={chartData} type="line" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Clock className="w-5 h-5 text-orange-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pending Orders</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">8 orders waiting</p>
              </div>
            </button>
            <button className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Today's Completed</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">24 orders completed</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;