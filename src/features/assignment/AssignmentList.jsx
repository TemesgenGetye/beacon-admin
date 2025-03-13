import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertWithBeacons, getAssignments } from '../../Redux/thunks/assignmentThunk';
import {
  advertWithBeacons,
  assignmentData,
  assignmentError,
  assignmentLoading,
} from '../../Redux/slices/assignmnetSlice';
import DataTableAssignment from './DataTableAssignment';
import { useAssignmentModel } from '../../context/AssignmentContext';

const columns = [
  {
    key: 'assignment_id',
    header: 'Assignment ID',
    width: '200px',
  },
  {
    key: 'beacon',
    header: 'Beacon',
    width: '150px',
  },
  {
    key: 'location',
    header: 'Location',
    width: '150px',
  },
  {
    key: 'advertisement',
    header: 'Advertisement',
    width: '200px',
  },
  {
    key: 'assigned_at',
    header: 'Assigned At',
    width: '150px',
    render: row => new Date(row.assigned_at).toLocaleDateString(),
  },
  {
    key: 'end_date',
    header: 'End Date',
    width: '150px',
  },
];

function AssignmentList({ dropdown, search }) {
  const dispatch = useDispatch();
  const assignments = useSelector(assignmentData);
  const isLoading = useSelector(assignmentLoading);
  const error = useSelector(assignmentError);
  const advertswithbeacons = useSelector(advertWithBeacons);
  const [openShow, setOpenShow] = useState(false);
  const [formattedAssignments, setFormattedAssignments] = useState([]);

  const { handleOpenModal, setShow, setModalMode } = useAssignmentModel();

  useEffect(() => {
    dispatch(getAssignments());
    dispatch(getAdvertWithBeacons());
  }, [dispatch]);

  useEffect(() => {
    if (advertswithbeacons && advertswithbeacons.length > 0) {
      const transformedData = [];

      advertswithbeacons.forEach(advert => {
        if (advert.beacons && advert.beacons.length > 0) {
          advert.beacons.forEach(beacon => {
            const assignmentId = `${beacon.beacon_id.substring(0, 4)}-${advert.advertisement_id.substring(0, 4)}`;
            transformedData.push({
              assignment_id: assignmentId,
              beacon: beacon.name,
              location: beacon.location_name,
              advertisement: advert.title,
              assigned_at: advert.start_date,
              advertisement_id: advert.advertisement_id,
              beacon_id: beacon.beacon_id,
              start_date: advert.start_date,
              end_date: advert.end_date,
            });
          });
        }
      });
      setFormattedAssignments(transformedData);
    }
  }, [advertswithbeacons]);

  const filteredAssignments = formattedAssignments.filter(assignment => {
    const matchesDropdown =
      dropdown === 'all' || !dropdown
        ? true
        : dropdown === 'active'
          ? new Date(assignment.end_date) >= new Date()
          : new Date(assignment.end_date) < new Date();

    // Filter by search term if provided
    const matchesSearch = !search
      ? true
      : assignment.advertisement.toLowerCase().includes(search.toLowerCase()) ||
        assignment.beacon.toLowerCase().includes(search.toLowerCase()) ||
        assignment.location.toLowerCase().includes(search.toLowerCase());

    return matchesDropdown && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-gray-500">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error && error !== 'Server error: 204') {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading assignments</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <DataTableAssignment
        data={filteredAssignments || []}
        columns={columns}
        title="All Assignments"
        pagination={{
          total: filteredAssignments?.length || 0,
          pageSize: 10,
          current: 1,
        }}
        idKey="assignment_id"
        handleOpenModal={handleOpenModal}
        handleDelete={id => console.log('Delete', id)}
      />
    </div>
  );
}

export default AssignmentList;
