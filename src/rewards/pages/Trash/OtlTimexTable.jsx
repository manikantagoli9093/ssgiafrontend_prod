import React from 'react';
import { usePagination, useTable } from 'react-table';
 
// Example data
const data = [
  { id: 1, col1: 'Goli Manikanta', col2_1: 'Data 1', col2_2: 'Data 2', col3_1: 'Data 3', col3_2: 'Data 4', col4_1: 'Data 5', col4_2: 'Data 6', col5_1: 'Data 7', col5_2: 'Data 8', col6: 'Data 9', col7: 'Data 10' },
  { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
  { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
  { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
  { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
  { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },
//   { id: 2, col1: 'Row 2', col2_1: 'Data 11', col2_2: 'Data 12', col3_1: 'Data 13', col3_2: 'Data 14', col4_1: 'Data 15', col4_2: 'Data 16', col5_1: 'Data 17', col5_2: 'Data 18', col6: 'Data 19', col7: 'Data 20' },

  // Add more data as needed
];
 
const columns = [
  { Header: 'Name', accessor: 'col1' },
  {
    Header: 'Week 1',
    columns: [
      { Header: 'OTL', accessor: 'col2_1' },
      { Header: 'TIMEX', accessor: 'col2_2' },
    ],
  },
  {
    Header: 'Week 2',
    columns: [
      { Header: 'OTL', accessor: 'col3_1' },
      { Header: 'TIMEX', accessor: 'col3_2' },
    ],
  },
  {
    Header: 'Week 3',
    columns: [
      { Header: 'OTL', accessor: 'col4_1' },
      { Header: 'TIMEX', accessor: 'col4_2' },
    ],
  },
  {
    Header: 'Week 4',
    columns: [
      { Header: 'OTL', accessor: 'col5_1' },
      { Header: 'TIMEX', accessor: 'col5_2' },
    ],
  },
  { Header: 'Difference', accessor: 'col6' },
  { Header: 'Status', accessor: 'col7' },
];
 
const OtlTimexTable = () => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = useTable(
    { columns, data, initialState: { pageIndex: 0 }, pageCount: 3 }, // Set pageCount according to the number of pages
    usePagination
  );
 
  return (
        <div>
        <table {...getTableProps()} style={{ border: 'solid 1px blue', borderCollapse: 'collapse',fontSize:'12px',marginTop:'10px' }}>
        <thead>
                {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column,index) => (
        <th {...column.getHeaderProps()} style={{ border: 'solid 1px gray', padding: '4px 8px' }}>
                        {column.render('Header')}
        </th>
                    ))}
        </tr>
                ))}
        </thead>
        <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row);
                return (
        <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
        <td {...cell.getCellProps()} style={{ border: 'solid 1px gray', padding: '10px 20px' }}>
                            {cell.render('Cell')}
        </td>
                        );
                    })}
        </tr>
                );
                })}
        </tbody>
        </table>
        
      
        </div>
  );
};
 
export default OtlTimexTable;