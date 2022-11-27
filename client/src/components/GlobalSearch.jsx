import React from 'react'
import { useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalSearch = ({preGlobalFilteredRows,
   globalFilter,
   setGlobalFilter,}) => {

      const count = preGlobalFilteredRows.length
      const [value, setValue] = React.useState(globalFilter)
      const onChange = useAsyncDebounce(value => {
          setGlobalFilter(value || undefined)
      }, 200)

  return (
   <span>
    Globální vyhledávání:{' '}
   <input
       className="form-control"
       value={value || ""}
       onChange={e => {
           setValue(e.target.value);
           onChange(e.target.value);
       }}
 
   />
</span>
  )
}

export default GlobalSearch