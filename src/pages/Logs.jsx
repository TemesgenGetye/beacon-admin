"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import DataTable from "../components/DataTable"
import LineChart from "../components/LineChart"

const Logs = () => {
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState([])
  const [logStats, setLogStats] = useState({})
  const [timeframeData, setTimeframeData] = useState([])

  useEffect(() => {
    const loadLogs = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await fetchLogs()
        // setLogs(data)

        // Mock data for demonstration
        setLogs([
          {
            id: 1,
            advertisement: "Summer Sale",
            beacon: "Store Front",
            timestamp: "2023-07-01 14:23:45",
            status: "Success",
            impressions: 45,
            clicks: 12,
          },
          {
            id: 2,
            advertisement: "New Arrivals",
            beacon: "Mall Entrance",
            timestamp: "2023-07-01 13:45:22",
            status: "Success",
            impressions: 32,
            clicks: 8,
          },
          {
            id: 3,
            advertisement: "Weekend Deals",
            beacon: "Food Court",
            timestamp: "2023-07-01 12:12:34",
            status: "Failed",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 4,
            advertisement: "Flash Sale",
            beacon: "Electronics Dept",
            timestamp: "2023-07-01 11:56:12",
            status: "Success",
            impressions: 28,
            clicks: 7,
          },
          {
            id: 5,
            advertisement: "Clearance",
            beacon: "Exit Gate",
            timestamp: "2023-07-01 10:34:56",
            status: "Success",
            impressions: 56,
            clicks: 15,
          },
          {
            id: 6,
            advertisement: "Member Exclusive",
            beacon: "Parking Lot",
            timestamp: "2023-07-01 09:23:11",
            status: "Success",
            impressions: 18,
            clicks: 4,
          },
          {
            id: 7,
            advertisement: "Summer Sale",
            beacon: "Checkout Area",
            timestamp: "2023-07-01 08:45:33",
            status: "Success",
            impressions: 22,
            clicks: 6,
          },
          {
            id: 8,
            advertisement: "New Arrivals",
            beacon: "Clothing Section",
            timestamp: "2023-06-30 15:12:45",
            status: "Failed",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 9,
            advertisement: "Weekend Deals",
            beacon: "Restaurant",
            timestamp: "2023-06-30 14:05:22",
            status: "Success",
            impressions: 34,
            clicks: 9,
          },
          {
            id: 10,
            advertisement: "Flash Sale",
            beacon: "Movie Theater",
            timestamp: "2023-06-30 13:34:11",
            status: "Success",
            impressions: 41,
            clicks: 11,
          },
          {
            id: 11,
            advertisement: "Clearance",
            beacon: "Store Front",
            timestamp: "2023-06-30 12:23:45",
            status: "Success",
            impressions: 29,
            clicks: 7,
          },
          {
            id: 12,
            advertisement: "Member Exclusive",
            beacon: "Mall Entrance",
            timestamp: "2023-06-30 11:45:22",
            status: "Success",
            impressions: 37,
            clicks: 10,
          },
          {
            id: 13,
            advertisement: "Summer Sale",
            beacon: "Food Court",
            timestamp: "2023-06-30 10:12:34",
            status: "Failed",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 14,
            advertisement: "New Arrivals",
            beacon: "Electronics Dept",
            timestamp: "2023-06-30 09:56:12",
            status: "Success",
            impressions: 25,
            clicks: 6,
          },
          {
            id: 15,
            advertisement: "Weekend Deals",
            beacon: "Exit Gate",
            timestamp: "2023-06-30 08:34:56",
            status: "Success",
            impressions: 31,
            clicks: 8,
          },
        ])

        setLogStats({
          total: 15,
          success: 12,
          failed: 3,
          impressions: 398,
          clicks: 103,
        })

        setTimeframeData([
          { name: "00:00", logs: 0, success: 0, failed: 0 },
          { name: "03:00", logs: 0, success: 0, failed: 0 },
          { name: "06:00", logs: 0, success: 0, failed: 0 },
          { name: "09:00", logs: 5, success: 4, failed: 1 },
          { name: "12:00", logs: 5, success: 4, failed: 1 },
          { name: "15:00", logs: 5, success: 4, failed: 1 },
          { name: "18:00", logs: 0, success: 0, failed: 0 },
          { name: "21:00", logs: 0, success: 0, failed: 0 },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error loading logs:", error)
        setLoading(false)
      }
    }

    loadLogs()
  }, [])

  const columns = [
    { key: "id", header: "ID" },
    { key: "advertisement", header: "Advertisement" },
    { key: "beacon", header: "Beacon" },
    {
      key: "timestamp",
      header: "Timestamp",
      render: (row) => (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
          {row.timestamp}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { key: "impressions", header: "Impressions" },
    { key: "clicks", header: "Clicks" },
  ]

  const timeframeChartKeys = [
    { id: "logs", name: "Total Logs" },
    { id: "success", name: "Success" },
    { id: "failed", name: "Failed" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Advertisement Logs</h1>
        <p className="mt-1 text-sm text-gray-500">Track and analyze advertisement delivery logs</p>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Total Logs</p>
          <p className="text-2xl font-semibold mt-1">{logStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Success Rate</p>
          <p className="text-2xl font-semibold mt-1">{((logStats.success / logStats.total) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Failed</p>
          <p className="text-2xl font-semibold mt-1">{logStats.failed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Impressions</p>
          <p className="text-2xl font-semibold mt-1">{logStats.impressions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Clicks</p>
          <p className="text-2xl font-semibold mt-1">{logStats.clicks}</p>
        </div>
      </div>

      {/* Log Timeframe Chart */}
      <LineChart data={timeframeData} title="Log Activity (Last 24 Hours)" dataKeys={timeframeChartKeys} />

      <DataTable data={logs} columns={columns} title="Recent Logs" />
    </div>
  )
}

export default Logs

