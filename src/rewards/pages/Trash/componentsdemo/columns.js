import { ColumnFilter } from "./columnFilter"

export const COLUMNS=[
    {
        Header:'Id',
        Footer:'Id',
        accessor:'id',
        Filter:ColumnFilter,
        disableFilters:true
    },
    {
        Header:'Name',
        Footer:'Name',
        accessor:'Name',
        Filter:ColumnFilter
    },
    {
        Header:'Week 1',
        Footer:'Week 1',
        accessor:'Week_1',
        Filter:ColumnFilter
    },
    {
        Header:'Week 2',
        Footer:'Week 2',
        accessor:'Week_2',
        Filter:ColumnFilter
    },
    {
        Header:'Week 3',
        Footer:'Week 3',
        accessor:'Week_3',
        Filter:ColumnFilter
    },
    {
        Header:'Week 4',
        Footer:'Week 4',
        accessor:'Week_4',
        Filter:ColumnFilter
    },
    {
        Header:'Difference',
        Footer:'Difference',
        accessor:'Difference',
        Filter:ColumnFilter
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'Status',
        Filter:ColumnFilter
    }

]

export const GROUPED_COLUMNS=[
    {
        Header:'Id',
        Footer:'Id',
        accessor:'id'
    },
    {
        Header:'Name',
        Footer:'Name',
        accessor:'Name'
    },
    {
        Header:'Week A',
        Footer:'Week A',
        columns:[
            {
                Header:'Week 1',
                Footer:'Week 1',
                accessor:'Week_1'
            },
            {
                Header:'Week 2',
                Footer:'Week 2',
                accessor:'Week_2'
            },
        ]
    },
    {
        Header:'Week B',
        Footer:'Week B',
        columns:[
            {
                Header:'Week 3',
                Footer:'Week 3',
                accessor:'Week_3'
            },
            {
                Header:'Week 4',
                Footer:'Week 4',
                accessor:'Week_4'
            },
        ]
    },
    {
        Header:'Difference',
        Footer:'Difference',
        accessor:'Difference'
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'Status'
    }
]