import React from 'react'

const ColumnSearch = ({column: { filterValue, preFilteredRows, setFilter },}) => {
   const count = preFilteredRows.length
  return (
   <input
   className="form-control"
   value={filterValue || ''}
   onChange={e => {
       setFilter(e.target.value || undefined)
   }}
   />
  )
}

export default ColumnSearch