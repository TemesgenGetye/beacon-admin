'use client';

import { useState, useEffect } from 'react';
import { Radio, MonitorSmartphone, FileText, MessageSquare } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import DataTable from '../components/DataTable';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await fetchDashboardData()
        // setData(response)

        // Mock data for demonstration
        setData({
          metrics: {
            activeBeacons: 124,
            activeAds: 45,
            totalLogs: 1256,
            totalMessages: 876,
          },
          trendsData: [
            { name: 'Jan', impressions: 400, clicks: 240, conversions: 100 },
            { name: 'Feb', impressions: 300, clicks: 139, conversions: 80 },
            { name: 'Mar', impressions: 200, clicks: 980, conversions: 200 },
            { name: 'Apr', impressions: 278, clicks: 390, conversions: 150 },
            { name: 'May', impressions: 189, clicks: 480, conversions: 170 },
            { name: 'Jun', impressions: 239, clicks: 380, conversions: 120 },
            { name: 'Jul', impressions: 349, clicks: 430, conversions: 190 },
          ],
          beaconLocations: [
            { name: 'New York', count: 35 },
            { name: 'Los Angeles', count: 28 },
            { name: 'Chicago', count: 18 },
            { name: 'Houston', count: 15 },
            { name: 'Phoenix', count: 12 },
          ],
          recentLogs: [
            {
              id: 1,
              advertisement: 'Summer Sale',
              beacon: 'Store Front',
              timestamp: '2023-07-01 14:23:45',
              status: 'Success',
            },
            {
              id: 2,
              advertisement: 'New Arrivals',
              beacon: 'Mall Entrance',
              timestamp: '2023-07-01 13:45:22',
              status: 'Success',
            },
            {
              id: 3,
              advertisement: 'Weekend Deals',
              beacon: 'Food Court',
              timestamp: '2023-07-01 12:12:34',
              status: 'Failed',
            },
            {
              id: 4,
              advertisement: 'Flash Sale',
              beacon: 'Electronics Dept',
              timestamp: '2023-07-01 11:56:12',
              status: 'Success',
            },
            {
              id: 5,
              advertisement: 'Clearance',
              beacon: 'Exit Gate',
              timestamp: '2023-07-01 10:34:56',
              status: 'Success',
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const trendChartKeys = [
    { id: 'impressions', name: 'Impressions' },
    { id: 'clicks', name: 'Clicks' },
    { id: 'conversions', name: 'Conversions' },
  ];

  const locationChartKeys = [{ id: 'count', name: 'Beacon Count' }];

  const logColumns = [
    { key: 'id', header: 'ID' },
    { key: 'advertisement', header: 'Advertisement' },
    { key: 'beacon', header: 'Beacon' },
    { key: 'timestamp', header: 'Timestamp' },
    {
      key: 'status',
      header: 'Status',
      render: row => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your advertisement beacon network</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Beacons"
          value={data.metrics.activeBeacons}
          icon={Radio}
          change="12%"
          changeType="increase"
        />
        <MetricCard
          title="Active Advertisements"
          value={data.metrics.activeAds}
          icon={MonitorSmartphone}
          change="5%"
          changeType="increase"
        />
        <MetricCard
          title="Total Logs"
          value={data.metrics.totalLogs}
          icon={FileText}
          change="8%"
          changeType="increase"
        />
        <MetricCard
          title="Total Messages"
          value={data.metrics.totalMessages}
          icon={MessageSquare}
          change="3%"
          changeType="decrease"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <LineChart
          data={data.trendsData}
          title="Advertisement Performance Trends"
          dataKeys={trendChartKeys}
        />
        <BarChart
          data={data.beaconLocations}
          title="Beacon Locations"
          dataKeys={locationChartKeys}
        />
      </div>

      {/* Recent Logs */}
      <div>
        <DataTable data={data.recentLogs} columns={logColumns} title="Recent Advertisement Logs" />
      </div>
    </div>
  );
};

export default Dashboard;
