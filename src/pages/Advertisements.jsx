"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import DataTable from "../components/DataTable"

const Advertisements = () => {
  const [loading, setLoading] = useState(true)
  const [advertisements, setAdvertisements] = useState([])

  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        // In a real app, this would fetch from the API
        // const data = await fetchAdvertisements()
        // setAdvertisements(data)

        // Mock data for demonstration
        setAdvertisements([
          {
            id: 1,
            name: "Summer Sale",
            status: "Active",
            startDate: "2023-06-01",
            endDate: "2023-08-31",
            impressions: 1245,
            clicks: 356,
          },
          {
            id: 2,
            name: "New Arrivals",
            status: "Active",
            startDate: "2023-07-01",
            endDate: "2023-09-30",
            impressions: 987,
            clicks: 243,
          },
          {
            id: 3,
            name: "Weekend Deals",
            status: "Scheduled",
            startDate: "2023-07-15",
            endDate: "2023-07-17",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 4,
            name: "Flash Sale",
            status: "Active",
            startDate: "2023-07-05",
            endDate: "2023-07-07",
            impressions: 456,
            clicks: 123,
          },
          {
            id: 5,
            name: "Clearance",
            status: "Inactive",
            startDate: "2023-05-01",
            endDate: "2023-06-30",
            impressions: 2345,
            clicks: 567,
          },
          {
            id: 6,
            name: "Holiday Special",
            status: "Scheduled",
            startDate: "2023-12-01",
            endDate: "2023-12-31",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 7,
            name: "Back to School",
            status: "Scheduled",
            startDate: "2023-08-15",
            endDate: "2023-09-15",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 8,
            name: "Black Friday",
            status: "Scheduled",
            startDate: "2023-11-24",
            endDate: "2023-11-27",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 9,
            name: "Cyber Monday",
            status: "Scheduled",
            startDate: "2023-11-27",
            endDate: "2023-11-28",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 10,
            name: "Spring Collection",
            status: "Inactive",
            startDate: "2023-03-01",
            endDate: "2023-05-31",
            impressions: 3456,
            clicks: 876,
          },
          {
            id: 11,
            name: "Anniversary Sale",
            status: "Scheduled",
            startDate: "2023-10-01",
            endDate: "2023-10-15",
            impressions: 0,
            clicks: 0,
          },
          {
            id: 12,
            name: "Member Exclusive",
            status: "Active",
            startDate: "2023-01-01",
            endDate: "2023-12-31",
            impressions: 5678,
            clicks: 1234,
          },
        ])
        setLoading(false)
      } catch (error) {
        console.error("Error loading advertisements:", error)
        setLoading(false)
      }
    }

    loadAdvertisements()
  }, [])

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-green-800",
          Inactive: "bg-gray-100 text-gray-800",
          Scheduled: "bg-blue-100 text-blue-800",
        }
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[row.status]}`}
          >
            {row.status}
          </span>
        )
      },
    },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    { key: "impressions", header: "Impressions" },
    { key: "clicks", header: "Clicks" },
    {
      key: "ctr",
      header: "CTR",
      render: (row) => {
        const ctr = row.impressions > 0 ? ((row.clicks / row.impressions) * 100).toFixed(2) + "%" : "N/A"
        return ctr
      },
    },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advertisements</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your advertisement campaigns</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Advertisement
        </button>
      </div>

      <DataTable data={advertisements} columns={columns} title="All Advertisements" />
    </div>
  )
}

export default Advertisements

