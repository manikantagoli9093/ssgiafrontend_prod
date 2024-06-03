import React, { useMemo } from 'react'
import { useTable,usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS,GROUPED_COLUMNS} from './columns'
import './table.css'

const PaginationTable = () => {
    const columns=useMemo(()=>COLUMNS,[])
    const data=useMemo(()=>MOCK_DATA,[])

    // const tableInstance=useTable({
    //     columns:columns,
    //     data:data
    // })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        setPageSize,
        prepareRow
    }=useTable({
        columns,
        data,
    },usePagination)

    const {pageIndex,pageSize}=state
     
  return (
    <div>
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                            
                        </tr>
                    ))
                }
                
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row=>{
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell)=>{
                                        return <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                })
                                }
                                
                             </tr>
                        )
                    })
                }
                
            </tbody>
            
        </table>
        <div>
            <span>
                Page{' '}
                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map(pageSize=>(
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }
            </select>
            <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        </div>
    </div>
  )
}

export default PaginationTable
