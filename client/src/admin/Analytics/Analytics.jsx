import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingBag, Users, Calendar } from 'lucide-react';
import Chart from '../Common/Chart';
import StatsCard from '../Common/StatsCard';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [analytics, setAnalytics] = useState({
    revenue: [],
    orders: [],
    customers: [],
    popularItems: []
  });

  useEffect(() => {
    // Mock analytics data
    const mockData = {
      revenue: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [1200, 1900, 1500, 2500, 2200, 2800, 2100],
          borderColor: 'rgb(234, 88, 12)',
          backgroundColor: 'rgba(234, 88, 12, 0.1)',
          tension: 0.4,
        }]
      },
      orders: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Orders',
          data: [45, 52, 48, 68, 65, 78, 72],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
        }]
      },
      popularItems: [
        { name: 'Margherita Pizza', orders: 156, revenue: 2808 },
        { name: 'Classic Burger', orders: 134, revenue: 2009.66 },
        { name: 'Caesar Salad', orders: 98, revenue: 1273.02 },
        { name: 'Chicken Wings', orders: 87, revenue: 1392 },
        { name: 'Pasta Carbonara', orders: 76, revenue: 1596 }
      ]
    };
    setAnalytics(mockData);
  }, [timeRange]);

  const totalRevenue = 28540;
  const totalOrders = 856;
  const totalCustomers = 1248;
  const averageOrder = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track your restaurant's performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
          change="+12.5%"
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          icon={ShoppingBag}
          color="blue"
          change="+8.2%"
        />
        <StatsCard
          title="Total Customers"
          value={totalCustomers.toLocaleString()}
          icon={Users}
          color="purple"
          change="+15.3%"
        />
        <StatsCard
          title="Average Order"
          value={`$${averageOrder.toFixed(2)}`}
          icon={TrendingUp}
          color="orange"
          change="+3.1%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
          <Chart data={analytics.revenue} type="line" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Orders</h3>
          <Chart data={analytics.orders} type="bar" />
        </div>
      </div>

      {/* Popular Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Menu Items</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analytics.popularItems?.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">${item.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;