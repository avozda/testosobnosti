import React, { useEffect, useState } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import GlobalSearch from "../components/GlobalSearch"
import ColumnSearch from "../components/ColumnSearch"
import { useNavigate } from 'react-router-dom';
const Table = ({ columns, allResults }) => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (allResults.length != 0) {
            setData(formatData(allResults));
        }
    }, [allResults])

    const formatData = (arr) => {
        const newArr = arr.map(v => ({
            ...v,
            date: Moment(v.date).format('DD.MM.YYYY'),
            grade: getGrade(v.yearOfEntry, v.field),
            name: v.firstName + " " + v.lastName
        }))
        return newArr
    }

    const getGrade = (year, field) => {
        const datum = new Date()
        let mesic = datum.getMonth() + 1;
        let rok = datum.getFullYear();
        let trida
        let rocnik;
        if (mesic > 8) {
            rocnik = Number(year.split("/")[0]);
            rocnik--
            rocnik = rok - rocnik;

        } else {
            rocnik = Number(year.split("/")[1]);
            rocnik = rok - rocnik;
            rocnik++
        }

        if (field === "VMA") {

            trida = rocnik + ".C"
        }
        if (field === "MD") {
            trida = rocnik + ".B"
        }
        if (field === "MT") {
            trida = rocnik + ".A"
        }

        return trida
    }
    const isBiggest = (allCells, currentCell) => {
        let isBiggest = true;
        let biggest = currentCell;
        allCells = Object.entries(allCells).slice(2, 8).map(entry => entry[1])
        allCells.map(cell => {
            if (cell.value > biggest) {
                if (biggest == currentCell) {
                    biggest = cell.value
                } else {
                    isBiggest = false
                }

            }
        })
        return isBiggest
    }

    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnSearch,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    )


    return (
        <div>
            <GlobalSearch
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th key={index} scope='col'>

                                    <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {

                            prepareRow(row);
                            return (

                                <tr key={i} className='rowClick' onClick={(e) => {
                                    navigate(`/result/${row.original._id}`)
                                }} {...row.getRowProps()}>

                                    {row.cells.map((cell, index) => {
                                        return (
                                            <td key={index} {...cell.getCellProps()}
                                                style={index > 1 && index < 8 && isBiggest(rows[i].cells, rows[i].cells[index].value) ? { backgroundColor: '#43b3ae', color: "white", fontWeight: "bold" } : {}}
                                            >

                                                {cell.render('Cell')}

                                            </td>
                                        )
                                    })}

                                </tr>

                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
        </div >
    )
}

export default Table