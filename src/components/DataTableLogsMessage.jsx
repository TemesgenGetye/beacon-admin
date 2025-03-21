import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash, Eye } from 'lucide-react';

const DataTableLogsMessage = ({ data, columns, title, pagination, handleDelete, idKey = 'id' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = pagination?.pageSize || 10;
  const totalPages = Math.ceil((pagination?.total || data?.length) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);

  const handleDeletes = id => {
    handleDelete(id);
  };

  return (
    <div className="overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-forth">{title}</h3>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-xl rounded-xl">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                style={{ width: '50px' }}
              >
                #
              </th>
              {columns.map(column => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 whitespace-nowrap text-sm text-forth"
                >
                  No data found 😞
                </td>
              </tr>
            )}
            {paginatedData?.map((row, rowIndex) => (
              <tr key={row[idKey] || rowIndex} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {startIndex + rowIndex + 1}
                </td>
                {columns.map(column => (
                  <td
                    key={`${row[idKey] || rowIndex}-${column.key}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-forth"
                  >
                    {column.render ? column.render(row) : row[column.key] || '-'}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                    onClick={() => handleDeletes(row[idKey])}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, data.length)} of{' '}
            {pagination?.total || data.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableLogsMessage;
