import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAssignment,
  getAdvertWithBeacons,
  getAssignments,
} from '../../Redux/thunks/assignmentThunk';
import {
  advertWithBeacons,
  assignmentData,
  assignmentError,
  assignmentLoading,
} from '../../Redux/slices/assignmnetSlice';
import { beaconData } from '../../Redux/slices/beaconSlice'; // Adjust import based on your structure
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
    key: 'start_date',
    header: 'Start Date',
    width: '150px',
    render: row => new Date(row.start_date).toLocaleDateString(),
  },
  {
    key: 'end_date',
    header: 'End Date',
    width: '150px',
    render: row => new Date(row.end_date).toLocaleDateString(),
  },
];

function AssignmentList({ dropdown, search }) {
  const dispatch = useDispatch();
  const assignments = useSelector(assignmentData);
  const isLoading = useSelector(assignmentLoading);
  const error = useSelector(assignmentError);
  const advertsWithBeacons = useSelector(advertWithBeacons);
  const beacons = useSelector(beaconData);
  const [formattedAssignments, setFormattedAssignments] = useState([]);

  const { handleOpenModal, setShow, setModalMode } = useAssignmentModel();

  useEffect(() => {
    dispatch(getAssignments());
    dispatch(getAdvertWithBeacons());
  }, [dispatch]);

  useEffect(() => {
    if (
      assignments &&
      assignments.length > 0 &&
      advertsWithBeacons &&
      advertsWithBeacons.length > 0 &&
      beacons
    ) {
      const beaconMap = new Map(
        beacons.map(b => [b.beacon_id, { name: b.name, location: b.location_name }])
      );

      const advertMap = new Map(
        advertsWithBeacons.map(ad => [
          ad.advertisement_id,
          {
            title: ad.title,
            beacons: ad.beacons.reduce((acc, b) => {
              acc[b.beacon.beacon_id || b.beacon] = {
                name: b.beacon.name,
                beacon_id: b.beacon.beacon_id || b.beacon,
                location: b.beacon.location_name,
                start_date: b.start_date,
                end_date: b.end_date,
              };
              return acc;
            }, {}),
          },
        ])
      );

      const transformedData = assignments.map(assignment => {
        const advert = advertMap.get(assignment.advertisement);
        const beaconInfo = advert?.beacons[assignment.beacon] || {};
        const beaconFromStore = beaconMap.get(assignment.beacon) || {};

        return {
          assignment_id: assignment.assignment_id,
          beacon: beaconFromStore.name || beaconInfo.name || assignment.beacon,
          beacon_id: beaconFromStore.beacon_id || beaconInfo.beacon_id || assignment.beacon,
          advertisement_id: advert?.advertisement_id || assignment.advertisement,
          start_date: assignment.start_date,
          end_date: assignment.end_date,
          location: beaconFromStore.location || beaconInfo.location || 'Unknown',
          advertisement: advert?.title || 'Unknown',
          assigned_at: assignment.assigned_at,
        };
      });

      setFormattedAssignments(transformedData);
    }
  }, [assignments, advertsWithBeacons, beacons]);

  const filteredAssignments = formattedAssignments.filter(assignment => {
    const matchesDropdown =
      dropdown === 'all' || !dropdown
        ? true
        : dropdown === 'active'
          ? new Date(assignment.end_date) >= new Date()
          : new Date(assignment.end_date) < new Date();

    const matchesSearch = !search
      ? true
      : (assignment.advertisement?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (assignment.beacon?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (assignment.location?.toLowerCase() || '').includes(search.toLowerCase());

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
        handleDelete={id => dispatch(deleteAssignment(id))}
      />
    </div>
  );
}

export default AssignmentList;
