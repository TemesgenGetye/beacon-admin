"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import DataTable from "../components/DataTable"
import BarChart from "../components/BarChart"

const Messages = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [messageStats, setMessageStats] = useState({})
  const [messageTypeData, setMessageTypeData] = useState([])

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await fetchMessages()
        // setMessages(data)

        // Mock data for demonstration
        setMessages([
          {
            id: 1,
            beacon: "Store Front",
            type: "Status Update",
            content: "Beacon online and functioning normally",
            timestamp: "2023-07-01 14:23:45",
            priority: "Low",
          },
          {
            id: 2,
            beacon: "Mall Entrance",
            type: "Advertisement Delivery",
            content: "Successfully delivered ad: New Arrivals",
            timestamp: "2023-07-01 13:45:22",
            priority: "Medium",
          },
          {
            id: 3,
            beacon: "Food Court",
            type: "Error",
            content: "Failed to deliver advertisement: connection timeout",
            timestamp: "2023-07-01 12:12:34",
            priority: "High",
          },
          {
            id: 4,
            beacon: "Electronics Dept",
            type: "Status Update",
            content: "Battery level at 78%",
            timestamp: "2023-07-01 11:56:12",
            priority: "Low",
          },
          {
            id: 5,
            beacon: "Exit Gate",
            type: "Warning",
            content: "Battery level below 40%, please recharge soon",
            timestamp: "2023-07-01 10:34:56",
            priority: "Medium",
          },
          {
            id: 6,
            beacon: "Parking Lot",
            type: "Advertisement Delivery",
            content: "Successfully delivered ad: Member Exclusive",
            timestamp: "2023-07-01 09:23:11",
            priority: "Medium",
          },
          {
            id: 7,
            beacon: "Checkout Area",
            type: "Status Update",
            content: "Beacon online and functioning normally",
            timestamp: "2023-07-01 08:45:33",
            priority: "Low",
          },
          {
            id: 8,
            beacon: "Clothing Section",
            type: "Error",
            content: "Beacon offline: no power detected",
            timestamp: "2023-06-30 15:12:45",
            priority: "High",
          },
          {
            id: 9,
            beacon: "Restaurant",
            type: "Advertisement Delivery",
            content: "Successfully delivered ad: Weekend Deals",
            timestamp: "2023-06-30 14:05:22",
            priority: "Medium",
          },
          {
            id: 10,
            beacon: "Movie Theater",
            type: "Status Update",
            content: "Beacon online and functioning normally",
            timestamp: "2023-06-30 13:34:11",
            priority: "Low",
          },
        ])

        setMessageStats({
          total: 10,
          statusUpdates: 4,
          adDelivery: 3,
          warnings: 1,
          errors: 2,
        })

        setMessageTypeData([
          { name: "Status Update", count: 4 },
          { name: "Ad Delivery", count: 3 },
          { name: "Warning", count: 1 },
          { name: "Error", count: 2 },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error loading messages:", error)
        setLoading(false)
      }
    }

    loadMessages()
  }, [])

  const columns = [
    { key: "id", header: "ID" },
    { key: "beacon", header: "Beacon" },
    {
      key: "type",
      header: "Type",
      render: (row) => {
        const typeColors = {
          "Status Update": "bg-blue-100 text-blue-800",
          "Advertisement Delivery": "bg-green-100 text-green-800",
          Warning: "bg-yellow-100 text-yellow-800",
          Error: "bg-red-100 text-red-800",
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[row.type]}`}
          >
            {row.type}
          </span>
        )
      },
    },
    { key: "content", header: "Content" },
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
      key: "priority",
      header: "Priority",
      render: (row) => {
        const priorityColors = {
          Low: "bg-gray-100 text-gray-800",
          Medium: "bg-yellow-100 text-yellow-800",
          High: "bg-red-100 text-red-800",
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[row.priority]}`}
          >
            {row.priority}
          </span>
        )
      },
    },
  ]

  const messageTypeChartKeys = [{ id: "count", name: "Count" }]

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
        <h1 className="text-2xl font-bold text-gray-900">Beacon Messages</h1>
        <p className="mt-1 text-sm text-gray-500">View and analyze messages sent by beacons</p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Total Messages</p>
          <p className="text-2xl font-semibold mt-1">{messageStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Status Updates</p>
          <p className="text-2xl font-semibold mt-1">{messageStats.statusUpdates}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Ad Deliveries</p>
          <p className="text-2xl font-semibold mt-1">{messageStats.adDelivery}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Warnings</p>
          <p className="text-2xl font-semibold mt-1">{messageStats.warnings}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm font-medium text-gray-500">Errors</p>
          <p className="text-2xl font-semibold mt-1">{messageStats.errors}</p>
        </div>
      </div>

      {/* Message Type Chart */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BarChart data={messageTypeData} title="Message Types" dataKeys={messageTypeChartKeys} />
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Priority</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">High Priority</span>
                <span className="text-sm font-medium text-gray-700">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Medium Priority</span>
                <span className="text-sm font-medium text-gray-700">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Low Priority</span>
                <span className="text-sm font-medium text-gray-700">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTable data={messages} columns={columns} title="Recent Messages" />
    </div>
  )
}

export default Messages

